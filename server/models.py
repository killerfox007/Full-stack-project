from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String)

    user_recipe = db.relationship("Recipe", back_populates="recipe_user")
    user_reviews = db.relationship("Review", back_populates="userreviews")
    serialize_rules = ('-user_reviews.userreviews',"-user_recipe.recipe_user")

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    id = db.Column(db.Integer, primary_key=True)
    recipe = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    recipe_user = db.relationship("User", back_populates="user_recipe")
    recipe_reviews = db.relationship("Review", back_populates="recipereviews", cascade='all, delete-orphan')
    serialize_rules = ('-recipe_reviews.recipereviews', "-recipe_user.user_recipe")
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Integer,  db.ForeignKey('recipes.id'))

    userreviews = db.relationship("User", back_populates="user_reviews")
    recipereviews = db.relationship("Recipe", back_populates="recipe_reviews")

    serialize_rules = ('-userreviews.user_reviews', '-recipereviews.recipe_reviews', "-userreviews.user_recipe", "-recipereviews.recipe_user")
    @validates('review')
    def validate_review(self, key, review):
        if len(review) >= 1:
            return review
        else:
            raise ValueError
   
