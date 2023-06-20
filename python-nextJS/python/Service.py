from flask import Flask, render_template, jsonify, request
import jwt
import os
import logging

app = Flask(__name__)

logging.basicConfig(level=logging.DEBUG)
items = []  # In-memory list to store items

# GET API to retrieve all items
@app.route('/items', methods=['GET'])
def get_items():

    logging.info('Handling request')
    logging.info('request.headers : %s', request.headers)
    if request.headers.get('x-jwt-assertion'):
        token = request.headers['x-jwt-assertion']
    else:
        return jsonify({'message': 'Token not found'}), 400
    token_info = decode_access_token(token)
    username = token_info.get('email')
    logging.info('username : ' + username)
    return jsonify(items)

# POST API to add an item
@app.route('/items', methods=['POST'])
def add_item():
    item = request.json
    items.append(item)
    return jsonify({'message': 'Item added successfully'})


def decode_access_token(token):

    # # get public key from jwks uri
    # response = httpx.get(url="your open id wellknown url to fetch public key")

    # # gives the set of jwks keys.the keys has to be passed as it is to jwt.decode() for signature verification.
    # key = response.json()

    # # get the algorithm type from the request header
    # algorithm = jwt.get_unverified_header(token).get('alg')

    # user_info = jwt.decode(token,
    #                        key=key,
    #                        algorithms=algorithm)
    user_info = jwt.decode(token, options={"verify_signature": False})

    return user_info


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)

