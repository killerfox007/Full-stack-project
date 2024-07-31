import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate} from 'react-router-dom'

function EditRecipe() {
  const [recipe, setRecipe] = useState([])
  const { id } = useParams()
  const [users, setUsers] = useState([])
  const navigate = useNavigate()
  

  async function getrecipe(){
    const responce = await fetch("http://127.0.0.1:5555/recipes/" + id)
    const data = await responce.json()
    setRecipe(data)
  }
    useEffect(() => {
      getrecipe()
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

      async function handleEdit(newRecipe){
        const response = await fetch("http://127.0.0.1:5555/" + "recipes/" + id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newRecipe)
        })
        const data = await response.json()
        navigate("/recipes")
      }
    const initialValues = {
    recipe: recipe.recipe,
    user_id: 1
    }
    const validationSchema = yup.object({
      recipe: yup.string().min(4).required()
  })
    const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: function(values) {
        handleEdit({...values})
    }})

    const usersMapped = users.map(user => <option key={user.id} value={user.id}>{user.user}</option>)
    
  return (
    <div>
      <h1>Edit {recipe.recipe}</h1>
      <form onSubmit={formik.handleSubmit}>
            <div> 
                <label htmlFor='recipe'>Recipe Name:</label>
                <input type="text" name="recipe" id="recipe" value={ formik.values.recipe } onChange={ formik.handleChange } />
            </div>
            {formik.touched.recipe && formik.errors.recipe ? (
                    <div style={{color:'red'}}> {formik.errors.recipe}</div>
                ): null }
            <br></br>
            <div> 
                <label htmlFor='user_id'>Select User:</label>
                <select type="text" name="user_id" id="user_id" value={formik.values.usersMapped} onChange={formik.handleChange}>{usersMapped}</select>
            </div>
            <input type="submit" value="Create Recipe"></input>
            
            </form>
    </div>
  )
}

export default EditRecipe