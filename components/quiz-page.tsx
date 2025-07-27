"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProgressBar from "./progress-bar"
import QuizOptionButton from "./quiz-option-button" // New import

interface QuizPageProps {
  onNext: () => void
  setQuizScore: (score: number) => void
}

const questions = [
  {
    question: "Favorite Games? 🎮", // Simplified copy
    options: [
      { text: "Bloxfruits", emoji: "⚔️" },
      { text: "Adopt Me", emoji: "🐾" },
      { text: "Grow a Garden", emoji: "🌱" },
      { text: "Rivals", emoji: "🥊" },
    ],
  },
  {
    question: "How Often Play? ⏰", // Simplified copy
    options: [
      { text: "Every Day", emoji: "📅" },
      { text: "Sometimes", emoji: "📆" },
      { text: "Not Much", emoji: "🗓️" },
      { text: "A Lot!", emoji: "🎯" },
    ],
  },
  {
    question: "Top Item? 💎", // Simplified copy
    options: [
      { text: "Robux", emoji: "💰" },
      { text: "Gamepass", emoji: "🎟️" },
      { text: "Giftcard", emoji: "🎁" },
      { text: "Clothing", emoji: "👕" },
    ],
  },
]

export default function QuizPage({ onNext, setQuizScore }: QuizPageProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setScore((prev) => prev + 1)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setQuizScore(score + 1)
        setShowCelebration(true)

        setTimeout(() => {
          onNext()
        }, 2000) // Faster celebration and next page transition
      }
    }, 800) // Faster interaction response
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <ProgressBar currentStep={3} totalSteps={5} />
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        <AnimatePresence mode="wait">
          {!showCelebration ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="w-full"
            >
              {/* Question */}
              <motion.div
                className="trust-card p-6 mb-8 animate-pulse-glow text-center"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <h2 className="text-2xl font-bold text-blue-600">{questions[currentQuestion].question}</h2>
              </motion.div>

              {/* Answer Options */}
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <QuizOptionButton
                    key={index}
                    option={option}
                    index={index}
                    selectedAnswer={selectedAnswer}
                    onSelect={handleAnswer}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="text-center w-full"
            >
              <motion.div
                className="trust-card p-8"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <h1 className="text-3xl font-bold text-blue-600">Quiz Done! 🎉</h1>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
