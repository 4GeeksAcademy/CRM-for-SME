"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Client, Note, Task, Invoice, Payment, Task
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
        success_url= os.getenv("FRONTEND_URL") + '/success',
        cancel_url= os.getenv("FRONTEND_URL") + '/cancel',
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

@api.route('/edit_client/<int:client_id>', methods=['PUT'])
def edit_client(client_id):
    client = Client.query.get(client_id)
    if client is None:
        return jsonify({"error": "Client not found"}), 404

    client.full_name = request.json.get('full_name', client.full_name)
    client.email = request.json.get('email', client.email)
    client.phone = request.json.get('phone', client.phone)
    client.address = request.json.get('address', client.address)
    client.company = request.json.get('company', client.company)

    db.session.commit()

    return jsonify({"msg": "Client updated successfully"}), 200


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
        note.date_created = current_datetime

        db.session.commit()
        return jsonify({"message": "Note updated successfully"}), 200
    else:
        return jsonify({"message": "Note not found"}), 404

@api.route('/delete_note/<int:note_id>', methods=['DELETE'])
@jwt_required()
def delete_note(note_id):
    current_user_identity = get_jwt_identity()
    note = Note.query.filter_by(id=note_id).first()

    if note:
        if note.user_id != current_user_identity:
            return jsonify({"message": "Unauthorized"}), 401
        
        db.session.delete(note)
        db.session.commit()
        return jsonify({"message": "Note deleted successfully"}), 200
    else:
        return jsonify({"message": "Note not found"}), 404    

@api.route('/add_task', methods=['POST'])
@jwt_required()
def create_task():
    current_user_identity = get_jwt_identity()
    due_date = request.json.get('due_date')
    task_title = request.json.get('task_title')
    description = request.json.get('description')
    status = request.json.get('status')
    priority = request.json.get('priority')
    current_datetime = datetime.now()
    client_id = request.json.get('client_id')
    user_name = request.json.get('user_name')
    
    new_task = Task(
        title = task_title,
        description = description,
        due_date = due_date,
        status = status,
        priority = priority,
        client_id = client_id,
        user_id=current_user_identity,
        user_name = user_name,       
        date_created = current_datetime,
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"message": "Task created successfully"}), 200

@api.route('/tasks', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    results = []
    for task in tasks:
        results.append(task.serialize())
    return jsonify(results), 200

@api.route('/edit_task/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    due_date = request.json.get('due_date')
    task_title = request.json.get('task_title')
    status = request.json.get('status')
    priority = request.json.get('priority')
    current_datetime = datetime.now()
    user_name = request.json.get('user_name')
    task = Task.query.filter_by(id=task_id).first()

    if task:       
        task.title = task_title
        task.due_date = due_date
        task.date_created = current_datetime
        task.status = status
        task.priority = priority
        task.user_name = user_name

        db.session.commit()
        return jsonify({"message": "Task updated successfully"}), 200
    else:
        return jsonify({"message": "Task not found"}), 404

@api.route('/delete_task/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    current_user_identity = get_jwt_identity()
    task = Task.query.filter_by(id=task_id).first()

    if task:
        if task.user_id != current_user_identity:
            return jsonify({"message": "Unauthorized"}), 401
        
        db.session.delete(task)
        db.session.commit()
        return jsonify({"message": "Task deleted successfully"}), 200
    else:
        return jsonify({"message": "Task not found"}), 404
    
@api.route('/user', methods=['GET'])
def get_user():
   try:
        # Consulta la base de datos para obtener solo los nombres de usuario
        user_names = User.query.with_entities(User.user_name).all()

        # Convierte el resultado en una lista de nombres de usuario
        user_names_list = [name[0] for name in user_names]

        # Devuelve la lista como una respuesta JSON
        return jsonify(user_names_list), 200
   except Exception as e:
        # Maneja cualquier error que pueda ocurrir
        return jsonify({"error": str(e)}), 500
@api.route('/totaltasks', methods=['GET'])
def get_total_tasks():
    tasks = Task.query.all()
    results = []
    for task in tasks:
        results.append(task.serialize())
    return jsonify(results), 200

@api.route('/add_invoice', methods=['POST'])
def add_invoice():
    amount = request.json.get('amount')
    date_created = datetime.now()
    detail = request.json.get('detail')
    client_id = request.json.get('client_id')

    new_invoice = Invoice(
        amount=amount,
        date_created=date_created,
        detail=detail,
        client_id=client_id
    )

    db.session.add(new_invoice)
    db.session.commit()

    return jsonify({"message": "Invoice created successfully"}), 200

@api.route('/invoices', methods=['GET'])
def get_invoices():
    invoices = Invoice.query.all()
    results = []
    for invoice in invoices:
        results.append(invoice.serialize())
    return jsonify(results), 200

@api.route('/edit_invoice/<int:invoice_id>', methods=['PUT'])
def edit_invoice(invoice_id):
    detail = request.json.get('detail')
    amount = request.json.get('amount')
    invoice = Invoice.query.filter_by(id=invoice_id).first()

    if invoice:
        invoice.detail = detail
        invoice.amount = amount
        invoice.date_created = datetime.now()

        db.session.commit()

        return jsonify({"message": "Invoice updated successfully"}), 200
    else:
        return jsonify({"message": "Invoice not found"}), 404
    
@api.route('/task_status/<int:task_id>', methods=['PUT'])
def task_status(task_id):
    status = request.json.get('status')
    task = Task.query.filter_by(id=task_id).first()

    if task:
        task.status = status       

        db.session.commit()

        return jsonify({"message": "Status updated successfully"}), 200
    else:
        return jsonify({"message": "Task not found"}), 404
@api.route('/add_payment', methods=['POST'])
def add_payment():
    amount = request.json.get('amount')
    payment_date = request.json.get('payment_date')
    detail = request.json.get('detail')
    client_id = request.json.get('client_id')

    new_payment = Payment(
        amount=amount,
        payment_date=payment_date,
        detail=detail,
        client_id=client_id
    )

    db.session.add(new_payment)
    db.session.commit()

    return jsonify({"message": "Payment created successfully"}), 200

@api.route('/payments', methods=['GET'])
def get_payments():
    payments = Payment.query.all()
    results = []
    for payment in payments:
        results.append(payment.serialize())
    return jsonify(results), 200

@api.route('/edit_payment/<int:payment_id>', methods=['PUT'])
def edit_payment(payment_id):
    detail = request.json.get('detail')
    amount = request.json.get('amount')
    payment_date = request.json.get('payment_date')
    payment = Payment.query.filter_by(id=payment_id).first()

    if payment:
        payment.detail = detail
        payment.amount = amount
        payment.payment_date = payment_date

        db.session.commit()

        return jsonify({"message": "Payment updated successfully"}), 200
    else:
        return jsonify({"message": "Payment not found"}), 404
