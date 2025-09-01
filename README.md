# Holiday-Package-Prediction

## Problem statement:-

"Trips & Travel.Com" company wants to enable and establish a viable business model to expand the customer base. One of the ways to expand the customer base is to introduce a new offering of packages. Currently, there are 5 types of packages the company is offering * Basic, Standard, Deluxe, Super Deluxe, King. Looking at the data of the last year, we observed that 18% of the customers purchased the packages. However, the marketing cost was quite high because customers were contacted at random without looking at the available information. The company is now planning to launch a new product i.e. Wellness Tourism Package. Wellness Tourism is defined as Travel that allows the traveler to maintain, enhance or kick-start a healthy lifestyle, and support or increase one's sense of well-being. However, this time company wants to harness the available data of existing and potential customers to make the marketing expenditure more efficient.

## Data Collection:-

The Dataset is collected from https://www.kaggle.com/datasets/susant4learning/holiday-package-purchase-prediction The data consists of 20 column and 4888 rows.

## Solution:-

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


## Performance

- **Loading Time**: < 2 seconds for initial page load
- **Prediction Time**: < 500ms for most predictions
- **Mobile Optimized**: Responsive design for all screen sizes

---

Built with ❤️ using Flask, HTML5, CSS3, and JavaScript
