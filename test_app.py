import requests
import json

# Test data
test_data = {
    "Age": 35,
    "Gender": "Male",
    "MaritalStatus": "Married",
    "MonthlyIncome": 25000,
    "Occupation": "Salaried",
    "Designation": "Manager",
    "TypeofContact": "Self Enquiry",
    "CityTier": 1,
    "ProductPitched": "Deluxe",
    "PreferredPropertyStar": 4,
    "NumberOfTrips": 3,
    "Passport": 1,
    "OwnCar": 1,
    "DurationOfPitch": 15,
    "NumberOfFollowups": 3,
    "PitchSatisfactionScore": 4,
    "NumberOfPersonVisiting": 2,
    "NumberOfChildrenVisiting": 1
}

def test_health():
    """Test the health endpoint"""
    try:
        response = requests.get('http://localhost:5000/health')
        print(f"Health Status: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Health check failed: {e}")
        return False

def test_prediction():
    """Test the prediction endpoint"""
    try:
        response = requests.post(
            'http://localhost:5000/predict',
            headers={'Content-Type': 'application/json'},
            data=json.dumps(test_data)
        )
        print(f"Prediction Status: {response.status_code}")
        if response.status_code == 200:
            result = response.json()
            print(f"Prediction: {result['prediction']}")
            print(f"Message: {result['message']}")
            print(f"Confidence: {result['confidence']:.1f}%")
            print(f"Probabilities: {result['probability']}")
        else:
            print(f"Error: {response.text}")
        return response.status_code == 200
    except Exception as e:
        print(f"Prediction test failed: {e}")
        return False

if __name__ == "__main__":
    print("Testing Holiday Package Prediction API...")
    print("=" * 50)
    
    # Test health endpoint
    print("1. Testing Health Endpoint:")
    health_ok = test_health()
    
    print("\n2. Testing Prediction Endpoint:")
    prediction_ok = test_prediction()
    
    print("\n" + "=" * 50)
    if health_ok and prediction_ok:
        print("✅ All tests passed! The application is working correctly.")
    else:
        print("❌ Some tests failed. Please check the application.")
