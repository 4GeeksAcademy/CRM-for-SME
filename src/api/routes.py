"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client, Note
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import stripe
import os
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime


stripe.api_key = os.getenv("STRIPE_TOKEN")

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


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

    return jsonify({"message": "Password changed successfully" }), 200

@api.route('/add_client', methods=['POST'])
def create_client():
    client = Client(
        full_name=request.json.get('full_name'),
        email=request.json.get('email'),
        phone=request.json.get('phone'),
        address=request.json.get('address'),
        company=request.json.get('company')
    )

    db.session.add(client)
    db.session.commit()
    
    return jsonify({"msg": "Client created successfully"}), 200

@api.route('/clients', methods=['GET'])
def get_clients():
    clients = Client.query.all()
    results = []
    for client in clients:
        results.append(client.serialize())
    return jsonify(results), 200

@api.route('/add_note', methods=['POST'])
@jwt_required()
def create_note():
    current_user_identity = get_jwt_identity()
    current_datetime = datetime.now()
    note_content = request.json.get('note_content')
    client_id = request.json.get('client_id')

    new_note = Note(
        note_content=note_content,
        user_id=current_user_identity,
        client_id=client_id, 
        date_created=current_datetime
    )

    db.session.add(new_note)
    db.session.commit()

    return jsonify({"message": "Note created successfully"}), 200

@api.route('/notes', methods=['GET'])
def get_notes():
    notes = Note.query.all()
    results = []
    for note in notes:
        results.append(note.serialize())
    return jsonify(results), 200

@api.route('/edit_note/<int:note_id>', methods=['PUT'])
@jwt_required()
def edit_note(note_id):
    current_user_identity = get_jwt_identity()
    current_datetime = datetime.now()
    note_content = request.json.get('note_content')
    note = Note.query.filter_by(id=note_id).first()

    if note:
        if note.user_id != current_user_identity:
            return jsonify({"message": "Unauthorized"}), 401
        
        note.note_content = note_content
        note.date_modified = current_datetime

        db.session.commit()
        return jsonify({"message": "Note updated successfully"}), 200
    else:
        return jsonify({"message": "Note not found"}), 404
