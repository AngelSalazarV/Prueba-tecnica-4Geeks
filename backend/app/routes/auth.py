from flask import Blueprint, request, jsonify
from app.models import User, db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
  data = request.get_json()
  if User.query.filter_by(email=data['email']).first():
    return jsonify({"message": "Email already exists"}), 400
  
  user = User(
    username = data['username'],
    email = data['email']
  )
  user.set_password(data['password'])
  db.session.add(user)
  db.session.commit()
  
  return jsonify({"message": "User created successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
  data = request.get_json()
  user = User.query.filter_by(email=data['email']).first()
  if not user or not user.check_password(data['password']):
    return jsonify({"message": "Invalid credentials"}), 401
  
  access_token = create_access_token(identity=user.id)
  return jsonify({"token": access_token, "user": user.to_dict()})
