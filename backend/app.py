from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def init_db():
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''DROP TABLE IF EXISTS ice_creams;''')  
        cursor.execute('''CREATE TABLE IF NOT EXISTS ice_creams (
                            id INTEGER PRIMARY KEY,
                            name TEXT,
                            price REAL,
                            seasonal BOOLEAN,
                            ingredients TEXT,
                            allergens TEXT)''')
        cursor.execute('''CREATE TABLE IF NOT EXISTS orders (
                            id INTEGER PRIMARY KEY,
                            ice_cream_id INTEGER,
                            quantity INTEGER)''')
        conn.commit()


@app.route('/api/ice-creams', methods=['GET'])
def get_ice_creams():
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM ice_creams')
        ice_creams = cursor.fetchall()
    return jsonify(ice_creams)

@app.route('/api/admin/ice-creams', methods=['POST'])
def add_ice_cream():
    data = request.get_json()
    name = data['name']
    price = data['price']
    seasonal = data['seasonal']
    ingredients = data['ingredients']
    allergens = data.get('allergens', '')  
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('INSERT INTO ice_creams (name, price, seasonal, ingredients, allergens) VALUES (?, ?, ?, ?, ?)', 
                       (name, price, seasonal, ingredients, allergens))
        conn.commit()
    return jsonify({"message": "Ice cream added successfully!"}), 201

@app.route('/api/admin/ice-creams', methods=['PUT'])
def update_ice_cream_allergens():
    data = request.get_json()
    ice_cream_id = data['id']
    allergens = data['allergens']
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('UPDATE ice_creams SET allergens = ? WHERE id = ?', (allergens, ice_cream_id))
        conn.commit()
    return jsonify({"message": "Ice cream allergens updated successfully!"}), 200

@app.route('/api/admin/ice-creams', methods=['DELETE'])
def remove_ice_cream():
    data = request.get_json()
    name = data['name']
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM ice_creams WHERE name = ?', (name,))
        conn.commit()
    return jsonify({"message": f"Ice cream '{name}' removed successfully!"}), 200
@app.route('/api/orders', methods=['POST'])
def place_order():
    data = request.get_json()
    orders = data['orders']
    
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        
        for order in orders:
            ice_cream_id = order['ice_cream_id']
            quantity = order['quantity']
            cursor.execute('INSERT INTO orders (ice_cream_id, quantity) VALUES (?, ?)', 
                           (ice_cream_id, quantity))
        
        conn.commit()

    return jsonify({"message": "Order placed successfully!"}), 201


@app.route('/api/orders', methods=['GET'])
def get_orders():
    with sqlite3.connect('ice_cream.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM orders')
        orders = cursor.fetchall()
    
    return jsonify(orders)

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
