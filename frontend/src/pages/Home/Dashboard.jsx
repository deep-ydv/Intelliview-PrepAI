import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getAuth, signOut } from "firebase/auth";
import InterviewJourneyModal from "../../components/cards/InterviewJourneyModal";
import { InterviewContext } from "../../context/InterviewContext";
// import GeminiResponse from "../Other/GeminiResponse";

const userData = {
  name: "John Doe",
  avatar:
    "https://api.dicebear.com/7.x/adventurer/svg?seed=John",
};

const interviewSets = [
  {
    short: "FD",
    role: "Frontend Developer",
    stack: "React, JavaScript, CSS",
    experience: "2 Years",
    qna: 10,
    lastUpdated: "25th Oct 2025",
    goal: "Preparing for product-based interviews",
    color: "from-green-100 to-green-50",
  },
  {
    short: "BE",
    role: "Backend Developer",
    stack: "Node.js, Express, MongoDB",
    experience: "3 Years",
    qna: 15,
    lastUpdated: "24th Oct 2025",
    goal: "Focus on API design and scaling",
    color: "from-amber-100 to-yellow-50",
  },
  {
    short: "DA",
    role: "Data Analyst",
    stack: "SQL, Excel, Power BI",
    experience: "1 Year",
    qna: 8,
    lastUpdated: "20th Oct 2025",
    goal: "Targeting finance-based roles",
    color: "from-blue-100 to-indigo-50",
  },
];
const gradientColors = [
  "from-green-100 to-green-50",
  "from-blue-100 to-blue-50",
  "from-pink-100 to-pink-50",
  "from-purple-100 to-purple-50",
  "from-yellow-100 to-yellow-50",
  "from-indigo-100 to-indigo-50",
  "from-red-100 to-red-50",
  "from-teal-100 to-teal-50",
  "from-cyan-100 to-cyan-50",
  "from-orange-100 to-orange-50",
  "from-lime-100 to-lime-50",
  "from-emerald-100 to-emerald-50",
  "from-rose-100 to-rose-50",
  "from-sky-100 to-sky-50",
  "from-violet-100 to-violet-50",
  "from-amber-100 to-amber-50",
  "from-fuchsia-100 to-fuchsia-50",
  "from-stone-100 to-stone-50",
  "from-slate-100 to-slate-50",
  "from-zinc-100 to-zinc-50",
];

const Dashboard = () => {
  const {user,setUser}=useContext(UserContext);
  const {geminiData,responseLoading,isAdd,setIsAdd}=useContext(InterviewContext);
  const navigate=useNavigate();
  const auth=getAuth();
  const [profilePic,setProfilePic]=useState(null);
  const [allLearningCards,setAllLearningCards]=useState([]);

  useEffect(()=>{
    if(!user) navigate("/login");
  },[])

  const  getRandomGradient=()=>{
    const randomIndex = Math.floor(Math.random() * gradientColors.length);
    return gradientColors[randomIndex];
  }
  const  getInitials=(str)=> {
    const initials = str
      .trim()
      .split(/\s+/)
      .map(word => word[0]?.toUpperCase())
      .slice(0, 2)
      .join("");
  
    // If only one letter → add "D"
    if (initials.length === 1) return initials + "D";
    return initials;
  }
  const handleLogout = async () => {
    try {
      await signOut(auth);  // 🔥 Firebase logout
      console.log("User signed out");
      setUser(null);
      navigate("/"); // Redirect to login or home
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleAddNew=()=>{
    setIsAdd((prev)=>!prev);
  }
  const fetchAllLearningCards=async()=>{
    try{
      console.log("i m user",user);
      const response=await fetch("http://localhost:8000/api/learningcards",{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "email":`${user.email}`,
        },
    
      })
      const data=await response.json();
      console.log("all learning cards",data.learningCards);
      setAllLearningCards(data.learningCards);
    }
    catch(error){
      console.log("Error in fetchin learning cards",error);
    }
  }
  const handleCardClick=(item)=>{
    console.log(item);
    navigate(`/learningcard/${item._id}`);
  }
  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(",", "");
  }
  useEffect(()=>{
    fetchAllLearningCards();
  },[user])
  return  user&&(
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Interview Prep AI</h1>

        <div className="flex items-center gap-3">
          <img
            src={user.reloadUserInfo.photoUrl?user.reloadUserInfo.photoUrl:"https://i.pinimg.com/564x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"}
            alt="User"
            className="w-10 h-10 rounded-full border"
          />
          <div >
            <p className="font-semibold text-gray-800">{user.displayName}</p>
            {/* <p className="font-semibold text-gray-400 text-[10px]">{user.email}</p> */}
            <button onClick={handleLogout} className="text-sm text-orange-500 font-medium hover:underline">
              Logout
            </button>
            
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {allLearningCards.map((item, i) => (
          <div onClick={()=>handleCardClick(item)}
            key={i}
            className={`bg-linear-to-br ${getRandomGradient()} border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-5`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white text-gray-800 font-bold text-sm w-10 h-10 flex items-center justify-center rounded-md shadow">
                {getInitials(item.role)}
              </div>
              <div>
                <h2 className="font-semibold text-lg">{item.role}</h2>
                <p className="text-xs text-gray-500">{item.topics}</p>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-600 mb-2">
              <span>Experience: {item.experience} Year</span>
              <span>{item.qna}10 Q&A</span>
            </div>
            <p className="text-xs text-gray-400 mb-2">
              Last Updated: {formatDate(item.createdAt)}
            </p>

            <p className="text-sm text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Add New Button */}
      <button onClick={handleAddNew} className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-full flex items-center gap-2 shadow-lg transition">
        <Plus size={18} />
        Add New
      </button>
      {isAdd && <InterviewJourneyModal/>}
      {}
    </div>
  );
};

export default Dashboard;
