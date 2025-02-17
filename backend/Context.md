# Credit Score Model

## Project Description
The Credit Score Model is a machine learning-based application that predicts an individual's creditworthiness based on their financial history, demographic data, and other relevant factors. The app provides a user-friendly interface for inputting data, displays the credit score, and offers insights into factors influencing the score.

## Features

### 1. User Authentication
- Users can register, log in, and manage their accounts.
- Secure authentication using JWT (JSON Web Tokens).

### 2. Data Input and Preprocessing
- Users can input financial and demographic data (e.g., income, loan history, employment status).
- Data is preprocessed (e.g., handling missing values, normalization) before being fed into the model.

### 3. Credit Score Prediction
- Machine learning model predicts the credit score based on input data.
- Provides a score (e.g., 300–850) and a risk category (e.g., low, medium, high).

### 4. Explainability and Insights
- Explains factors influencing the credit score (e.g., feature importance).
- Visualizations (e.g., bar charts, pie charts) to help users understand their score.

### 5. Admin Dashboard
- Admins can view all user data, monitor model performance, and retrain the model if necessary.

### 6. Responsive Design
- Accessible on desktop, tablet, and mobile devices.

## API Endpoints Overview

### 1. User Authentication

- **POST /register**
  - **Description**: Register a new user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User registered successfully."
    }
    ```

- **POST /login**
  - **Description**: Log in a user.
  - **Request Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "securepassword"
    }
    ```
  - **Response**:
    ```json
    {
      "token": "jwt_token_here"
    }
    ```

### 2. Financial Data Management

- **POST /financial_data**
  - **Description**: Submit financial data for a user.
  - **Request Body**:
    ```json
    {
      "annual_income": 50000,
      "monthly_expenses": 2000,
      "employment_status": "Employed",
      "credit_history_length": 5,
      "num_existing_loans": 1,
      "loan_amount": 15000
    }
    ```
  - **Response**:
    ```json
    {
      "message": "Financial data submitted successfully."
    }
    ```

- **GET /financial_data**
  - **Description**: Retrieve financial data for the logged-in user.
  - **Response**:
    ```json
    {
      "financial_data": [
        {
          "annual_income": 50000,
          "monthly_expenses": 2000,
          "employment_status": "Employed",
          "credit_history_length": 5,
          "num_existing_loans": 1,
          "loan_amount": 15000
        }
      ]
    }
    ```

### 3. Credit Score Prediction

- **POST /predict**
  - **Description**: Get credit score prediction based on financial data.
  - **Request Body**:
    ```json
    {
      "annual_income": 50000,
      "monthly_expenses": 2000,
      "employment_status": "Employed",
      "credit_history_length": 5,
      "num_existing_loans": 1,
      "loan_amount": 15000
    }
    ```
  - **Response**:
    ```json
    {
      "predicted_score": 750,
      "risk_category": "Medium"
    }
    ```

### 4. Admin Management (Admin Only)

- **GET /admin/users**
  - **Description**: Fetch all user data.
  - **Response**:
    ```json
    {
      "users": [
        {
          "id": "user_id",
          "email": "user@example.com",
          "created_at": "2023-01-01T00:00:00Z"
        }
      ]
    }
    ```

- **DELETE /admin/users/{user_id}**
  - **Description**: Delete a user by ID.
  - **Response**:
    ```json
    {
      "message": "User deleted successfully."
    }
    ```

- **GET /admin/users/{user_id}**
  - **Description**: Get user details by ID.
  - **Response**:
    ```json
    {
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        "created_at": "2023-01-01T00:00:00Z"
      }
    }
    ```

- **PUT /admin/users/{user_id}**
  - **Description**: Update user details by ID.
  - **Request Body**:
    ```json
    {
      "email": "new_email@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "message": "User details updated successfully."
    }
    ```

## Technology Stack Recommendation

### Frontend
- **Framework**: React (using Vite for faster builds).
- **Visualization**: Chart.js (lighter than D3.js).
- **State Management**: Zustand (lighter than Redux).
- **Styling**: Tailwind CSS (purge unused styles).

### Backend
- **Framework**: Flask (lighter than Django).
- **API Design**: RESTful APIs.
- **Authentication**: JWT.
- **Machine Learning**: Scikit-learn (lighter than TensorFlow).
- **Model Explainability**: SHAP.

### Database
- **Development**: SQLite.
- **Production**: PostgreSQL.
- **Caching**: Skip Redis in development.

## Phase 5: Deployment & Maintenance
1. **Containerization**
   - Create Dockerfiles for frontend and backend.
   - Set up Docker Compose for local development.
   - Configure environment variables.

## Database Schema

### Tables

1. **users**
   - `id` (UUID, Primary Key)
   - `email` (String, Unique, Not Null)
   - `password_hash` (String, Not Null)
   - `created_at` (Timestamp, Not Null)
   - `updated_at` (Timestamp, Not Null)

2. **user_profiles**
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key to users.id)
   - `first_name` (String)
   - `last_name` (String)
   - `date_of_birth` (Date)
   - `phone_number` (String)
   - `created_at` (Timestamp, Not Null)
   - `updated_at` (Timestamp, Not Null)

3. **financial_data**
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key to users.id)
   - `annual_income` (Decimal)
   - `monthly_expenses` (Decimal)
   - `employment_status` (String)
   - `credit_history_length` (Integer)
   - `num_existing_loans` (Integer)
   - `loan_amount` (Decimal)
   - `created_at` (Timestamp, Not Null)
   - `updated_at` (Timestamp, Not Null)

4. **credit_scores**
   - `id` (UUID, Primary Key)
   - `user_id` (UUID, Foreign Key to users.id)
   - `score` (Integer)
   - `risk_category` (String)
   - `generated_at` (Timestamp, Not Null)

5. **model_versions**
   - `id` (UUID, Primary Key)
   - `version` (String)
   - `path` (String)
   - `created_at` (Timestamp, Not Null)
   - `is_active` (Boolean)

## Optimal Folder Structure

credit-score-model/
├── .devcontainer/               # Codespace configuration
│   ├── devcontainer.json        # Codespace settings
│   └── Dockerfile               # Custom Dockerfile if needed
├── frontend/
│   ├── public/                  # Static assets (e.g., favicon, images)
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── pages/               # Page components (e.g., Login, Dashboard)
│   │   ├── services/            # API service layer (e.g., Axios calls)
│   │   ├── utils/               # Utility functions (e.g., formatters, validators)
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Entry point
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
│
├── backend/
│   ├── app/
│   │   ├── api/                 # API routes (e.g., auth, prediction)
│   │   ├── models/              # Database models (e.g., User, FinancialData)
│   │   ├── services/            # Business logic (e.g., authentication, prediction)
│   │   └── main.py              # Flask entry point
│   ├── migrations/              # Database migrations (if using Alembic)
│   ├── requirements.txt         # Backend dependencies
│   └── config.py                # Configuration (e.g., database, secrets)
│
├── machine_learning/
│   ├── data/                    # Raw and processed datasets
│   ├── models/                  # Trained models (e.g., model.pkl)
│   ├── preprocessing/           # Data preprocessing scripts
│   └── requirements.txt         # ML-specific dependencies
│
├── docker/
│   ├── frontend.Dockerfile      # Dockerfile for frontend
│   ├── backend.Dockerfile       # Dockerfile for backend
│   └── docker-compose.yml       # Docker Compose for local development
│
├── .env                         # Environment variables
├── .gitignore                   # Git ignore file
└── README.md                    # Project overview and instructions