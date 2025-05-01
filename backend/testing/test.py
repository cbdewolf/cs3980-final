import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.models.user import User

# Create a test client
client = TestClient(app)

# Test the register endpoint
def test_register_endpoint():
# Test data for registration
    test_user = {
        "username": "testuser123",
        "password": "testpassword123",
        "bio": "Test user bio",
        "position": "Software Developer",
        "school": "Test University",
        "major": "Computer Science"
    }
# Send a POST request to the register endpoint
    response = client.post("/api/users/register", json=test_user)
# Check that the response is successful
    assert response.status_code == 200
# Check the response data structure
    data = response.json()
    assert "access_token" in data
    assert "user" in data
    assert data["user"]["username"] == test_user["username"]
    assert data["user"]["bio"] == test_user["bio"]
    assert data["user"]["position"] == test_user["position"]
    assert data["user"]["school"] == test_user["school"]
    assert data["user"]["major"] == test_user["major"]
# Password should not be returned in the response
    assert "password" not in data["user"]
# Check that is_admin is set to false by default
    assert data["user"]["is_admin"] is False
  
# Test registration with existing username
def test_register_duplicate_username():
    # Test data for registration
    test_user = {
        "username": "duplicate_user",
        "password": "testpassword",
        "bio": "First user bio"
    }
# Register the first user
    response = client.post("/api/users/register", json=test_user)
    assert response.status_code == 200
# Try to register another user with the same username
    duplicate_user = {
        "username": "duplicate_user",
        "password": "different_password",
        "bio": "Second user bio"
    }
    response = client.post("/api/users/register", json=duplicate_user)
# Should fail with 400 Bad Request
    assert response.status_code == 400
    data = response.json()
    assert "detail" in data
    assert "already exists" in data["detail"]

# Run the tests
if name == "main":
    pytest.main(["-v"])
