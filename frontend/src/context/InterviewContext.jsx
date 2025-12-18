import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const InterviewContext=createContext();
const InterviewProvider = ({children}) => {
  const [responseLoading,setResponseLoading]=useState(false);
  const [geminiData,setGeminiData]=useState(false);
  const [isAdd,setIsAdd]=useState(false);
  const [allQAData,setAllQAData]=useState([]);

const [formData, setFormData] = useState({
  role:"Frontend",
  experience:"2",
  description:"Interview prep for startups",
  topics:"React, hooks,api"
});
useEffect(()=>{
console.log("allqa data",allQAData);
},[allQAData])
useEffect(()=>{
console.log("Inside Context", formData);
console.log("responseLoading",responseLoading);
},[formData,responseLoading])
  return (
    <InterviewContext.Provider value={{allQAData,setAllQAData,isAdd,setIsAdd,formData,setFormData,responseLoading,setResponseLoading,setGeminiData,geminiData}}>
      {children}
    </InterviewContext.Provider>
  )
}

export default InterviewProvider