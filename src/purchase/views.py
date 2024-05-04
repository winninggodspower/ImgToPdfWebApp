from flask import Blueprint, render_template, flash, request


purchase_blueprint = Blueprint("purchase", __name__)

@purchase_blueprint.route("/purchase")
def purchase():
    return render_template('purchase_coin.html')