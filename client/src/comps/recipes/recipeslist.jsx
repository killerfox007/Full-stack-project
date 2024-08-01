import React, { useEffect, useState } from 'react'
import RecipeCard from './recipecard'
import { Link } from "react-router-dom";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]) 

  function handleClick(e){
    fetch("http://127.0.0.1:5555/" + "recipes/" + e.target.value, {
      method: "DELETE"
    })
    const updatedRecipes = recipes.filter(recipe => recipe.id != e.target.value)
    setRecipes(updatedRecipes)
  }
  async function getrecipes(){
    const responce = await fetch("/api/recipes")
    const data = await responce.json()
    setRecipes(data)
  }
  useEffect(() => {
    getrecipes()
  }, [])
  const recipecards = recipes.map(recipe => <RecipeCard key={recipe.id} recipe={recipe} handleClick={handleClick} />)
  return (
    <div>
      <h2>Create a Recipe!</h2>
      <li><Link to='/recipes/create'>Create Recipe</Link></li>
      <h1>Recipe List</h1>
      {recipecards}
      
      </div>
  )
}

export default RecipeList