from flask import Flask, request, jsonify
import pandas as pd

app = Flask(__name__)

# Load career dataset (to be added by user)
# Example: data = pd.read_csv('career_dataset.csv')
data = None

def load_dataset(filepath):
    global data
    data = pd.read_csv(filepath)

# Helper function to filter career options
def suggest_careers(user_inputs):
    # Check if dataset is loaded
    if data is None:
        return {"error": "Dataset not loaded."}

    # Extract user inputs
    education_level = user_inputs.get('educationLevel', '').lower()
    current_field = user_inputs.get('currentField', '').lower()
    interest_field = user_inputs.get('interestField', '').lower()
    past_experience = user_inputs.get('pastExperience', '').lower()
    country = user_inputs.get('country', '').lower()

    # Filter dataset dynamically based on user inputs
    filtered_data = data[
        (data['EducationLevel'].str.lower() == education_level) &
        (data['CurrentField'].str.lower() == current_field) &
        (data['InterestField'].str.lower() == interest_field) &
        (data['Country'].str.lower() == country)
    ]

    # Generate yearly goals dynamically
    suggestions = []
    for _, row in filtered_data.iterrows():
        suggestions.append({
            "career": row['Career'],
            "yearly_plan": [
                {
                    "year": 1,
                    "goal": f"Build foundational knowledge in {row['Career']}",
                    "tips": row['Year1_Tips']
                },
                {
                    "year": 2,
                    "goal": f"Advance skills in {row['Career']} through projects",
                    "tips": row['Year2_Tips']
                },
                {
                    "year": 3,
                    "goal": f"Gain real-world experience in {row['Career']}",
                    "tips": row['Year3_Tips']
                },
                {
                    "year": 4,
                    "goal": f"Specialize and prepare for roles in {row['Career']}",
                    "tips": row['Year4_Tips']
                }
            ]
        })

    return suggestions

@app.route('/api/career_suggestions', methods=['POST'])
def career_suggestions():
    user_data = request.json

    # Validate input
    required_fields = ["educationLevel", "currentField", "interestField", "firstName", "lastName", "country"]
    missing_fields = [field for field in required_fields if field not in user_data]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    # Generate suggestions
    response = suggest_careers(user_data)
    return jsonify(response)

@app.route('/api/load_dataset', methods=['POST'])
def load_data():
    file_path = request.json.get('file_path', '')
    try:
        load_dataset(file_path)
        return jsonify({"message": "Dataset loaded successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
