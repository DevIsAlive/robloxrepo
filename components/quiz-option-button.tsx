"use client"

import { motion } from "framer-motion"
import { ChevronRight, Sparkles } from "lucide-react"

interface QuizOptionButtonProps {
  option: { text: string; emoji: string }
  index: number
  selectedAnswer: number | null
  onSelect: (index: number) => void
}

export default function QuizOptionButton({ option, index, selectedAnswer, onSelect }: QuizOptionButtonProps) {
  const isSelected = selectedAnswer === index
  const isDisabled = selectedAnswer !== null

  return (
    <motion.button
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      className={`w-full trust-card py-5 px-4 transition-all duration-300 relative overflow-hidden ${
        isSelected ? "bg-blue-100 border-blue-700 shadow-xl" : "hover:bg-blue-50" // Added shadow-xl for selected state
      } ${isDisabled && !isSelected ? "opacity-50" : ""}`}
      whileHover={{
        scale: isDisabled ? 1 : 1.03,
        boxShadow: isDisabled ? undefined : "0 8px 25px rgba(59,130,246,0.3)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, scale: isSelected ? 1.02 : 1 }} // Added scale animation on select
      transition={{ delay: index * 0.1, duration: isSelected ? 0.2 : 0.3 }} // Faster transition for selected
    >
      {/* Sparkle and Confetti effects when selected */}
      {isSelected && (
        <>
          {/* Expanding circle effect */}
          <motion.div
            className="absolute inset-0 bg-blue-200 rounded-2xl"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Sparkles */}
          {[...Array(8)].map(
            (
              _,
              i, // Reduced number of sparkles
            ) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${25 + Math.random() * 50}%`, // More contained spread
                  top: `${25 + Math.random() * 50}%`,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  rotate: 360,
                  x: [0, (Math.random() - 0.5) * 80], // Reduced spread
                  y: [0, (Math.random() - 0.5) * 80], // Reduced spread
                }}
                transition={{
                  duration: 0.5, // Faster sparkle animation
                  delay: i * 0.04, // Faster delay between sparkles
                  ease: "easeOut",
                }}
              >
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            ),
          )}

          {/* Confetti burst */}
          {[...Array(15)].map(
            (
              _,
              i, // Reduced number of confetti
            ) => (
              <motion.div
                key={`confetti-${i}`}
                className="absolute w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][
                    Math.floor(Math.random() * 5)
                  ],
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 180, // Reduced spread
                  y: (Math.random() - 0.5) * 180, // Reduced spread
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 0.6, // Faster confetti animation
                  delay: i * 0.02, // Faster delay between confetti
                  ease: "easeOut",
                }}
              />
            ),
          )}
        </>
      )}

      <div className="flex items-center gap-3 relative z-10">
        <motion.span
          className="text-4xl"
          animate={
            isSelected
              ? {
                  scale: [1, 1.5, 1.2],
                  rotate: [0, 360, 0],
                }
              : selectedAnswer === null
                ? { rotate: [0, 5, -5, 0] }
                : {}
          }
          transition={{
            duration: isSelected ? 0.8 : 2,
            repeat: isSelected ? 0 : Number.POSITIVE_INFINITY,
            delay: isSelected ? 0 : index * 0.3,
          }}
        >
          {option.emoji}
        </motion.span>
        <span className="text-blue-600 font-bold text-xl flex-1 text-left">{option.text}</span>
        {isSelected && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          >
            <ChevronRight className="w-8 h-8 text-blue-600" />
          </motion.div>
        )}
      </div>
    </motion.button>
  )
}
