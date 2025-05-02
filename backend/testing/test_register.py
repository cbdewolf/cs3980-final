import pytest
from fastapi.testclient import TestClient

from backend.main import app

@pytest.fixture(scope="module")
def client():
    # Using "with" ensures the app.lifespan() async generator runs
    with TestClient(app) as c:
        yield c

def test_register_endpoint(client):
    test_user = {
        # You may have to change each copy of the username each time you test
        # So if "testuser1" isn't working, try "testuser2" and so on
        "username": "testuser1",
        "password": "testpassword123"
    }
    response = client.post("/api/users/register", json=test_user)
    assert response.status_code == 200
    assert response.json()["username"] == "testuser1"

def test_register_duplicate_username(client):
    duplicate = {
        "username": "testuser1",
        "password": "anotherpassword"
    }
    # Now that the first user exists, this should 400
    response = client.post("/api/users/register", json=duplicate)
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]
