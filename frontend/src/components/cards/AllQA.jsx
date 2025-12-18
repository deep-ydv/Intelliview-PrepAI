import React, { useContext, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, X, Code2 } from "lucide-react";
import { InterviewContext } from "../../context/InterviewContext";
import AutoCodeBlock from "./AutoCodeBlock";
import LoadingScreen from "./LoadingScreen";

const qaData = [
  {
    question: "What is Docker? Explain its key components and how it is used in a DevOps environment.",
    answer: (
      <div>
        <p>
          Docker is a platform for building, deploying, and managing containerized applications. 
          A container is a standardized unit of software that packages code and all its dependencies 
          so that the application runs consistently across environments.
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><b>Docker Image:</b> Template containing instructions for creating a Docker container.</li>
          <li><b>Docker Container:</b> Runnable instance of a Docker image.</li>
          <li><b>Dockerfile:</b> A text file with instructions for building a Docker image.</li>
        </ul>
      </div>
    ),
    sideTitle: "Docker: Containerization for DevOps",
    sideContent: (
      <>
        <p>
          Docker enables developers to create, deploy, and run applications using containers — 
          lightweight packages that include everything needed to run software, ensuring consistency 
          across development and production environments.
        </p>
        <h3 className="mt-4 font-semibold">Key Components of Docker:</h3>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li><b>Docker Image:</b> Blueprint containing everything needed to run your application.</li>
          <li><b>Dockerfile:</b> Instructions on how to build the image.</li>
        </ul>
        <h3 className="mt-4 font-semibold">Example Dockerfile:</h3>
        <pre className="bg-gray-900 text-gray-100 text-xs p-4 rounded-lg mt-2 overflow-x-auto">
{`# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Run the application
CMD ["python", "app.py"]`}
        </pre>
      </>
    ),
  },
  {
    question: "Explain the core concepts of CI/CD and why they are important for a DevOps Engineer.",
    answer:
      "CI/CD automates software integration, testing, and deployment, ensuring faster, reliable delivery and reducing human errors.",
    sideTitle: "CI/CD Pipeline Example",
    sideContent: (
      <>
        <p>
          CI/CD pipelines automate the process of building, testing, and deploying applications, 
          allowing teams to deliver updates quickly and safely.
        </p>
        <h3 className="mt-4 font-semibold">Example GitHub Actions Workflow:</h3>
        <pre className="bg-gray-900 text-gray-100 text-xs p-4 rounded-lg mt-2 overflow-x-auto">
{`name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Deploy
        run: npm run deploy`}
        </pre>
      </>
    ),
  },
];

export default function AllQA() {
  const [qaList,setQaList]=useState([]);
const {formData,setResponseLoading,setGeminiData,allQAData,setAllQAData}=useContext(InterviewContext);
const [loading,setLoading]=useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [sideContent, setSideContent] = useState(null);

  // const [openIndex, setOpenIndex] = useState(null);
  const [showCodeIndex, setShowCodeIndex] = useState(false);
const [currIndex,setCurrIndex]=useState(0);
const [updateDate,setUpdateDate]=useState("30 Oct 2025")
  const handleShowCode=(e,idx)=>{
    e.preventDefault();
    setShowCodeIndex(prev=>!prev);
    setCurrIndex(idx);
  }
  function getCurrentFormattedDate() {
    const now = new Date();
    const day = now.getDate();
    const month = now.toLocaleString("default", { month: "short" });
    const year = now.getFullYear();
    const fullDate= `${day} ${month} ${year}`;
    setUpdateDate(fullDate);
  }
  const ai=async()=>{
    console.log(formData);
    const prompt = `
    You are an expert Frontend Technical Interviewer. 
    Generate exactly 8 interview questions and answers based on the following details:
    
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
        // setAllQAData((prevData)=>[...prevData,parsed]);
      setQaList((prev)=>[...prev,...parsed]);
      
      // setResponseLoading(false);
      setGeminiData(true);
      setLoading(false);
    }
    catch(error){
      console.log(error);
    }
  }
  const handleLoadMore=()=>{
    console.log("Click is done");
    ai();
    getCurrentFormattedDate();
  }
  useEffect(()=>{
    console.log("updated qalist",qaList);
  },[qaList])
  useEffect(()=>{
    console.log("Gemini Response Executed");
    ai();
  },[])



useEffect(() => {
  console.log("Inside Qa",qaList);
}, [])

  return loading || !allQAData?<LoadingScreen/>: (
    <div className="relative min-h-screen bg-gray-50 py-10 px-6 flex flex-col lg:flex-row items-start gap-6">
      {/* Main Q&A Section */}
      <div className="w-full lg:w-2/3">
        <h1 className="text-2xl font-semibold text-gray-900">{formData.role}</h1>
        <p className="text-gray-500 mb-4">{formData.topics}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm">Experience: {formData.experience} Years</span>
          <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm">{qaList.length} Q&amp;A</span>
          <span className="bg-black text-white px-4 py-1.5 rounded-full text-sm">Last Updated: {updateDate?updateDate:"30 Oct 2025"}</span>
        </div>

        <h2 className="text-lg font-semibold mb-4">Interview Q &amp; A</h2>

        <div className="space-y-4">
          {qaList.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left px-5 py-4 font-medium text-gray-900 hover:bg-gray-50"
              >
                <span>Q. {item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-100 bg-white text-gray-700 text-sm leading-relaxed">
                  {typeof item.theoreticalAnswer === "string" ? <p>{item.theoreticalAnswer}</p> : item.theoreticalAnswer}
                  <button
                    onClick={(e)=>handleShowCode(e,index)}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    <Code2 className="w-4 h-4" />
                    {showCodeIndex?"Hide Coding Example":"Coding Example"} 
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div onClick={handleLoadMore} className="px-4 py-2 bg-black text-white shadow hover:shadow-2xl cursor-pointer text-center">Load More</div>
      </div>

      {/* Side Panel */}
      {showCodeIndex && (
        <div className="fixed lg:static top-0 right-0 h-full lg:h-auto w-full lg:w-2/3 bg-white border-l border-gray-200 shadow-xl lg:shadow-none overflow-y-auto z-50 p-6 animate-slideIn">
          <div className="flex justify-between items-center mb-4">
            {/* <h2 className="text-lg font-semibold">title</h2> */}
            <button
              // onClick={() => setSideContent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X onClick={()=>(setShowCodeIndex(false))} className="w-5 h-5" />
            </button>
          </div>
          <div className="text-gray-700 text-sm leading-relaxed">
      
      <AutoCodeBlock code={qaList[currIndex].codingExample}/>
          </div>
        </div>
      )}
    
    </div>
  );
}
