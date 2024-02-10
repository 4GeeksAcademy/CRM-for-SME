"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import stripe
import os

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