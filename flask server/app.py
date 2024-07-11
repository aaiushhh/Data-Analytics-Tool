import os
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)
# resources={r"/*": {"origins": "http://localhost:4200"}}
data = None
data_backup = None

@app.route('/check', methods=['GET'])
def check():
    global data
    return jsonify({"res": "True" if data is not None else "False"})

@app.route('/data', methods=['GET'])
def get_data():
    global data
    if data is None:
        return jsonify({"error": "Data not loaded"}), 400
    
    filtered_data = data.dropna(how='all')
    if filtered_data.empty:
        return jsonify({"error": "No valid data available"}), 404
    
    result = filtered_data.to_dict(orient='records')
    return jsonify(result)

@app.route('/load/<filename>', methods=['POST'])
def load_specific_data(filename):
    global data, data_backup
    try:
        data = pd.read_csv(f"{filename}.csv")
        data_backup = data.copy(deep=True)
        return jsonify({"message": f"Data from {filename}.csv loaded successfully"})
    except FileNotFoundError:
        return jsonify({"error": f"File not found: {filename}"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/remove', methods=['GET'])
def remove():
    global data
    data = None
    return jsonify({"message": "Data removed successfully"})

@app.route('/sort', methods=['POST'])
def sort():
    global data
    req_data = request.get_json()
    column = req_data.get('column')
    order = req_data.get('order')

    if column and order:
        data = data.sort_values(by=column, ascending=(order == 'ascending'))
        return jsonify({"message": "Sorted successfully"})
    else:
        return jsonify({"error": "Invalid sorting parameters"}), 400

@app.route('/filter', methods=['POST'])
def filter_data():
    global data
    req_data = request.get_json()
    column = req_data.get('column')
    value = req_data.get('value')

    if column and value:
        filtered_data = data[data[column].astype(str).str.contains(value, na=False)]
        result = filtered_data.to_dict(orient='records')
        return jsonify(result)
    else:
        return jsonify({"error": "Invalid filtering parameters"}), 400

@app.route('/aggregate', methods=['POST'])
def aggregate_data():
    global data
    req_data = request.get_json()
    column = req_data.get('column')
    operation = req_data.get('operation')

    if column and operation:
        if operation == 'sum':
            result = data[column].sum()
        elif operation == 'average':
            result = data[column].mean()
        elif operation == 'max':
            result = data[column].max()
        elif operation == 'min':
            result = data[column].min()
        else:
            return jsonify({"error": "Invalid aggregation operation"}), 400

        return jsonify({operation: result})
    else:
        return jsonify({"error": "Invalid aggregation parameters"}), 400

@app.route('/revert', methods=['GET'])
def revert_data():
    global data_backup,data
    if data_backup is None:
        return jsonify({"error": "Data not loaded"}), 400
    
    filtered_data = data_backup.dropna(how='all')
    if filtered_data.empty:
        return jsonify({"error": "No valid data available"}), 404
    
    result = filtered_data.to_dict(orient='records')
    data=data_backup.copy()
    return jsonify(result)

@app.route('/save', methods=['POST'])
def save_data():
    global data
    data = pd.DataFrame(request.json)
    return jsonify({"message": "Data saved successfully"})

@app.route('/describe', methods=['GET'])
def describe_data():
    global data
    if data is None:
        return jsonify({"error": "Data not loaded"}), 400

    description = data.describe().to_dict()
    description = {stat: {col: value for col, value in columns.items()} for stat, columns in description.items()}
    return jsonify(description)

@app.route('/upload/csv', methods=['POST'])
def upload_csv():
    try:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        if file and file.filename.endswith('.csv'):
            filename = file.filename
            file_path = os.path.join(os.getcwd(), filename)
            file.save(file_path)
            
            # Log the contents of the file for debugging
            with open(file_path, 'r') as f:
                file_contents = f.read()
                print("File contents:", file_contents)
            
            global data, data_backup
            data = pd.read_csv(file_path)
            data_backup = data.copy(deep=True)
            os.remove(file_path)  # Clean up the saved file
            return jsonify({"message": f"File '{filename}' uploaded and loaded into data successfully"}), 200
        else:
            return jsonify({"error": "Invalid file format, please upload a CSV file"}), 400
    except pd.errors.EmptyDataError:
        return jsonify({"error": "The uploaded file is empty"}), 400
    except pd.errors.ParserError:
        return jsonify({"error": "Failed to parse the file. Ensure it is a valid CSV"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
if __name__ == '__main__':
    app.run(debug=True)
