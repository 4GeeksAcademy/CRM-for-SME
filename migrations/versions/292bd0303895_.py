"""empty message

<<<<<<<< HEAD:migrations/versions/292bd0303895_.py
Revision ID: 292bd0303895
Revises: 
Create Date: 2024-02-17 02:08:23.171135
========
Revision ID: 778abd3c2897
Revises: 
Create Date: 2024-02-16 20:55:51.300773
>>>>>>>> 5649b4baf99f5cb5c23f330a4c8c0ab2e747d3d0:migrations/versions/778abd3c2897_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/292bd0303895_.py
revision = '292bd0303895'
========
revision = '778abd3c2897'
>>>>>>>> 5649b4baf99f5cb5c23f330a4c8c0ab2e747d3d0:migrations/versions/778abd3c2897_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('client',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=250), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('phone', sa.String(length=250), nullable=False),
    sa.Column('address', sa.String(length=250), nullable=True),
    sa.Column('company', sa.String(length=250), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('user_name', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('invoice',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.Column('detail', sa.String(length=250), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('note',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('note_content', sa.String(length=250), nullable=True),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.Column('user_id', sa.String(length=200), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_name'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('payment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('amount', sa.Float(), nullable=False),
    sa.Column('payment_date', sa.DateTime(), nullable=False),
    sa.Column('detail', sa.String(length=250), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=250), nullable=False),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('due_date', sa.DateTime(), nullable=False),
    sa.Column('date_created', sa.DateTime(), nullable=False),
    sa.Column('status', sa.String(length=250), nullable=False),
    sa.Column('priority', sa.String(length=250), nullable=False),
    sa.Column('user_name', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.String(length=200), nullable=False),
    sa.Column('client_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['client_id'], ['client.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.user_name'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('task')
    op.drop_table('payment')
    op.drop_table('note')
    op.drop_table('invoice')
    op.drop_table('user')
    op.drop_table('client')
    # ### end Alembic commands ###
