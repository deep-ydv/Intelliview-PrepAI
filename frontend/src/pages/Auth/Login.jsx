import React, { useEffect } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const {user,setUser} =useContext(UserContext);
  const navigate=useNavigate();
  useEffect(() => {
  if(user) navigate("/dashboard");
  }, [user])
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Logged in:", user);
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Interview Prep AI</h1>
      <button
        onClick={handleLogin}
        className="bg-white cursor-pointer hover:shadow-2xl text-black font-semibold px-6 py-3 rounded-lg shadow flex items-center" 
      >
       <img src="https://img.freepik.com/premium-vector/google-logo_1273375-1572.jpg?semt=ais_hybrid&w=740&q=80" width={50}/>Sign in with Google
      </button>
    </div>
  );
};

export default Login;
