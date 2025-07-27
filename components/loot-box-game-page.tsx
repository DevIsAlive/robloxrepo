"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Box, HandIcon as HandClick, Gift } from "lucide-react" // Import Gift icon
import ProgressBar from "./progress-bar"

interface LootBoxGamePageProps {
  onNext: () => void
  prizeAmount: number
  username: string
}

export default function LootBoxGamePage({ onNext, prizeAmount, username }: LootBoxGamePageProps) {
  const [selectedBox, setSelectedBox] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleBoxClick = (index: number) => {
    if (isAnimating || selectedBox !== null) return

    setIsAnimating(true)
    setSelectedBox(index)

    setTimeout(() => {
      setIsAnimating(false)
      onNext() // Transition to the next page after reveal
    }, 1500) // Duration for the gift card reveal animation
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <ProgressBar currentStep={4} totalSteps={5} />
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-md">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-center w-full">
          {/* Enhanced Title Card */}
          <motion.div
            className="trust-card p-6 mb-8"
            animate={{ scale: [1, 1.01, 1] }} // Subtle pulse animation
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1], // Slightly more pronounced scale for icon
              }}
              transition={{
                rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY },
                scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              <Box className="w-20 h-20 text-blue-500 mx-auto mb-3" /> {/* Even Larger icon */}
            </motion.div>
            <h2 className="text-4xl font-black text-blue-700 mb-2 drop-shadow-lg">PICK YOUR PRIZE! 👇</h2>{" "}
            {/* Larger, bolder text with shadow */}
            <p className="text-blue-600 font-bold text-xl drop-shadow-sm">Choose a Box! ✨</p>{" "}
            {/* Larger text with shadow */}
          </motion.div>

          {/* Redesigned Prize Boxes */}
          <div className="flex justify-center gap-4 mb-8">
            {[0, 1, 2].map((i) => (
              <motion.button
                key={i}
                onClick={() => handleBoxClick(i)}
                disabled={isAnimating || selectedBox !== null}
                className={`
                  flex flex-col items-center justify-center w-40 h-40 p-4 transition-all duration-300 relative overflow-hidden
                  rounded-2xl border-6 // Thicker border
                  cursor-pointer // Explicitly show pointer
                  ${
                    selectedBox === i
                      ? "bg-gradient-to-br from-yellow-300 to-yellow-500 border-yellow-600 legendary-glow shadow-2xl" // Selected style with stronger shadow
                      : "bg-gradient-to-br from-blue-500 to-blue-700 border-blue-800 shadow-xl" // Default style with richer blue and shadow
                  }
                  ${selectedBox !== null && selectedBox !== i ? "opacity-50 grayscale" : ""} // Dim and desaturate unselected
                `}
                whileHover={{
                  scale: selectedBox === null ? 1.08 : 1, // More pronounced hover scale
                  boxShadow: selectedBox === null ? "0 15px 30px rgba(0,0,0,0.4)" : undefined, // Stronger hover shadow
                  y: selectedBox === null ? -10 : 0, // Lift on hover
                }}
                whileTap={{ scale: selectedBox === null ? 0.92 : 1 }} // More pronounced tap scale
                initial={{ opacity: 0, scale: 0.8, y: 20 }} // Initial slight lift
                animate={{
                  opacity: 1,
                  scale: selectedBox === i ? 1.15 : 1, // Scale up selected box even more
                  y: selectedBox === null ? [0, -5, 0] : 0, // Gentle floating animation when unselected
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  delay: i * 0.1,
                  y: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }, // Apply float animation
                }}
              >
                <motion.div
                  key={selectedBox === i ? "revealed-content" : "closed-content"}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center"
                >
                  {selectedBox === i ? (
                    <>
                      <motion.div
                        className="w-24 h-24 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }} // Flashing and pulsing
                        transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <Gift className="w-full h-full text-yellow-400 drop-shadow-lg" />{" "}
                        {/* Gift icon, flashing yellow */}
                      </motion.div>
                    </>
                  ) : (
                    <>
                      <Box className="w-20 h-20 text-white" /> {/* Larger icon, white for contrast */}
                      <p className="text-white font-black text-4xl mt-2 drop-shadow-md">?</p>{" "}
                      {/* Larger question mark, white for contrast */}
                      <motion.div
                        className="absolute bottom-2 right-2 text-white opacity-70"
                        animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                      >
                        <HandClick className="w-8 h-8" /> {/* "Click Me" icon */}
                      </motion.div>
                    </>
                  )}
                </motion.div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
