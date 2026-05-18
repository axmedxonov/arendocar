import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Home,
  Search,
  Calendar,
  User
} from 'lucide-react'

import ferrari from './assets/ferrari.PNG'
import lambo from './assets/lambo.PNG'
import bmw from './assets/bmw.PNG'
import mercedes from './assets/mercedes.PNG'
import rolls from './assets/rolls.PNG'
import mclaren from './assets/mclaren.PNG'
import bugatti from './assets/bugatti.PNG'

const popularCars = [
  {
    name: 'Ferrari SF90',
    price: '$1200/day',
    image: ferrari
  },
  {
    name: 'Lamborghini Revuelto',
    price: '$1500/day',
    image: lambo
  },
  {
    name: 'BMW M4 Competition',
    price: '$650/day',
    image: bmw
  }
]

const luxuryCars = [
  {
    name: 'Mercedes AMG GT',
    price: '$900/day',
    image: mercedes
  },
  {
    name: 'Rolls Royce Spectre',
    price: '$1800/day',
    image: rolls
  },
  {
    name: 'McLaren 720S',
    price: '$1400/day',
    image: mclaren
  },
  {
    name: 'Bugatti Chiron',
    price: '$3500/day',
    image: bugatti
  }
]

const allCars = [
  ...popularCars,
  ...luxuryCars
]

