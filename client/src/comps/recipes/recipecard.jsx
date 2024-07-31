import React from 'react'
import { Link } from 'react-router-dom'

const RecipeCard = ({ recipe,handleClick }) => {



  return (
    <div>
        <h2>{recipe.recipe}</h2>
        Reviews:
        {
        recipe.recipe_reviews.length === 0 ? (
        <p>No reviews yet!</p>
        ) : (
        <ul>
        {recipe.recipe_reviews.map((recipereview, index) => (
        <div>
        <li key={index}>{recipereview.review}</li>
        <br></br>
        Review left by: <p>{recipereview.userreviews.user}</p>

        
        </div>
        ))}
        </ul>)}
        <h3>Post Created by: {recipe.recipe_user.user}</h3>
        <p><Link to={'/recipe/edit/' + recipe.id} >Edit Review</Link></p>
        <button value={recipe.id} onClick={handleClick}>Delete</button>
        
        <p>----------------------------------------</p>
        
    </div>
  )
}

export default RecipeCard