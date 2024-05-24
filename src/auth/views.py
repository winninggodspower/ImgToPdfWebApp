from flask import Blueprint, flash, redirect, render_template, request, url_for, current_app
from flask_login import login_user, current_user, login_required, logout_user

from src import db, bcrypt, login_manager
from .models import User

from .forms import RegisterForm, LoginForm

auth_blueprint = Blueprint("auth", __name__)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)

@auth_blueprint.route("/register", methods=["GET", "POST"])
def register():
    if current_user.is_authenticated:
        flash("You are already registered.", "info")
        return redirect(url_for("core.home"))
    form = RegisterForm(request.form)
    if form.validate_on_submit():
        user = User(email=form.email.data, password=form.password.data)
        db.session.add(user)
        db.session.commit()

        login_user(user)
        flash("You registered and are now logged in. Welcome!", "success")

        return redirect(url_for("core.home"))

    return render_template("auth/register.html", form=form)

@auth_blueprint.route("/login", methods=["GET", "POST"])
def login():
    pass
    if current_user.is_authenticated:
        flash("You are already logged in.", "info")
        return redirect(url_for("core.home"))
    form = LoginForm(request.form)
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, request.form["password"]):
            login_user(user)
            flash('successfully logged in')
            redirect_url = request.args.get('next') or current_app.config.get('LOGIN_REDIRECT_URL')
            if redirect_url:
                return redirect(redirect_url)
            else:
                return redirect(url_for("core.home"))
        else:
            flash("Invalid email and/or password.", "danger")
            return render_template("auth/login.html", form=form)
    return render_template('auth/login.html', form=form)
    
@auth_blueprint.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You were logged out.", "success")
    return redirect(url_for("auth.login"))