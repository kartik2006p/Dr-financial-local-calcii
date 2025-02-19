from flask import Flask, request, jsonify, render_template
import math

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template("index.html")  # Serve the HTML file

def safe_eval(expression):
    allowed_operators = {'+', '-', '*', '/', '%', '.'}
    allowed_chars = set("0123456789") | allowed_operators
    
    if not set(expression).issubset(allowed_chars):
        return "Error"

    try:
        result = eval(expression, {"__builtins__": None})
        return round(float(result), 6)
    except Exception:
        return "Error"

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    
    if 'expression' in data:
        expression = data.get("expression", "")
        result = safe_eval(expression)
        return jsonify({"result": result})
    
    required_keys = ['type', 'principal', 'time', 'rate']
    for key in required_keys:
        if key not in data:
            return jsonify({'error': f'Missing {key}'}), 400
    
    calc_type = data['type']
    principal = data['principal']
    time = data['time']
    rate = data['rate']

    if calc_type == 'si':
        result = (principal * time * rate) / 1200
    else:
        result = principal * (math.pow((1 + rate / 1200), time)) - principal

    return jsonify({'result': result})

@app.route('/delete', methods=['POST'])
def delete_last():
    data = request.get_json()
    expression = data.get("expression", "")

    updated_expression = expression[:-1] if expression else ""  # Remove last char
    return jsonify({"expression": updated_expression})

if __name__ == '__main__':
    app.run(debug=True)
