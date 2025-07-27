"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import ProgressBar from "./progress-bar"

interface SpinToWinPageProps {
  onNext: () => void
  prizeAmount: number
  setPrizeAmount: (amount: number) => void
}

const prizes = [
  { amount: 500, color: "#1E40AF", label: "500" },
  { amount: 1000, color: "#2563EB", label: "1000" },
  { amount: 750, color: "#3B82F6", label: "750" },
  { amount: 1500, color: "#1D4ED8", label: "1500" },
  { amount: 250, color: "#1E3A8A", label: "250" },
  { amount: 2000, color: "#312E81", label: "2000" },
  { amount: 100, color: "#3730A3", label: "100" },
  { amount: 5000, color: "#1E40AF", label: "5000" },
]

export default function SpinToWinPage({ onNext, prizeAmount, setPrizeAmount }: SpinToWinPageProps) {
  const [hasSpun, setHasSpun] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [teaseRotation, setTeaseRotation] = useState(0)
  const [showSpinResult, setShowSpinResult] = useState(false)
  const [canClaimResult, setCanClaimResult] = useState(false)

  // Tease animation on load
  useEffect(() => {
    const teaseInterval = setInterval(() => {
      setTeaseRotation((prev) => (prev === 5 ? -5 : 5))
    }, 1200)

    return () => clearInterval(teaseInterval)
  }, [])

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setCanClaimResult(false)

    const targetPrizeIndex = prizes.findIndex((p) => p.amount === 1000)
    const segmentAngle = 360 / prizes.length
    const targetAngle = targetPrizeIndex * segmentAngle + segmentAngle / 2
    const spins = 5
    const finalRotation = spins * 360 + (360 - targetAngle)

    setRotation(finalRotation)
    setPrizeAmount(10000)

    setTimeout(() => {
      setIsSpinning(false)
      setHasSpun(true)
      setShowSpinResult(true)
      setTimeout(() => {
        setCanClaimResult(true)
      }, 500)
    }, 5000)
  }

  const handleClaim = () => {
    onNext()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-start pt-12 p-4 relative overflow-hidden">
      {" "}
      {/* Changed justify-center to justify-start and added pt-12 */}
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          >
            <Star className="text-white opacity-30" size={Math.random() * 12 + 6} />
          </motion.div>
        ))}
      </div>
      <ProgressBar currentStep={1} totalSteps={5} />
      <div className="flex flex-col items-center flex-1 z-10 w-full max-w-sm mt-8">
        {" "}
        {/* Added mt-8 to shift content up */}
        <AnimatePresence mode="wait">
          {!showSpinResult ? (
            <motion.div
              key="spin-wheel-section"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full flex flex-col items-center"
            >
              <motion.div className="relative w-72 h-72 mb-8" transition={{ duration: 0.8, ease: "easeInOut" }}>
                {/* Wheel */}
                <motion.div
                  className="w-full h-full rounded-full border-6 border-white shadow-2xl relative overflow-hidden bg-white"
                  animate={{ rotate: rotation + teaseRotation }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                >
                  {prizes.map((prize, index) => {
                    const angle = (360 / prizes.length) * index
                    const nextAngle = (360 / prizes.length) * index + 360 / prizes.length
                    return (
                      <div
                        key={index}
                        className="absolute w-full h-full flex items-center justify-center"
                        style={{
                          transform: `rotate(${angle}deg)`,
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((nextAngle - angle) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((nextAngle - angle) * Math.PI) / 180)}%)`,
                          backgroundColor: prize.color,
                        }}
                      >
                        <div className="transform -rotate-90 text-center">
                          <div className="text-white font-bold text-lg drop-shadow-lg">{prize.label}</div>
                          <div className="text-white text-sm font-bold drop-shadow-lg">R$</div>
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              </motion.div>
              {/* Spin Button */}
              <motion.button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`trust-button ${
                  hasSpun
                    ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-800"
                    : "bg-white hover:bg-gray-50 text-blue-600 border-blue-600"
                } ${isSpinning ? "opacity-50 cursor-not-allowed" : ""}`}
                whileHover={{ scale: isSpinning ? 1 : 1.05 }}
                whileTap={{ scale: isSpinning ? 1 : 0.95 }}
                animate={
                  hasSpun
                    ? {
                        boxShadow: [
                          "0 10px 25px rgba(0,0,0,0.2)",
                          "0 15px 35px rgba(59,130,246,0.4)",
                          "0 10px 25px rgba(0,0,0,0.2)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: hasSpun ? Number.POSITIVE_INFINITY : 0 }}
              >
                {isSpinning ? (
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
                    SPINNING... ✨
                  </motion.span>
                ) : hasSpun ? (
                  "10,000 R$"
                ) : (
                  "SPIN TO WIN! 🚀"
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="spin-result-section"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 150 }}
              className="w-full flex flex-col items-center justify-center flex-1"
            >
              <motion.div
                className="trust-card p-8 bg-green-500 border-green-700 text-white text-center"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                <h1 className="text-3xl font-bold mb-4 text-blue-600">YOU WON {prizeAmount} R$! 🎉</h1>
                <motion.button
                  onClick={handleClaim}
                  disabled={!canClaimResult}
                  className={`trust-button bg-white text-green-600 border-green-600 hover:bg-gray-100 ${
                    !canClaimResult ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  whileHover={{ scale: canClaimResult ? 1.05 : 1 }}
                  whileTap={{ scale: canClaimResult ? 1 : 0.95 }}
                  animate={
                    !canClaimResult
                      ? {}
                      : {
                          boxShadow: [
                            "0 4px 15px rgba(255,255,255,0.3)",
                            "0 8px 25px rgba(255,255,255,0.5)",
                            "0 4px 15px rgba(255,255,255,0.3)",
                          ],
                        }
                  }
                  transition={{ duration: 1.5, repeat: !canClaimResult ? 0 : Number.POSITIVE_INFINITY }}
                >
                  CLAIM PRIZE! 🚀
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
