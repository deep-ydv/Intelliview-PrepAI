// const express = require('express');
import express from "express";
// const dotenv = require('dotenv');
import dotenv from "dotenv";
// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const cors=require('cors');
import cors from "cors";
// const learningCardRoutes =require('./src/routes/learningCardRoutes');
import learningCardRoutes from "./src/routes/learningCardRoutes.js";

// const {GoogleGenAI} =require('@google/genai');
import {GoogleGenAI} from "@google/genai";
import { connectDB } from "./src/config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
// app.get('/', (req, res) => {
//   res.send("Hello world");
// });

// import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.


app.post('/response',async(req,res)=>{
  const {content}=req.body;
  try{

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });
    
    
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
      });

      res.json({output:response.text});
      // console.log(response.text);
      console.log("Output generated Succesfuly");
      // const final_output=response.text;
      // console.log("final output",final_output);
      // let parsed;
      // try{
      //   parsed=JSON.parse(final_output);
      // } catch(e){
      //   parsed={raw:output};
      // }
      // console.log("parsed",parsed);
      // res.json({"output":parsed});
    
    
    

  }
  catch(error){
    res.json({message:"Something Went Wrong"});
  }
})

app.use("/api/learningcards",learningCardRoutes)

app.listen(8000, () => {
  console.log("Server is listening on 8000");
});
