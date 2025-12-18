import mongoose from "mongoose";

// Sub-schema for each Q&A
const questionAnswerSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    theoreticalAnswer: {
      type: String,
      required: true
    },
    codingExample: {
      type: String,
      default: ""
    }
  },
  { _id: false } // prevents extra _id for each item
);

const learningCardSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true
    },

    topics: {
      type: String,
      required: true
    },

    experience: {
      type: Number,
      required: true
    },

    description: {
      type: String
    },

    email: {
      type: String,
      required: true
    },

    // 👇 Array of JSON objects
    questionAnswers: {
      type: [questionAnswerSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("LearningCard", learningCardSchema);
