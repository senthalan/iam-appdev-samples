from flask import Flask, render_template, jsonify, request

import os

app = Flask(__name__)


items = []  # In-memory list to store items

# GET API to retrieve all items
@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items)

# POST API to add an item
@app.route('/items', methods=['POST'])
def add_item():
    item = request.json
    items.append(item)
    return jsonify({'message': 'Item added successfully'})


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)