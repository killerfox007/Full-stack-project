from config import app, db
from models import db, User, Recipe, Review
if __name__ == "__main__":
  with app.app_context():
    Recipe.query.delete()
    Review.query.delete()
    User.query.delete()
    kaleb = User(user="Bob")
    chicken = Recipe(recipe="Shrimp", user_id="1")

    review = Review(review="This is ass!", user_id="1", recipe_id="1")
    
    db.session.add(kaleb)
    db.session.add(chicken)
    db.session.add(review)
    db.session.commit()
