# Holiday Package Prediction Web Application

A beautiful and modern web application that predicts whether a customer will purchase a holiday package based on their profile and interaction data.

## Features

- **Modern UI/UX**: Beautiful gradient design with smooth animations
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Real-time Validation**: Form fields validate as you type
- **Interactive Results**: Visual prediction results with confidence scores
- **RESTful API**: Clean Flask backend with JSON API
- **Machine Learning**: Uses trained Random Forest model for predictions

## Project Structure

```
Holiday-Package-Prediction/
├── app.py                  # Flask application
├── requirements.txt        # Python dependencies
├── models/
│   ├── model.pkl          # Trained Random Forest model
│   └── preprocessor.pkl   # Data preprocessor
├── templates/
│   └── index.html         # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css      # Stylesheets
│   └── js/
│       └── script.js      # JavaScript functionality
├── dataset/
│   └── Travel.csv         # Training dataset
└── notebooks/
    └── ModelTraining.ipynb # Model training notebook
```

## Installation & Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

The application will start on `http://localhost:5000`

## Usage

1. **Open your browser** and navigate to `http://localhost:5000`

2. **Fill in the customer information** across the different sections:
   - **Personal Information**: Age, Gender, Marital Status, Monthly Income
   - **Professional Information**: Occupation, Designation
   - **Contact & Location**: Contact Type, City Tier
   - **Travel Information**: Product type, Property rating, Previous trips, etc.
   - **Interaction Details**: Pitch duration, Follow-ups, Satisfaction score, etc.

3. **Click "Predict Holiday Package Purchase"** to get the prediction

4. **View Results**: The application will show:
   - Whether the customer will likely purchase the package
   - Confidence percentage
   - Probability breakdown

## API Endpoints

### GET /
Returns the main web interface

### POST /predict
Accepts customer data and returns prediction

**Request Body Example:**
```json
{
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
```

**Response Example:**
```json
{
  "prediction": 1,
  "probability": {
    "not_take_package": 0.25,
    "take_package": 0.75
  },
  "message": "Customer will likely TAKE the holiday package!",
  "confidence": 75.0
}
```

### GET /health
Returns application health status

## Model Information

- **Algorithm**: Random Forest Classifier
- **Features**: 17 input features after preprocessing
- **Accuracy**: ~93.6% on test set
- **Preprocessing**: StandardScaler for numerical features, OneHotEncoder for categorical features

## Key Features Explained

- **Age**: Customer age
- **Gender**: Male/Female
- **MaritalStatus**: Unmarried/Married/Divorced
- **MonthlyIncome**: Customer's monthly income
- **Occupation**: Salaried/Small Business/Free Lancer/Large Business
- **Designation**: Executive/Manager/Senior Manager/AVP/VP
- **TypeofContact**: Self Enquiry/Company Invited
- **CityTier**: 1/2/3 (metropolitan classification)
- **ProductPitched**: Basic/Standard/Deluxe/Super Deluxe/King
- **PreferredPropertyStar**: 3/4/5 star rating preference
- **NumberOfTrips**: Previous trips taken
- **Passport**: Has passport (1) or not (0)
- **OwnCar**: Owns car (1) or not (0)
- **DurationOfPitch**: Sales pitch duration in minutes
- **NumberOfFollowups**: Number of follow-up contacts
- **PitchSatisfactionScore**: Satisfaction with pitch (1-5)
- **TotalVisiting**: Total people visiting (adults + children)

## Development Features

When running locally, the application includes:
- **Sample Data Button**: Automatically fills form with test data
- **Keyboard Shortcuts**: Ctrl+Enter to submit, Escape to reset
- **Real-time Validation**: Visual feedback as you type
- **Error Handling**: Graceful error messages and recovery

## Customization

### Styling
Edit `static/css/style.css` to customize the appearance

### Functionality  
Edit `static/js/script.js` to modify frontend behavior

### Backend Logic
Edit `app.py` to modify API endpoints or prediction logic

## Troubleshooting

### Model Loading Issues
- Ensure `models/model.pkl` and `models/preprocessor.pkl` exist
- Check that the model was trained with compatible scikit-learn version

### Port Already in Use
- Change the port in `app.py`: `app.run(debug=True, port=5001)`

### Missing Dependencies
- Run `pip install -r requirements.txt` to install all required packages

## Browser Compatibility

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Performance

- **Loading Time**: < 2 seconds for initial page load
- **Prediction Time**: < 500ms for most predictions
- **Mobile Optimized**: Responsive design for all screen sizes

---

Built with ❤️ using Flask, HTML5, CSS3, and JavaScript
