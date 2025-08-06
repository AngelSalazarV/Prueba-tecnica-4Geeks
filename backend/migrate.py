from app import create_app, db
from app.models import User, Task  # 👈 Importa directamente aquí

app = create_app()

with app.app_context():
    print("🧠 Registrando modelos...")
    print(User.__table__)
    print(Task.__table__)
    print("🛠️ Ejecutando db.create_all()...")
    db.create_all()
    print("✅ Tablas creadas.")
