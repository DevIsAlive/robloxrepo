"use client"

import { motion } from "framer-motion"
import { Info } from "lucide-react"

interface DisclaimerButtonProps {
  onClick: () => void
}

export default function DisclaimerButton({ onClick }: DisclaimerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-4 right-4 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-blue-800/50 text-blue-200 text-xs font-semibold hover:bg-blue-700/60 transition-colors duration-200" // Changed styling
    >
      <Info className="w-4 h-4" />
      Disclaimer
    </motion.button>
  )
}
