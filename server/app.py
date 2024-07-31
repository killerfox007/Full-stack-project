from config import app, api
from models import *
from flask_restful import Api, Resource
from flask import request, Flask



class UserResource(Resource):
    def get(self):
        user = [user.to_dict() for user in User.query.all()]
        return user, 200
    
class ReviewsResource(Resource):
    def get(self):
        review = [rev.to_dict() for rev in Review.query.all()]
        return review, 200

class RecipesResource(Resource):
    def get(self):
        recipe = [rec.to_dict() for rec in Recipe.query.all()]
        return recipe, 200
class CreateRecipeResource(Resource):
    def post(self):
        data = request.get_json()
        recipe = data.get("valueRecipe")
        user_id = data.get("user_id")
        newRecipe = Recipe(recipe=recipe, user_id=user_id)
        db.session.add(newRecipe)
        db.session.commit()
        return newRecipe.to_dict(), 200
class ReviewsIdResource(Resource):
    def patch(self, id):
        recipe = Recipe.query.get(id)
        data = request.get_json()
        for key, value in data.items():
            setattr(recipe, key, value)
        db.session.add(recipe)
        db.session.commit()
        return recipe.to_dict(), 200
            
    def delete(self, id):
        print(id)
        recipe = Recipe.query.get(id)
        review = Review.query.get(id)
        if recipe:
            db.session.delete(recipe)
            db.session.commit()
            return {}, 204
        else:
            return {"error": "recipe not found"}, 404
    def get(self, id):
            recipe = Recipe.query.get(id)
            if recipe:
                return recipe.to_dict(), 200
            else:
                return {"error": "Recipe not found"}, 404

class CreateReviewResource(Resource):
    def post(self):
        data = request.get_json()
        review = data.get("review")
        recipe_id = data.get("recipe_id")
        user_id = data.get("user_id")
        newReview = Review(review=review, recipe_id=recipe_id,user_id=user_id)
        db.session.add(newReview)
        db.session.commit()
        return newReview.to_dict(), 200
    
class CreateUserResource(Resource):
    def post(self):
        data = request.get_json()
        user = data.get("name")
        newUser = User(user=user)
        db.session.add(newUser)
        db.session.commit()
        return newUser.to_dict(), 200
    


    
api.add_resource(UserResource, "/users")
api.add_resource(ReviewsResource, "/reviews")
api.add_resource(RecipesResource, "/recipes")
api.add_resource(ReviewsIdResource, "/recipes/<int:id>")
api.add_resource(CreateRecipeResource,"/recipes/create")
api.add_resource(CreateReviewResource,"/reviews/create")
api.add_resource(CreateUserResource,"/users/create")
if __name__ == "__main__":
  app.run(port=5555, debug=True)