function CarSection({ title, cars, setSelectedCar }) {
  return (
    <div className="mb-8">

      <div className="flex items-center justify-between mb-4">

        <h2 className="text-xl font-semibold">
          {title}
        </h2>

        <button className="text-zinc-500 text-sm">
          See all
        </button>

      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">

        {cars.map((car, index) => (

          <motion.div
            whileTap={{ scale: 0.96 }}
            whileHover={{ scale: 1.02 }}
            key={index}
            onClick={() => setSelectedCar(car)}
            className="min-w-[170px] bg-[#181818] rounded-[28px] overflow-hidden border border-zinc-800 cursor-pointer"
          >

            <img
              src={car.image}
              alt=""
              className="w-full h-[190px] object-cover"
            />

            <div className="p-4">

              <h3 className="font-medium text-[15px]">
                {car.name}
              </h3>

              <p className="text-zinc-500 text-sm mt-1">
                {car.price}
              </p>

              <button className="mt-4 w-full bg-white text-black py-2 rounded-xl text-sm font-medium">
                Rent
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </div>
  )
}

export default function App() {

  const [selectedCar, setSelectedCar] = useState(null)
  const [activeTab, setActiveTab] = useState('home')
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const [profileModal, setProfileModal] = useState(null)

  const filteredCars = allCars.filter((car) => {

    const matchesSearch =
      car.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeCategory === 'All') {
      return matchesSearch
    }

    if (activeCategory === 'Sport') {
      return matchesSearch &&
        (
          car.name.includes('Ferrari') ||
          car.name.includes('Lamborghini') ||
          car.name.includes('McLaren') ||
          car.name.includes('Bugatti')
        )
    }

    if (activeCategory === 'Luxury') {
      return matchesSearch &&
        (
          car.name.includes('Rolls') ||
          car.name.includes('Mercedes')
        )
    }

    if (activeCategory === 'German') {
      return matchesSearch &&
        (
          car.name.includes('BMW') ||
          car.name.includes('Mercedes')
        )
    }

    return matchesSearch

  })

  return (

    <div className="bg-black min-h-screen text-white flex justify-center">

      <div className="w-full max-w-[430px] min-h-screen bg-[#0A0A0A] pb-28 relative overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-red-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="p-5 relative z-10">

          {
            activeTab === 'home' && (

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
              >

                <div className="mb-7">

                  <p className="text-zinc-500 text-sm mb-2">
                    Premium Rental
                  </p>

                  <h1 className="text-3xl font-bold tracking-tight">
                    Arendocar
                  </h1>

                </div>

                <div className="mb-7">

                  <div className="bg-[#181818] border border-zinc-800 rounded-2xl px-4 py-4 flex items-center gap-3">

                    <Search size={18} className="text-zinc-500" />

                    <input
                      type="text"
                      placeholder="Search premium cars..."
                      className="bg-transparent outline-none text-sm w-full"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />

                  </div>

                </div>

                <div className="flex gap-3 overflow-x-auto mb-8">

                  <button
                    onClick={() => setActiveCategory('All')}
                    className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                      activeCategory === 'All'
                        ? 'bg-white text-black'
                        : 'bg-[#181818] text-white'
                    }`}
                  >
                    All
                  </button>

                  <button
                    onClick={() => setActiveCategory('Sport')}
                    className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                      activeCategory === 'Sport'
                        ? 'bg-white text-black'
                        : 'bg-[#181818] text-white'
                    }`}
                  >
                    Sport
                  </button>

                  <button
                    onClick={() => setActiveCategory('Luxury')}
                    className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                      activeCategory === 'Luxury'
                        ? 'bg-white text-black'
                        : 'bg-[#181818] text-white'
                    }`}
                  >
                    Luxury
                  </button>

                  <button
                    onClick={() => setActiveCategory('German')}
                    className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
                      activeCategory === 'German'
                        ? 'bg-white text-black'
                        : 'bg-[#181818] text-white'
                    }`}
                  >
                    German
                  </button>

                </div>

                <CarSection
                  title="Available Cars"
                  cars={filteredCars}
                  setSelectedCar={setSelectedCar}
                />

              </motion.div>

            )
          }

          {
            activeTab === 'search' && (

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-10"
              >

                <h1 className="text-3xl font-bold mb-6">
                  Search
                </h1>

                <div className="bg-[#181818] border border-zinc-800 rounded-2xl px-4 py-4 flex items-center gap-3">

                  <Search size={18} className="text-zinc-500" />

                  <input
                    type="text"
                    placeholder="Search Ferrari, BMW..."
                    className="bg-transparent outline-none text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                </div>

                <div className="mt-8">

                  <CarSection
                    title="Search Results"
                    cars={filteredCars}
                    setSelectedCar={setSelectedCar}
                  />

                </div>

              </motion.div>

            )
          }

          {
            activeTab === 'booking' && (

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-10"
              >

                <h1 className="text-3xl font-bold mb-6">
                  My Bookings
                </h1>

                {
                  bookingConfirmed ? (

                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#181818] rounded-[30px] p-6 border border-zinc-800"
                    >

                      <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-4xl mx-auto">
                        ✓
                      </div>

                      <h2 className="text-2xl font-bold text-center mt-6">
                        Booking Confirmed
                      </h2>

                      <p className="text-zinc-500 text-center mt-3">
                        Your premium vehicle has been successfully reserved.
                      </p>

                    </motion.div>

                  ) : (

                    <div className="bg-[#181818] rounded-[30px] p-5 border border-zinc-800">

                      <img
                        src={ferrari}
                        alt=""
                        className="w-full h-[220px] object-cover rounded-[24px]"
                      />

                      <h2 className="text-2xl font-semibold mt-5">
                        Ferrari SF90
                      </h2>

                      <p className="text-zinc-500 mt-2">
                        No active bookings yet
                      </p>

                    </div>

                  )
                }

              </motion.div>

            )
          }

          {
            activeTab === 'profile' && (

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-10"
              >

                <div className="flex flex-col items-center">

                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-orange-500 mb-5"></div>

                  <h1 className="text-3xl font-bold">
                    Ibrohim
                  </h1>

                  <p className="text-zinc-500 mt-2">
                    Premium Member
                  </p>

                </div>

                <div className="mt-10 space-y-4">

                  <button
                    onClick={() => setProfileModal('payment')}
                    className="bg-[#181818] p-5 rounded-2xl border border-zinc-800 w-full text-left"
                  >
                    Payment Methods
                  </button>

                  <button
                    onClick={() => setProfileModal('history')}
                    className="bg-[#181818] p-5 rounded-2xl border border-zinc-800 w-full text-left"
                  >
                    Rental History
                  </button>

                  <button
                    onClick={() => setProfileModal('settings')}
                    className="bg-[#181818] p-5 rounded-2xl border border-zinc-800 w-full text-left"
                  >
                    Settings
                  </button>

                </div>

              </motion.div>

            )
          }

        </div>

        <div className="fixed bottom-0 left-0 right-0 flex justify-center z-40">

          <div className="w-full max-w-[430px] bg-[#111111]/95 backdrop-blur-xl border-t border-zinc-800 flex justify-around py-4">

            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center ${
                activeTab === 'home'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <Home size={22} />
              <span className="text-xs mt-1">Home</span>
            </button>

            <button
              onClick={() => setActiveTab('search')}
              className={`flex flex-col items-center ${
                activeTab === 'search'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <Search size={22} />
              <span className="text-xs mt-1">Search</span>
            </button>

            <button
              onClick={() => setActiveTab('booking')}
              className={`flex flex-col items-center ${
                activeTab === 'booking'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <Calendar size={22} />
              <span className="text-xs mt-1">Booking</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex flex-col items-center ${
                activeTab === 'profile'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <User size={22} />
              <span className="text-xs mt-1">Profile</span>
            </button>

          </div>

        </div>

      </div>

      <AnimatePresence>

        {
          selectedCar && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-end"
            >

              <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                exit={{ y: 500 }}
                transition={{ type: 'spring', damping: 18 }}
                className="bg-[#111111] rounded-t-[40px] p-5 w-full max-w-[430px] mx-auto"
              >

                <img
                  src={selectedCar.image}
                  alt=""
                  className="w-full h-[320px] object-cover rounded-[30px]"
                />

                <div className="mt-5">

                  <h2 className="text-3xl font-bold">
                    {selectedCar.name}
                  </h2>

                  <p className="text-zinc-400 mt-2">
                    {selectedCar.price}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-6">

                    <div className="bg-[#1A1A1A] rounded-2xl p-4">
                      <p className="text-zinc-500 text-sm">Power</p>
                      <h3 className="mt-2 font-semibold">800 HP</h3>
                    </div>

                    <div className="bg-[#1A1A1A] rounded-2xl p-4">
                      <p className="text-zinc-500 text-sm">Speed</p>
                      <h3 className="mt-2 font-semibold">340 km/h</h3>
                    </div>

                    <div className="bg-[#1A1A1A] rounded-2xl p-4">
                      <p className="text-zinc-500 text-sm">0-100</p>
                      <h3 className="mt-2 font-semibold">2.8s</h3>
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      setSelectedCar(null)
                      setBookingConfirmed(true)
                      setActiveTab('booking')
                    }}
                    className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-8"
                  >
                    Book Now
                  </button>

                  <button
                    onClick={() => setSelectedCar(null)}
                    className="w-full mt-3 text-zinc-500"
                  >
                    Close
                  </button>

                </div>

              </motion.div>

            </motion.div>

          )
        }

      </AnimatePresence>

      <AnimatePresence>

        {
          profileModal && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5"
            >

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111111] border border-zinc-800 rounded-[32px] p-6 w-full max-w-[380px]"
              >

                {
                  profileModal === 'payment' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        Payment Methods
                      </h2>

                      <div className="space-y-4">

                        <div className="bg-[#1A1A1A] p-4 rounded-2xl">
                          Visa •••• 2048
                        </div>

                        <div className="bg-[#1A1A1A] p-4 rounded-2xl">
                          Apple Pay
                        </div>

                      </div>
                    </>

                  )
                }

                {
                  profileModal === 'history' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        Rental History
                      </h2>

                      <div className="bg-[#1A1A1A] p-4 rounded-2xl">

                        <h3 className="font-semibold">
                          Ferrari SF90
                        </h3>

                        <p className="text-zinc-500 mt-2 text-sm">
                          Completed rental • April 2026
                        </p>

                      </div>
                    </>

                  )
                }

                {
                  profileModal === 'settings' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        Settings
                      </h2>

                      <div className="space-y-4">

                        <div className="bg-[#1A1A1A] p-4 rounded-2xl">
                          Dark Mode Enabled
                        </div>

                        <div className="bg-[#1A1A1A] p-4 rounded-2xl">
                          Push Notifications Active
                        </div>

                      </div>
                    </>

                  )
                }

                <button
                  onClick={() => setProfileModal(null)}
                  className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-8"
                >
                  Close
                </button>

              </motion.div>

            </motion.div>

          )
        }

      </AnimatePresence>

    </div>
  )
}