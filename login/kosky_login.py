from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Abilita CORS per tutte le route

# Credenziali degli utenti
users = {
    "simone.vetere@kosky.it": "191199Sv!",
    "gabriele.bronda@kosky.it": "394857",
    "samuele.mascialino@kosky.it": "ProgettoDragone2025"
}

# PIN validi
valid_pins = ["394857", "191199"]

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    pin = data.get("pin")
    
    if pin in valid_pins:
        return jsonify({"status": "success", "message": "Login riuscito con PIN"}), 200
    elif email in users and users[email] == password:
        return jsonify({"status": "success", "message": "Login riuscito con email e password"}), 200
    else:
        return jsonify({"status": "failure", "message": "Credenziali non valide"}), 401

if __name__ == '__main__':
    app.run(port=8505)
