from flask import Blueprint, request, jsonify
from app.models import Task, db
from flask_jwt_extended import jwt_required, get_jwt_identity

task_bp = Blueprint("task", __name__)


# ROUTE TO CREATE A NEW TASK
@task_bp.route("/tasks", methods=["POST"])
@jwt_required()
def create_task():
  user_id = int(get_jwt_identity())
  data = request.get_json()
  
  task = Task(
    title = data['title'],
    label = data['label'],
    completed = data.get('completed', False),
    user_id = user_id
  )
  db.session.add(task)
  db.session.commit()
  return jsonify(task.to_dict()), 201


# ROUTE TO GET ALL TASKS FOR A USER
@task_bp.route("/tasks", methods=["GET"])
@jwt_required()
def get_tasks():
  user_id = int(get_jwt_identity())
  tasks = Task.query.filter_by(user_id=user_id).all()
  return jsonify([t.to_dict() for t in tasks]), 200


#ROUTE TO UPDATE A TASK
@task_bp.route("/tasks/<int:id>", methods=["PUT"])
@jwt_required()
def update_task(id):
  user_id = int(get_jwt_identity())
  task = Task.query.filter_by(id=id, user_id=user_id).first()
  if not task:
    return jsonify({"message": "Task not found"}), 404
  
  data = request.get_json()
  task.title = data.get('title', task.title)
  task.label = data.get('label', task.label)
  task.completed = data.get('completed', task.completed)
  db.session.commit()
  return jsonify(task.to_dict()), 200


# ROUTE TO DELETE A TASK
@task_bp.route("/tasks/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_task(id):
  user_id = int(get_jwt_identity())
  task = Task.query.filter_by(id=id, user_id=user_id).first()
  if not task:
    return jsonify({"message": "Task not found"}), 404
  
  db.session.delete(task)
  db.session.commit()
  return jsonify({"message": "Task deleted successfully"}), 200
  
