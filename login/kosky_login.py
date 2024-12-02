from flask import Flask, request, jsonify
from flask_cors import CORS
from tinydb import TinyDB, Query

app = Flask(__name__)
CORS(app)  # Abilita CORS per tutte le route


# Initialize TinyDB
db = TinyDB('kosky-db.json')
query = Query()

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


# Function to insert an event
def insert_all(inserts):
    db.insert(inserts)

@app.route('/insert', methods=['POST'])
def insert_all_endpoint():
    try:
        insert = request.json
        insert_all(insert)
        return jsonify({'message': 'Event inserted successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Endpoint for selecting users
@app.route('/all', methods=['POST'])
def all():
    try:
        results = db.all()
        return jsonify(results), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


if __name__ == '__main__':
    app.run(port=8505)