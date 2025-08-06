from flask import Blueprint

task_bp = Blueprint("task", __name__)

@task_bp.route("/test-task")
def test_task():
    return {"message": "task works!"}