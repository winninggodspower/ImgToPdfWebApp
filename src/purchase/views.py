from flask import Blueprint, render_template, request, redirect, flash
from flask_login import login_required, current_user
from .paystack import PayStack
from .pricing import determine_credits
from src import db

purchase_blueprint = Blueprint("purchase", __name__)

@purchase_blueprint.route("/purchase")
def purchase():
    return render_template('purchase_coin.html')

@purchase_blueprint.route("/checkout", methods=['POST'])
@login_required
def checkout():
    price = int(request.form.get('price')) * 100
    redirect_url = PayStack.generate_checkout_url(current_user.email, price, metadata={
        'user_id': current_user.id,
    })

    return redirect(redirect_url)

@purchase_blueprint.route("/verify-purchase")
def verify_purchase():
    reference = request.args.get('reference')
    response = PayStack.verify_payment(reference)
    print(response)

    if response:
        price = response['amount'] / 100
        purchased_credits = determine_credits(price)
        current_user.credits += int(purchased_credits)
        print(f'current coin: {current_user.credits}')
        db.session.commit()
        flash(f'successfully purchased {purchased_credits} coins', 'success')

    else:
        flash('purchase was unsuccessfull', 'error')

    return redirect('/')