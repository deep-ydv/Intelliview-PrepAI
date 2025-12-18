import mongoose from "mongoose";

const InterviewQuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true
    },

    theoreticalAnswer: {
      type: String,
      required: true
    },

    codingExample: {
      type: String,
      default: ""
    },

    // Optional but VERY useful for IntelliView
    role: {
      type: String,
      required: true, // e.g. Frontend, Backend, Fullstack
      index: true
    },

    topic: {
      type: String,
      required: true, // e.g. React, JavaScript
      index: true
    },

    difficulty: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("InterviewQuestion", InterviewQuestionSchema);
