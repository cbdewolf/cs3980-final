import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture(scope="module")
def client():
    # Using "with" ensures the app.lifespan() async generator runs
    with TestClient(app) as c:
        yield c


def test_register_endpoint(client):
    import random

    tested = [1]
    test_number = 1
    while test_number in tested:
        test_number = random.randint(1, 1000)
        if test_number not in tested:
            tested.append(test_number)
            break
    print(f"Testing with testuser{test_number}")

    test_user = {
        # You may have to change each copy of the username each time you test
        # So if "testuser1" isn't working, try "testuser2" and so on
        "username": f"testuser{test_number}",
        "password": "testpassword123",
    }
    response = client.post("/api/users/register", json=test_user)
    assert response.status_code == 200
    assert response.json()["username"] == f"testuser{test_number}"


def test_register_duplicate_username(client):
    duplicate = {"username": "testuser1", "password": "anotherpassword"}
    # Now that the first user exists, this should 400
    response = client.post("/api/users/register", json=duplicate)
    assert response.status_code == 400
    assert "already exists" in response.json()["detail"]
