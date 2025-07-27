"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users } from "lucide-react"

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

const baseUsernames = [
  "gamerciara2012",
  "SomberCannonDab",
  "Speedy117892",
  "lovelygirls2226",
  "Alley_Kitten",
  "BaddieforeverCD",
  "ilovemybestfriend328",
  "malihamello",
  "Alley1291",
  "roseyrosesnowball",
  "fortnit",
  "sophhlovesyou",
  "SoccerWacky1",
  "dogydoodoo20",
  "Iigxht",
  "Beefjakenev",
  "broo11108",
  "Warrior22151",
  "Mushy4440",
  "marsh100115",
  "Foltynisthe_best53",
  "FORTNITE954A1",
  "Sonic41029",
  "Hakouna13",
  "Nickjroreo",
  "CrunchyPiggle",
  "Ohioxd69o21",
  "Ghoorun_31",
  "KonradK2018",
  "111eetry",
  "Yfhddhhddhhxjxxjnxnc",
  "Tama",
  "princessareamazing12",
  "ZlataCat20003",
  "stonksmeow203",
  "bunnyrosescot12333",
  "Lowkeyxox",
  "CookieSwirl_SB",
  "girl321849",
  "LOL_6594",
  "Avaflava1218",
  "Emihua12345",
  "Katie125221",
  "Cherry2cherry_lady23",
  "Helena0nPc",
  "Pastapunk1238",
  "Jayuso4488",
  "Ayeshahaider5",
  "Charlie_farly12",
  "MrSmarty92",
  "Girlsv05",
  "Soy_vane50",
  "planes_201625",
  "lilmochi_2113",
]

// Generate fake winners with random prize amounts
const fakeWinners = baseUsernames.map((username) => {
  const randomPrize = prizes[Math.floor(Math.random() * prizes.length)].amount
  return `${username} won ${randomPrize} R$! 🎉`
})

export default function LiveWinnersTicker() {
  const [currentWinner, setCurrentWinner] = useState(0)

  // Winners ticker logic
  useEffect(() => {
    // Ensure fakeWinners has elements before starting the interval
    if (fakeWinners.length === 0) {
      console.warn("fakeWinners array is empty, ticker will not update.")
      return
    }

    const interval = setInterval(() => {
      setCurrentWinner((prev) => (prev + 1) % fakeWinners.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [fakeWinners.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-0 right-0 mx-auto z-50 trust-card p-4 px-6 max-w-md"
    >
      <div className="flex items-center justify-center gap-4 text-blue-600">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
          <Users className="w-7 h-7" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentWinner}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }} // Added transition for smooth text change
            className="text-xl font-bold flex-1 text-center"
          >
            {fakeWinners[currentWinner]}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
