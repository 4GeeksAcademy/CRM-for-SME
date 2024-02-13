import os
import sys
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import create_engine
from eralchemy2 import render_er
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'   
    id = Column(Integer, primary_key=True)
    first_name = Column(String(250), nullable=False)
    last_name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    password = Column(String(250), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
        }

class Client(Base):
    __tablename__ = 'client'
    id = Column(Integer, primary_key=True)
    first_name = Column(String(250), nullable=False)
    last_name = Column(String(250), nullable=False)
    email = Column(String(250), nullable=False)
    phone =  Column(String(250), nullable=False)
    address = Column(String(250))
    company = Column(String(250))

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "email": self.email,
            'phone': self.phone,
            'address': self.address,
            'company': self.company
        }
class Note(Base):
    __tablename__ = 'note'
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey('client.id'))
    note_content = Column(String(250), nullable=False)
    date_created = Column()

    
# user_id: Integer (Foreign key to User Model, represents the user who created the note)
# date_created: DateTime
# Task Model:
# id: Integer (Primary key)
# client_id: Integer (Foreign key to Client Model)
# title: String
# description: Text(opcional, no se ve tan necesario)
# due_date: Date
# status: String ("Pending", "Completed")
# assigned_to: Integer (Foreign key to User Model, represents the user to whom the task is assigned)
# priority: String ("Low", "Medium", "High")
# User Model: ya está creado para login y signup views
# Invoice Model:
# id: Integer (Primary key)
# client_id: Integer (Foreign key to Client Model)
# amount: Decimal
# date_created: DateTime
# detail: Text
# Payment Model:
# id: Integer (Primary key)
# client_id: Integer (Foreign key to Client Model)
# amount: Decimal
# payment_date: Date(en reemplazo a date created)
# detail: Text