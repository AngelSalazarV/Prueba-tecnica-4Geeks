from flask import Blueprint

from .auth import auth_bp
from .task import task_bp

all_blueprints =  [
  (auth_bp, '/api'),
  (task_bp, '/api')
]

def register_routes(app):
  for bp, url_prefix in all_blueprints:
    app.register_blueprint(bp, url_prefix=url_prefix)