import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate} from 'react-router-dom'
import ReviewForm from '../reviews/reviewform'

function RecipeForm() {
    const [recipes, setRecipes] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
      function getUsers(){
        fetch("/api/users")
        .then(resp => resp.json())
        .then(data => {
          setUsers(data)})
      }
        getUsers()
      }, [])

    const navigate = useNavigate()

    useEffect(() => {
        async function getrecipes(){
        const responce = await fetch("/api/recipes")
        const data = await responce.json()
        setRecipes(data)
      }
      getrecipes()
    }, [])
    async function submitForm(newRecipe){
        const responce = await fetch("http://127.0.0.1:5555" + "/recipes/create", {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newRecipe)
    })
        const recipe = await responce.json()
        setRecipes([...recipes, recipe])
        navigate("/recipes")
    }
    const initialValues = {
        valueRecipe: "",
        user_id: 1
    }
    
    const validationSchema = yup.object({
        valueRecipe: yup.string().min(4, "Must be 4 characters long").required()
    })
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function(values) {
            submitForm({...values})
            
    }})
    const usersMapped = users.map(user => <option key={user.id} value={user.id}>{user.user}</option>)
    const recipeMapped = recipes.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.recipe}</option>)

    return (
        <div>
            <h1>Create Recipe</h1>
            <form onSubmit={formik.handleSubmit}>
            <div> 
                <label htmlFor='recipe'>Recipe Link:</label>
                <input type="text" name="valueRecipe" id="recipe" value={ formik.values.valueRecipe } onChange={ formik.handleChange } />
            </div>
            {formik.touched.valueRecipe && formik.errors.valueRecipe ? (
                    <div style={{color:'red'}}> {formik.errors.valueRecipe}</div>
                ): null }
            <br></br>
            <div> 
                <label htmlFor='user'>Select User:</label>
                <select type="text" name="user" id="user" value={formik.values.user_id} onChange={formik.handleChange}>{usersMapped}</select>
            </div>
           
            <input type="submit" value="Create Recipe"></input>
            </form>
            

        </div>
    )
}

export default RecipeForm