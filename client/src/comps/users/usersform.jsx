import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useNavigate} from 'react-router-dom'

function UsersForm() {
    const initialValues = {
        name: ""
    }
    const navigate = useNavigate()
    const validationSchema = yup.object({
        name: yup.string().min(3, "Name Must be 3 characters").required()
    })

    async function submitForm(newUser){
        const responce = await fetch("http://127.0.0.1:5555" + "/users/create", {
        method: 'POST',
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    })
        const user = await responce.json()
        navigate("/users")
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: function(values) {
            submitForm({...values})
    }})
  return (
    <div>
        <h1>Create User</h1>
            <form onSubmit={formik.handleSubmit}>
            <div> 
                <label htmlFor='name'>Name of user:</label>
                <input type="text" name="name" id="name" value={ formik.values.name } onChange={ formik.handleChange } />
            </div>
            {formik.touched.name && formik.errors.name ? (
                    <div style={{color:'red'}}> {formik.errors.name}</div>
                ): null }
            <input type="submit" value="Create User"></input>
            </form>
    </div>
  )
}

export default UsersForm