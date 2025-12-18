import mongoose from "mongoose";

const learningCardSchema=new mongoose.Schema(
  {
    role:{type:String , required:true},
    topics:{type:String, required:true},
    experience:{type:Number,require:true},
    description:{type:String},
    email:{type:String,required:true},
  },
  {timestamps:true}
);

export default mongoose.model("LearningCard",learningCardSchema);