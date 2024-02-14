"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import stripe
import os
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
stripe.api_key = os.getenv("STRIPE_TOKEN")

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/payment-link', methods=['POST'])
def payment_link():
    name = request.json.get('name')
    unit_amount = int(request.json.get('unit_amount'))
    
    session = stripe.checkout.Session.create(
        payment_method_types=['card'],
        line_items=[{
            'price_data': {
                'currency': 'usd',
                'product_data': {
                    'name': name,
                },
                'unit_amount': unit_amount,
            },
            'quantity': 1,
        }],
        mode='payment',
        success_url='https://silver-halibut-g4q4vxqwvg4xhvvqw-3000.app.github.dev/success',
        cancel_url='https://silver-halibut-g4q4vxqwvg4xhvvqw-3000.app.github.dev/cancel',
    )
    payment_url = session.url

    return jsonify(payment_url=payment_url)

@api.route('/login', methods=['POST'])
def login_user():
    user_name = request.json.get('user_name')
    password = request.json.get('password')
    user = User.query.filter_by(user_name=user_name, password=password).first()

    if user is not None:
        identity_data = user.user_name

        print("Identity data:", identity_data)

        access_token = create_access_token(identity=identity_data)
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Incorrect user or password"}), 401
    
@api.route('/signup', methods=['POST'])
def create_user():
    email = request.json.get('email')
    user_name = request.json.get('user_name')
    duplicate_email = User.query.filter_by(email=email).first()
    duplicate_user = User.query.filter_by(user_name=user_name).first()
    user = User(email = email,
                user_name = user_name,
                password = request.json.get('password'), 
                is_active = True,)
    if duplicate_email:
        return jsonify({"msg":"Email already registered"}), 400 
    elif duplicate_user:
        return jsonify({"msg":"User already registered"}), 400
    else:
        db.session.add(user) 
        db.session.commit()
        return jsonify({"msg":"User created succesfully"}), 200

@api.route('/protected', methods=['GET'])
@jwt_required()
def protected_route():
    user_info = get_jwt_identity()
    if not user_info:
        return jsonify({"msg": "access denied"}), 401
    return jsonify(user_info), 200

@api.route('/change_password', methods=['POST'])
@jwt_required()
def change_password():
    current_password = request.json.get('current_password')
    new_password = request.json.get('new_password')
    confirm_password = request.json.get('confirm_password')

    current_user_identity = get_jwt_identity()
    print("Current user identity:", current_user_identity)

    if not isinstance(current_user_identity, str):
        return jsonify({"message": "Invalid user identity format"}), 400

    user = User.query.filter_by(user_name=current_user_identity).first()

    if not user or user.password != current_password:
        return jsonify({"message": "Incorrect current password"}), 401

    if new_password != confirm_password:
        return jsonify({"message": "New password and confirm password do not match"}), 400

    user.password = new_password
    db.session.commit()

    return jsonify({"message": "Password changed successfully"}), 200