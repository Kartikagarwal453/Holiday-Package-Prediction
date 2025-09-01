from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and preprocessor
try:
    model = pickle.load(open('models/model.pkl', 'rb'))
    preprocessor = pickle.load(open('models/preprocessor.pkl', 'rb'))
    print("Model and preprocessor loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None
    preprocessor = None

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None or preprocessor is None:
            return jsonify({'error': 'Model not loaded properly'}), 500
        
        # Get data from request
        data = request.json
        
        # Create DataFrame with the input features
        # Based on the notebook, the features after dropping CustomerID and creating TotalVisiting are:
        feature_names = [
            'Age', 'TypeofContact', 'CityTier', 'DurationOfPitch', 'Occupation', 
            'Gender', 'NumberOfFollowups', 'ProductPitched', 'PreferredPropertyStar', 
            'MaritalStatus', 'NumberOfTrips', 'Passport', 'PitchSatisfactionScore', 
            'OwnCar', 'Designation', 'MonthlyIncome', 'TotalVisiting'
        ]
        
        # Create input array from the received data
        input_data = []
        for feature in feature_names:
            if feature == 'TotalVisiting':
                # TotalVisiting = NumberOfPersonVisiting + NumberOfChildrenVisiting
                total_visiting = data.get('NumberOfPersonVisiting', 0) + data.get('NumberOfChildrenVisiting', 0)
                input_data.append(total_visiting)
            else:
                input_data.append(data.get(feature, 0))
        
        # Create DataFrame
        input_df = pd.DataFrame([input_data], columns=feature_names)
        
        # Preprocess the input
        input_processed = preprocessor.transform(input_df)
        
        # Make prediction
        prediction = model.predict(input_processed)[0]
        prediction_proba = model.predict_proba(input_processed)[0]
        
        # Prepare response
        result = {
            'prediction': int(prediction),
            'probability': {
                'not_take_package': float(prediction_proba[0]),
                'take_package': float(prediction_proba[1])
            },
            'message': 'Customer will likely TAKE the holiday package!' if prediction == 1 else 'Customer will likely NOT take the holiday package.',
            'confidence': float(max(prediction_proba)) * 100
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
