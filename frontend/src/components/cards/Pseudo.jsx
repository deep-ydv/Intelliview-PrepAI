import React from 'react'
import { useContext } from 'react'
import { InterviewContext } from '../../context/InterviewContext'
import GeminiResponse from '../../pages/Other/GeminiResponse';

const Pseudo = () => {
  const {responseLoading}=useContext(InterviewContext);
  return (
    <div className='hidden'>
      {responseLoading && <GeminiResponse/>}
    </div>
  )
}

export default Pseudo