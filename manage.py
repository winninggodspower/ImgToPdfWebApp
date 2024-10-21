from flask.cli import FlaskGroup

from src import app

cli = FlaskGroup(app)

@cli.command("create_db")
def create_db():
    """Create the database."""
    from src import db
    db.create_all()
    print("Database tables created.")

@cli.command("db_upgrade")
def db_upgrade():
    """Runs Alembic migrations."""
    from alembic import command
    from alembic.config import Config
    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")
    print("Database upgraded.")

if __name__ == "__main__":
    cli()