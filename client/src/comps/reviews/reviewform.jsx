import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate} from 'react-router-dom'
function ReviewForm() {
    const [recipes, setRecipes] = useState([])
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getrecipes(){
        const responce = await fetch("/api/recipes")
        const data = await responce.json()
        setRecipes(data)
      }
      getrecipes()
    }, [])

    useEffect(() => {
        function getUsers(){
          fetch("/api/users")
          .then(resp => resp.json())
          .then(data => {
            setUsers(data)})
        }
          getUsers()
        }, [])

    async function submitForm(newReview){
        const responce = await fetch("http://127.0.0.1:5555" + "/reviews/create", {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
    })
        const review = await responce.json()
    }
    const initialValues = {
        review: "",
        recipe_id: 1,
        user_id: 1
    }
    
    const validationSchema = yup.object({
        review: yup.string().min(4, "Review must be 4 characters long").required()
    })
    
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function(values) {
            submitForm({...values})
            navigate("/recipes")
    }})

    const recipeMapped = recipes.map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.recipe}</option>)
    const usersMapped = users.map(user => <option key={user.id} value={user.id}>{user.user}</option>)

    return (
        <div>
            <h1>Create Review</h1>
            <form onSubmit={formik.handleSubmit}>
            <div> 
                <label htmlFor='review'>Review:</label>
                <input type="text" name="review" id="review" value={ formik.values.review } onChange={ formik.handleChange } />
                {formik.touched.review && formik.errors.review ? (
                    <div style={{color:'red'}}> {formik.errors.review}</div>
                ): null }
            </div>
            <br></br>
            <div> 
                <label htmlFor='recipe_id'>Select Recipe:</label>
                <select type="text" name="recipe_id" id="recipe_id" value={formik.values.recipe_id} onChange={formik.handleChange}>{recipeMapped}</select>
            </div>
            <div> 
                <label htmlFor='user'>Select User:</label>
                <select type="text" name="user_id" id="user_id" value={formik.values.usersMapped} onChange={formik.handleChange}>{usersMapped}</select>
            </div>
            <input type="submit" value="Create Review"></input>
            
            </form>
            

        </div>
    )
}

export default ReviewForm