import unittest
from app import create_app, db
from app.models.user import User
import jwt
import uuid

class MiddlewareTestCase(unittest.TestCase):
    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()
        with self.app.app_context():
            db.create_all()
            self.user = User(id=str(uuid.uuid4()), email='test@example.com')
            self.user.set_password('password')
            db.session.add(self.user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_token_required(self):
        # Test without token
        response = self.client.get('/admin/users')
        self.assertEqual(response.status_code, 403)

        # Test with invalid token
        response = self.client.get('/admin/users', headers={'Authorization': 'Bearer invalidtoken'})
        self.assertEqual(response.status_code, 403)

        # Test with valid token
        token = jwt.encode({'user_id': self.user.id}, 'your_secret_key', algorithm='HS256')
        response = self.client.get('/admin/users', headers={'Authorization': f'Bearer {token}'})
        self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
    unittest.main() 