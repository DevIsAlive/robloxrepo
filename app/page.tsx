"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Page Components
import SpinToWinPage from "@/components/spin-to-win-page"
import UsernamePage from "@/components/username-page"
import QuizPage from "@/components/quiz-page"
import LootBoxGamePage from "@/components/loot-box-game-page"
import GiftCardClaimPage from "@/components/gift-card-claim-page"
import LiveWinnersTicker from "@/components/live-winners-ticker"
import DisclaimerButton from "@/components/disclaimer-button" // New import
import DisclaimerModal from "@/components/disclaimer-modal" // New import

export default function Component() {
  const [currentPage, setCurrentPage] = useState(1)
  const [prizeAmount, setPrizeAmount] = useState(10000)
  const [username, setUsername] = useState("")
  const [quizScore, setQuizScore] = useState(0)
  const [isDisclaimerModalOpen, setIsDisclaimerModalOpen] = useState(false) // New state for modal

  // Disable back button during experience
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      e.preventDefault()
      window.history.pushState(null, "", window.location.href)
    }

    window.history.pushState(null, "", window.location.href)
    window.addEventListener("popstate", handlePopState)

    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, 5))
  }

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 },
  }

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentPage === 1 && (
          <motion.div
            key="page1"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SpinToWinPage onNext={nextPage} prizeAmount={prizeAmount} setPrizeAmount={setPrizeAmount} />
          </motion.div>
        )}

        {currentPage === 2 && (
          <motion.div
            key="page2"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <UsernamePage onNext={nextPage} prizeAmount={prizeAmount} username={username} setUsername={setUsername} />
          </motion.div>
        )}

        {currentPage === 3 && (
          <motion.div
            key="page3"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <QuizPage onNext={nextPage} setQuizScore={setQuizScore} />
          </motion.div>
        )}

        {currentPage === 4 && (
          <motion.div
            key="page4"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LootBoxGamePage onNext={nextPage} prizeAmount={prizeAmount} username={username} />
          </motion.div>
        )}

        {currentPage === 5 && (
          <motion.div
            key="page5"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <GiftCardClaimPage prizeAmount={prizeAmount} username={username} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Winners Ticker */}
      <LiveWinnersTicker />

      {/* Disclaimer Button */}
      <DisclaimerButton onClick={() => setIsDisclaimerModalOpen(true)} />

      {/* Disclaimer Modal */}
      <DisclaimerModal isOpen={isDisclaimerModalOpen} onClose={() => setIsDisclaimerModalOpen(false)} />
    </div>
  )
}
