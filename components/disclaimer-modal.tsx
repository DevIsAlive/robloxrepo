"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface DisclaimerModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DisclaimerModal({ isOpen, onClose }: DisclaimerModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]" // Higher z-index
          onClick={onClose} // Close when clicking outside
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-lg p-8 max-w-md mx-4 relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close disclaimer"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Legal Disclaimer</h2>
            <div className="text-gray-700 text-sm space-y-4">
              <p>
                This application is provided strictly for entertainment and amusement purposes only. It offers a
                simulated interactive experience, and as such, no real-world prizes, monetary value, or tangible rewards
                are conferred or implied. All elements, including but not limited to virtual items, simulated rewards,
                and game outcomes, are entirely fictional and possess no real-world value or redeemability.
              </p>
              <p>
                The creators and operators of this application do not endorse, sponsor, or have any affiliation with any
                third-party entities, brands, products, or individuals that may be depicted or referenced within this
                simulated environment. Any resemblance to real-world entities is purely coincidental and does not imply
                any actual partnership, endorsement, or official connection.
              </p>
              <p>
                Participation in this application is voluntary and solely for recreational enjoyment. This application
                is not a gambling platform, nor does it facilitate any form of real-money gaming, wagering, or financial
                transactions. Users acknowledge and agree that their engagement is for entertainment purposes only and
                that no real-world gains or losses are associated with their use of this application.
              </p>
              <p>
                By proceeding with the use of this application, you explicitly acknowledge and agree to these terms,
                understanding that this is a simulated experience designed exclusively for entertainment.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
