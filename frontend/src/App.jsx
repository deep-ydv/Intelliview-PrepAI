import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import InterviewJourneyModal from './components/cards/InterviewJourneyModal'
import InterviewProvider from './context/InterviewContext'
import GeminiResponse from './pages/Other/GeminiResponse'
import LandingPage from './pages/InterviewPrep/LandingPage'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Home/Dashboard'
import UserProvider from './context/userContext'
import AllQA from './components/cards/AllQA'
import LearningCard from './components/cards/LearningCard'
import NotFound from './pages/Other/NotFound'

const App = () => {
  
  return (
    
     <InterviewProvider>
      <UserProvider>
        
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/gemini' element={<GeminiResponse/>}/>
          <Route path='/allqa' element={<AllQA/>}/>
          <Route path='learningcard/:id' element={<LearningCard/>}/>
          <Route path='*' element={<NotFound/>}/>

        </Routes>
    
        </UserProvider>
     </InterviewProvider>
  
 
  )
}

export default App