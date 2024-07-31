import React from 'react'
import Nav from './nav'
function Home() {
  const steakPicture ="https://www.luxurylifestylemag.co.uk/wp-content/uploads/2022/05/bigstock-Grilled-Marbled-Meat-Steak-Fil-268244788.jpg"
  return (
    <div>
     <img src={steakPicture} />
      <br></br>
      <div>
        <h1>
          Want to be making things like this? Go to the recipes tab and get started!
        </h1>
      </div>
      </div>
  )
}


export default Home