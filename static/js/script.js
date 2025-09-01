// DOM Elements
const form = document.getElementById('predictionForm');
const predictBtn = document.getElementById('predictBtn');
const loadingSpinner = document.getElementById('loadingSpinner');
const resultsSection = document.getElementById('resultsSection');

// Form validation and submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable button and show loading
    predictBtn.disabled = true;
    loadingSpinner.classList.remove('hidden');
    resultsSection.classList.add('hidden');
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = {};
        
        // Convert form data to object
        for (let [key, value] of formData.entries()) {
            // Convert numeric fields to numbers
            const numericFields = [
                'Age', 'CityTier', 'DurationOfPitch', 'NumberOfFollowups', 
                'PreferredPropertyStar', 'NumberOfTrips', 'Passport', 
                'PitchSatisfactionScore', 'OwnCar', 'MonthlyIncome',
                'NumberOfPersonVisiting', 'NumberOfChildrenVisiting'
            ];
            
            if (numericFields.includes(key)) {
                data[key] = parseFloat(value) || 0;
            } else {
                data[key] = value;
            }
        }
        
        console.log('Sending data:', data);
        
        // Make API call
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Prediction failed');
        }
        
        // Display results
        displayResults(result);
        
    } catch (error) {
        console.error('Error:', error);
        displayError(error.message);
    } finally {
        // Re-enable button and hide loading
        predictBtn.disabled = false;
        loadingSpinner.classList.add('hidden');
    }
});

// Display prediction results
function displayResults(result) {
    const predictionResult = document.getElementById('predictionResult');
    const confidenceScore = document.getElementById('confidenceScore');
    const probabilityBreakdown = document.getElementById('probabilityBreakdown');
    
    // Set prediction message and styling
    predictionResult.innerHTML = `
        <i class="fas ${result.prediction === 1 ? 'fa-check-circle' : 'fa-times-circle'}"></i>
        ${result.message}
    `;
    predictionResult.className = `prediction-result ${result.prediction === 1 ? 'positive' : 'negative'}`;
    
    // Set confidence score
    confidenceScore.innerHTML = `
        <i class="fas fa-chart-line"></i>
        Confidence: <strong>${result.confidence.toFixed(1)}%</strong>
    `;
    
    // Set probability breakdown
    probabilityBreakdown.innerHTML = `
        <div class="probability-item">
            <div class="probability-label">Won't Purchase</div>
            <div class="probability-value">${(result.probability.not_take_package * 100).toFixed(1)}%</div>
        </div>
        <div class="probability-item">
            <div class="probability-label">Will Purchase</div>
            <div class="probability-value">${(result.probability.take_package * 100).toFixed(1)}%</div>
        </div>
    `;
    
    // Show results with animation
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Display error message
function displayError(message) {
    const resultsSection = document.getElementById('resultsSection');
    const resultCard = resultsSection.querySelector('.result-card');
    
    resultCard.innerHTML = `
        <div class="prediction-result error">
            <i class="fas fa-exclamation-triangle"></i>
            Error: ${message}
        </div>
        <div class="confidence-score">
            Please check your input and try again.
        </div>
    `;
    
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Form validation helpers
function validateForm() {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#f56565';
            isValid = false;
        } else {
            field.style.borderColor = '#48bb78';
        }
    });
    
    return isValid;
}

// Real-time validation
form.addEventListener('input', (e) => {
    const field = e.target;
    
    if (field.hasAttribute('required')) {
        if (field.value.trim()) {
            field.style.borderColor = '#48bb78';
        } else {
            field.style.borderColor = '#f56565';
        }
    }
});

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
    // Add tooltips or help text for complex fields
    const complexFields = {
        'DurationOfPitch': 'How long was the sales pitch in minutes?',
        'PitchSatisfactionScore': 'Customer satisfaction with the pitch (1-5 scale)',
        'PreferredPropertyStar': 'Star rating preference for accommodation',
        'NumberOfFollowups': 'How many follow-up contacts were made?'
    };
    
    Object.keys(complexFields).forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.title = complexFields[fieldId];
        }
    });
    
    // Add smooth scrolling for form sections
    const sections = document.querySelectorAll('.form-section');
    sections.forEach((section, index) => {
        section.style.animationDelay = `${index * 0.1}s`;
        section.classList.add('fade-in');
    });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-out forwards;
        opacity: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add form reset functionality
function resetForm() {
    form.reset();
    resultsSection.classList.add('hidden');
    
    // Reset field styles
    const fields = form.querySelectorAll('input, select');
    fields.forEach(field => {
        field.style.borderColor = '#e2e8f0';
    });
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to submit form
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (validateForm()) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape to reset form
    if (e.key === 'Escape') {
        resetForm();
    }
});

// Add sample data functionality for testing
function fillSampleData() {
    const sampleData = {
        'Age': 35,
        'Gender': 'Male',
        'MaritalStatus': 'Married',
        'MonthlyIncome': 25000,
        'Occupation': 'Salaried',
        'Designation': 'Manager',
        'TypeofContact': 'Self Enquiry',
        'CityTier': '1',
        'ProductPitched': 'Deluxe',
        'PreferredPropertyStar': '4',
        'NumberOfTrips': 3,
        'Passport': '1',
        'OwnCar': '1',
        'DurationOfPitch': 15,
        'NumberOfFollowups': 3,
        'PitchSatisfactionScore': 4,
        'NumberOfPersonVisiting': 2,
        'NumberOfChildrenVisiting': 1
    };
    
    Object.keys(sampleData).forEach(key => {
        const field = document.getElementById(key);
        if (field) {
            field.value = sampleData[key];
        }
    });
}

// Add sample data button (for development/testing)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    const sampleBtn = document.createElement('button');
    sampleBtn.textContent = 'Fill Sample Data';
    sampleBtn.type = 'button';
    sampleBtn.className = 'predict-btn';
    sampleBtn.style.marginRight = '10px';
    sampleBtn.style.background = 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)';
    sampleBtn.onclick = fillSampleData;
    
    const submitSection = document.querySelector('.submit-section');
    submitSection.insertBefore(sampleBtn, predictBtn);
}
