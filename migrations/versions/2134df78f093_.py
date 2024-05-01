"""empty message

Revision ID: 2134df78f093
Revises: 9df9e0aad2bc
Create Date: 2024-05-01 21:26:15.269111

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2134df78f093'
down_revision = '9df9e0aad2bc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('credits', sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('credits')

    # ### end Alembic commands ###
