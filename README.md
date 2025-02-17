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

## Performance Optimization
- Added caching with Redis to improve response times for predictions.
- Optimized database queries using eager loading to reduce the number of queries.
- Implemented model serving optimization using FastAPI for better performance.

## Model Setup

1. Place trained model (model.pkl) in `machine_learning/models/`
2. Retrain model (if needed):
   ```bash
   python machine_learning/train_model.py
   ```

## Database Setup

### Development
- The application uses SQLite for development.
- The development database is stored in `dev.db`.

### Production
- The application uses PostgreSQL for production.
- Set the `DATABASE_URL` environment variable to connect to the PostgreSQL database.

### Migrations
- Use Flask-Migrate for handling database migrations.
- Run `flask db init` to initialize migrations.
- Run `flask db migrate -m "Migration message"` to create a migration script.
- Run `flask db upgrade` to apply migrations to the database.