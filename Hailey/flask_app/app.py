from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import numpy as np
import joblib  # For loading the scaler

app = Flask(__name__)

# Load the model from the .keras file
model = load_model('nn_model.keras')

# Load the fitted scaler
scaler = joblib.load('scaler.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)  # Get the JSON data from the request
        print("Received data:", data)  # Log the incoming data for debugging
        
        # Define the required keys
        required_keys = ['Temperature', 'Humidity', 'PM2.5', 'PM10', 'NO2', 'SO2', 'CO', 'Proximity_to_Industrial_Areas', 'Population_Density']
        
        # Check for missing keys
        missing_keys = [key for key in required_keys if key not in data]
        if missing_keys:
            print(f'Missing keys: {missing_keys}')  # Log missing keys
            return jsonify({'error': f'Missing keys: {", ".join(missing_keys)}'}), 400  # Bad Request

        # Extract features from the data and convert to float
        features = []
        for key in required_keys:
            value = data[key]
            if value is None or not isinstance(value, (int, float)):
                print(f"Invalid value for {key}: {value}")  # Log invalid values
                return jsonify({"error": f"Invalid value for {key}: {value}"}), 400
            features.append(float(value))

        features = np.array(features).reshape(1, -1)

        # Scale the features using the fitted scaler
        features_scaled = scaler.transform(features)

        # Perform the prediction
        prediction = model.predict(features_scaled)

        # Assign labels for the classes
        class_labels = ['Good', 'Moderate', 'Poor', 'Hazardous']

        # Get the index of the class with the highest probability
        predicted_index = np.argmax(prediction[0])
        predicted_class = class_labels[predicted_index]  # Map the index to the class label

        # Return the predicted class
        return jsonify({'prediction': predicted_class})

    except Exception as e:
        print(f"Error occurred: {e}")  # Log the error for debugging
        return jsonify({'error': str(e)}), 500  # Return error message if something goes wrong

if __name__ == '__main__':
    app.run(debug=True)