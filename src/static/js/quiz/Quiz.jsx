import React, { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Clock, RotateCcw, Check, X } from "lucide-react"

export default function Component({ quizUuid }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizData, setQuizData] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [quizUuid])

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`/get-quiz-questions/${quizUuid}/`)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      console.log(data);
       
      setQuizData(data.questions)
      setSelectedAnswers(new Array(data.questions.length).fill(""))
      setLoading(false)
    } catch (error) {
      console.error('Error fetching questions:', error)
      setError('Failed to load quiz questions. Please try again later.')
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer)
          setQuizCompleted(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setQuizCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswerSelect = (answer) => {
    const newSelectedAnswers = [...selectedAnswers]
    console.log('selected answer for: '+ currentQuestion + " is \n" + answer);
    
    newSelectedAnswers[currentQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers)
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswers(new Array(quizData.length).fill(""))
    setTimeLeft(300)
    setQuizCompleted(false)
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  }

  if (quizCompleted) {
    return (
      <div className="min-h-[calc(100vh-50px)] flex items-center justify-center p-4">
        <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold">Quiz Results</h2>
            <div className="space-y-6">
              {quizData.map((question, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold">{question.question}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">Your answer:</span>
                    <span className={selectedAnswers[index] === question.answer ? "text-success" : "text-error"}>
                      {selectedAnswers[index]}
                    </span>
                    {selectedAnswers[index] === question.answer ? (
                      <Check className="w-5 h-5 text-success" />
                    ) : (
                      <X className="w-5 h-5 text-error" />
                    )}
                  </div>
                  {selectedAnswers[index] !== question.answer && (
                    <div className="text-success">
                      <span className="font-medium">Correct answer:</span> {question.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="card-actions justify-end mt-6">
              <button onClick={restartQuiz} className="btn btn-primary w-full">
                <RotateCcw className="mr-2 h-4 w-4" /> Restart Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center">
            <h2 className="card-title text-2xl font-bold">Mock Exam</h2>
            <div className="flex items-center space-x-2 text-base-content/70">
              <Clock className="h-4 w-4" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>
          <div className="space-y-6 mt-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                Question {currentQuestion + 1} of {quizData.length}
              </h3>
              <p className="text-lg">{quizData[currentQuestion].question}</p>
            </div>
            <div className="space-y-3">
              {quizData[currentQuestion].options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-2 p-4 border rounded-lg cursor-pointer transition-colors hover:bg-base-200 hover:text-black ${
                    selectedAnswers[currentQuestion] === option ? "bg-primary text-primary-content" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={option}
                    checked={selectedAnswers[currentQuestion] === option}
                    onChange={() => handleAnswerSelect(option)}
                    className="radio radio-primary"
                  />
                  <span className="flex-grow">{option}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="card-actions justify-between mt-6">
            <button
              className="btn btn-outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </button>
            <button
              className="btn btn-primary"
              onClick={handleNext}
            >
              {currentQuestion === quizData.length - 1 ? "Finish" : "Next"} <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-2xl fixed bottom-0 left-1/2 -translate-x-1/2 p-4 ">
        <progress
          className="progress progress-primary w-full"
          value={currentQuestion + 1}
          max={quizData.length}
        ></progress>
      </div>
    </div>
  )
}