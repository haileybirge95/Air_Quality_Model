from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np

app = Flask(__name__)

# Load your trained model
# model = joblib.load('your_model_filename.pkl') # Save your model as a .pkl file (remove the # at the start of the line when you're ready to use this)

@app.route('/')
def home():
    return render_template('index.html')  # Render the HTML template

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json(force=True)
    
    # Extract features from the input data
    features = np.array([data['feature1'], data['feature2'], data['feature3']])  # Adjust based on your features

    # Preprocess the input data (if necessary)
    # For example, apply normalization or encoding here

    # Make a prediction
    prediction = model.predict(features.reshape(1, -1))  # Reshape for a single sample

    # Return the prediction as a JSON response
    return jsonify({'prediction': prediction[0]})

if __name__ == '__main__':
    app.run(debug=True)