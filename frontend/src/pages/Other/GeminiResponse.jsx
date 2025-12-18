import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
// import LandingPage from './pages/InterviewPrep/LandingPage'
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
// import Code from './components/cards/Code';
import AutoCodeBlock from '../../components/cards/AutoCodeBlock'
import { InterviewContext } from '../../context/InterviewContext';
import { ChevronDown, ChevronUp } from "lucide-react";
// import React, { useState } from "react";
import AllQA from '../../components/cards/AllQA'


const GeminiResponse = () => {
 
const [qaList,setQaList]=useState([]);
const {formData,setResponseLoading,setGeminiData}=useContext(InterviewContext);
const [loading,setLoading]=useState(false);


  const ai=async()=>{
    console.log(formData);
    const prompt = `
    You are an expert Frontend Technical Interviewer. 
    Generate exactly 2 interview questions and answers based on the following details:
    
    Role: ${formData.role}
    Experience Level: ${formData.experience} in years
    Key Topics: ${formData.topics}
    Purpose: ${formData.description}
    
    Guidelines:
    - Return output only in pure JSON (no extra text before or after the JSON).
    - JSON structure: an array of objects.
    - Each object must have three fields: 'question', 'theoreticalAnswer', and 'codingExample'.
    - 'theoreticalAnswer' should explain the concept clearly in 3–5 concise lines (no code).
    - 'codingExample' should include a short, relevant code example wrapped in Markdown code fences (e.g., \`\`\`js or \`\`\`html) so it can be easily highlighted using Highlight.js.
    - Maintain a professional, interviewer-style tone.
    - Ensure examples are realistic and contextually relevant to frontend development.
    
    Example structure (for reference only, not content):
    
    [
      {
        "question": "Explain the concept of state in React.",
        "theoreticalAnswer": "State in React represents dynamic data that affects what is rendered on the UI. It allows components to be interactive by tracking changes over time using useState or class-based state management.",
        "codingExample": "\`\`\`js\\nimport React, { useState } from 'react';\\nfunction Example() {\\n  const [count, setCount] = useState(0);\\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\\n}\\n\`\`\`"
      }
    ]
    
    Generate only the JSON array, nothing else.
    `;
    
    setLoading(true);
    try{
      const ans=await fetch("http://localhost:8000/response",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
        content:prompt,
          
        })
      });
      const res=await ans.json();

      console.log(res);
      let text = res.output.replace(/```json/g, "").replace(/```/g, "").trim();

      // 🧩 Try to parse JSON
      let parsed;
      
        parsed = JSON.parse(text);
        console.log(parsed);
      setQaList(parsed);
      
      // setResponseLoading(false);
      setGeminiData(true);
      setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }
  const handleClick=()=>{
    console.log("Click is done");
    ai();
  }
  useEffect(()=>{
    console.log("Gemini Response Executed");
    ai();
  },[])

  return loading?<div>Loading...</div>:(
    <>
    {/* <div>
      <AutoCodeBlock code={`function greet() { console.log("Hi"); }`} />
<AutoCodeBlock code={`<h1>Hello World</h1>`} />
<AutoCodeBlock code={`body { color: red; }`} />
<AutoCodeBlock code={`#include <iostream>\nusing namespace std;`} />
      <Code/> */}
      {/* <h1>helo</h1>
      {qaList.map((item, idx) => (
        <div key={idx} className="bg-gray-900 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">
            Q{idx + 1}: {item.question}
          </h2>
          <h2 className="text-xl font-semibold text-orange-400 mb-2">
            A{idx+1}: {item.theoreticalAnswer}

          </h2>
          <AutoCodeBlock code={item.codingExample}/>
        </div>
      ))}
      <button onClick={handleClick}>Load More...</button>
    </div> */}


        {/* ALLQA */}
       {/* {qaList.length>0 && <AllQA qaList={qaList}/>}  */}

   
    </>
  )
}

export default GeminiResponse;