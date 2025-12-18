
import LearningCard from "../models/LearningCardModel.js"

export const createLearningCard=async(req,res)=>{
  try {
    const {role,experience,topics,description,email}=req.body;
    
    const newLearningCard= new LearningCard({role,experience,topics,description,email});
    console.log("Yess");
    await newLearningCard.save();
    console.log(newLearningCard);
    res.status(201).json({message:"LearningCard Created Successfully",newLearningCard});
  } catch (error) {
    console.log("error in fetching..",error);
    res.status(500).json({message:"Error Creating Learning Card",error:error.message});
  }
}

export const getAllLearningCards=async(req,res)=>{
  try{
    const email=req.headers["email"];
    if(!email){
      console.log("Email not found...");
      return res.status(400).json({message:"Email is required"});
    } 
      
    const learningCards=await LearningCard.find({email});
    res.status(200).json({"learningCards":learningCards});
  }
  catch(error){
    console.log("Error in getting all learning cards...")
    res.status(500).json({message:"Error GettingAll Learning Card",error});

  }

}

export const updateLearningCard=async()=>{
  try{
    
  }
  catch(error){

  }
}
