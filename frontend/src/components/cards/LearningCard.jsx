import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../context/userContext';

const LearningCard = () => {
  const {id}=useParams();
  const {user}=useContext(UserContext)
  const getLearningCards=async()=>{
    console.log("working in learning card");
    try{
      const response=await fetch(`http://localhost:8000/api/learningcards/${id}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "email":`${user.email}`,
        },
    
      })
      console.log("fetching done")
      const data=await response.json();
      console.log("all learning cards",data);
      // setAllLearningCards(data.learningCards);
    }
    catch(error){
      console.log("Error in Learning Card",error.message);
    }
  }
  useEffect(()=>{
    getLearningCards();
  },[])
  return (
    <div>LearningCard</div>
  )
}

export default LearningCard