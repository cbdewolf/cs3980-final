from beanie import Document
from pydantic import BaseModel

"""
todo: implement user model and other user authentication fun stuff
"""


class User(Document):
    pass


class UserRequest(BaseModel):
    pass
