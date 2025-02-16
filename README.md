# Credit Score Model

## Development Setup

1. Clone the repository
2. Open in GitHub Codespace
3. The dev container will automatically set up the environment
4. Access:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## API Endpoints
- **POST /register**: Register a new user
- **POST /login**: Log in a user
- **POST /financial_data**: Submit financial data
- **POST /predict**: Get credit score prediction
- **GET /admin/users**: Fetch all user data (Admin only)
- **DELETE /admin/users/<user_id>**: Delete a user (Admin only)
- **GET /admin/users/<user_id>**: Get user details (Admin only)
- **PUT /admin/users/<user_id>**: Update user details (Admin only)

## User Role Management
- Users can have roles (e.g., admin, user) to manage permissions.

## Testing
- Run tests using `npm test` for frontend and `pytest` for backend.

## Deployment
- Use Docker for containerization and Docker Compose for local development.