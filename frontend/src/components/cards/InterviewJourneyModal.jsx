import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {InterviewContext} from '../../context/InterviewContext'
import { UserContext } from "../../context/userContext";
import Pseudo from "./Pseudo";
import ResponseLoader from "./ResponseLoader";
const InterviewJourneyModal = ({ onClose }) => {
  const  {setFormData,responseLoading,setResponseLoading,setIsAdd}= useContext(InterviewContext);
  const {user}=useContext(UserContext);
const navigate=useNavigate();
  const [form, setForm] = useState({
    role: "",
    experience: "",
    topics: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response=await fetch("http://localhost:8000/api/learningcards",{
      method:"POST",
      headers:{ 
        "Content-Type":"application/json",
      },
      body: JSON.stringify({
        "description": `${form.description}`,
        "email": `${user.email}`,
        "experience": `${form.experience}`,
        "role": `${form.role}`,
        "topics": `${form.topics}`,
      }),
    });
    const data=await response.json();
    if(data)console.log("Backend Response",data);;
    }
    catch(error){
      console.log("Error in fetching ...", error);
    }
   
    console.log(form);
    setFormData(form);
    
    navigate("/allqa");
setIsAdd(false);
    // alert("Session created successfully!");
  };
  const handleCreateSession=()=>{
  }

  return  (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Start a New Interview Journey
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Fill out a few quick details and unlock your personalized set of
          interview questions!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Target Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="e.g., Frontend Developer, UI/UX Designer, etc."
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Years of Experience
            </label>
            <input
              type="number"
              min="0"
              name="experience"
              placeholder="e.g., 1 year, 3 years, 5+ years"
              value={form.experience}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Topics to Focus On
            </label>
            <input
              type="text"
              name="topics"
              placeholder="Comma-separated, e.g., React, Node.js, MongoDB"
              value={form.topics}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Any specific goals or notes for this session"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            onClick={handleCreateSession}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Create Session
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default InterviewJourneyModal;
