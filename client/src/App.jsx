import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css'
import Nav from './comps/nav'
import Home  from './comps/home'
import RecipeList from './comps/recipes/recipeslist'
import Users from "./comps/users/users"
import RecipeForm from "./comps/recipes/recipeform"
import ReviewForm from "./comps/reviews/reviewform"
import UsersForm from "./comps/users/usersform"
import EditRecipe from "./comps/recipes/editrecipe"
function App() {
  return (
    <Router>
      <Nav />
      <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/recipes" element={<RecipeList/>}></Route>
      <Route path="/reviews" element={<ReviewForm/>}></Route>
      <Route path="/users" element={<Users/>}></Route>
      <Route path="/recipes/create" element={<RecipeForm/>}></Route>
      <Route path="/users/create" element={<UsersForm/>}></Route>
      <Route path="recipe/edit/:id" element={<EditRecipe />}> </Route>
      </Routes>
    </Router>
  )
}

export default App
