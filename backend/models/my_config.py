from pydantic_settings import BaseSettings, SettingsConfigDict


class MyConfig(BaseSettings):
    connection_string: str
    secret_key: str
    model_config = SettingsConfigDict(env_file=".env")


def get_settings() -> MyConfig:
    return MyConfig()
