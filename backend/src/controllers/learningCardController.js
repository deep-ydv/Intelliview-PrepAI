
import LearningCard from "../models/LearningCardModel.js"



export const createLearningCard = async (req, res) => {
  try {
    const {
      role,
      experience,
      topics,
      description,
      email,
      questionAnswers // 👈 array of JSON objects
    } = req.body;
console.log(role);
console.log(questionAnswers);
    // Optional validation
    if (!role || !experience || !topics || !email) {
      return res.status(400).json({
        message: "Required fields are missing"
      });
    }

    const newLearningCard = new LearningCard({
      role,
      experience,
      topics,
      description,
      email,
      questionAnswers // 👈 saved properly
    });

    await newLearningCard.save();

    res.status(201).json({
      message: "LearningCard created successfully",
      data: newLearningCard
    });
  } catch (error) {
    console.error("Error creating LearningCard:", error);

    res.status(500).json({
      message: "Error creating LearningCard",
      error: error.message
    });
  }
};


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

export const getLearningCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const email = req.headers["email"];

    if (!id) {
      return res.status(400).json({ message: "LearningCard ID is required" });
    }

    // Optional but safe: validate ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ message: "Invalid LearningCard ID" });
    // }

    // Optional: restrict access by email
    const learningCard = await LearningCard.findOne({
      _id: id,
      email
    });

    if (!learningCard) {
      return res.status(404).json({
        message: "LearningCard not found"
      });
    }

    res.status(200).json({ learningCard });
  } catch (error) {
    console.error("Error fetching LearningCard by ID:", error);
    res.status(500).json({
      message: "Error fetching LearningCard",
      error: error.message
    });
  }
};

export const updateLearningCard=async()=>{
  try{
    
  }
  catch(error){

  }
}
