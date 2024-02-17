from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(250), unique=True, nullable=False)
    user_name = db.Column(db.String(250), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    task = db.relationship('Task',back_populates= 'user')
    note = db.relationship('Note', back_populates= 'user')
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "user_name": self.user_name,
            
        }
    
class Client(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), nullable=False)
    phone =  db.Column(db.String(250), nullable=False)
    address = db.Column(db.String(250))
    company = db.Column(db.String(250))
    task = db.relationship('Task', back_populates= 'client')
    invoice = db.relationship('Invoice', back_populates= 'client')
    payment = db.relationship('Payment',  back_populates= 'client')
    note = db.relationship('Note',  back_populates= 'client')

    def serialize(self):
        return {
            "id": self.id,
            "full_name": self.full_name,
            "email": self.email,
            'phone': self.phone,
            'address': self.address,
            'company': self.company
        }

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    note_content = db.Column(db.String(250))
    date_created = db.Column(db.DateTime, nullable=False)  
    user_id = db.Column(db.String(200), db.ForeignKey('user.user_name'), nullable=False)
    user = db.relationship('User')
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    client = db.relationship('Client')

    def serialize(self):
        return {
            "id": self.id,
            "note_content": self.note_content,
            "date_created": self.date_created.strftime('%d-%m-%Y'),
            "client_id": self.client_id,
            "user_id": self.user_id,
        }


class Task(db.Model):    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text)
    due_date = db.Column(db.DateTime, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False)  
    status = db.Column(db.String(250), nullable=False)
    priority = db.Column(db.String(250), nullable=False)
    user_name = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.String(200), db.ForeignKey('user.user_name'), nullable=False)
    user = db.relationship('User')
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    client = db.relationship('Client')

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "due_date":self.date_created.strftime('%d-%m-%Y'),
            "status":self.status,
            "priority":self.priority,
            "client_id": self.client_id,
            "user_id": self.user_id,
            "user_name":self.user_name,
            "date_created": self.date_created.strftime('%d-%m-%Y')           
        }

class Invoice(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False) 
    detail = db.Column(db.String(250), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    client = db.relationship('Client')

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "date_created": self.date_created,
            "detail":self.detail,
            "client_id": self.client_id,
           
        }


class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    payment_date = db.Column(db.DateTime, nullable=False) 
    detail = db.Column(db.String(250), nullable=False) 
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable=False)
    client = db.relationship('Client')

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "payment_date": self.payment_date,
            "detail":self.detail,
            "client_id": self.client_id,
           
        }
