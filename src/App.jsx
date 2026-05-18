import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Home,
  Wrench,
  Car,
  User,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Phone,
  MapPin
} from 'lucide-react'

const services = [
  {
    id: 1,
    title: 'Замена масла',
    duration: '1 час',
    estimate: '$120',
    description: 'Полная замена масла и масляного фильтра',
    category: 'ТО'
  },

  {
    id: 2,
    title: 'Диагностика двигателя',
    duration: '2 часа',
    estimate: '$250',
    description: 'Компьютерная диагностика и проверка двигателя',
    category: 'Диагностика'
  },

  {
    id: 3,
    title: 'Тормозная система',
    duration: '3 часа',
    estimate: '$340',
    description: 'Замена тормозных колодок и обслуживание системы',
    category: 'Ремонт'
  },

  {
    id: 4,
    title: 'Ремонт подвески',
    duration: '5 часов',
    estimate: '$680',
    description: 'Проверка и ремонт подвески автомобиля',
    category: 'Ремонт'
  }
]

const myCars = [
  {
    id: 1,
    brand: 'BMW',
    model: 'M5 F90',
    plate: '01A777AA',
    mileage: '58 000 км',
    nextService: 'Замена масла через 1200 км'
  },

  {
    id: 2,
    brand: 'Mercedes',
    model: 'AMG GT',
    plate: '10B505BB',
    mileage: '32 000 км',
    nextService: 'Скоро обслуживание тормозов'
  }
]

export default function App() {

  const [activeTab, setActiveTab] = useState('home')

  const [selectedService, setSelectedService] = useState(null)

  const [bookingStep, setBookingStep] = useState(1)

  const [selectedCar, setSelectedCar] = useState('BMW M5 F90')

  const [selectedTime, setSelectedTime] = useState('12:00')

  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const [profileModal, setProfileModal] = useState(null)

  const [repairApproved, setRepairApproved] = useState(false)

  const [emergencyModal, setEmergencyModal] = useState(false)

  const [toast, setToast] = useState('')

  const showToast = (text) => {

    setToast(text)

    setTimeout(() => {
      setToast('')
    }, 2500)
  }

  return (

    <div className="bg-black min-h-screen text-white flex justify-center">

      <div className="w-full max-w-[430px] min-h-screen bg-[#0A0A0A] pb-28 relative overflow-hidden">

        <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-red-500/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-[-100px] right-[-100px] w-[250px] h-[250px] bg-orange-500/10 blur-[120px] rounded-full"></div>

        <div className="p-5 relative z-10">

          {
            activeTab === 'home' && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >

                <div className="mb-8">

                  <p className="text-zinc-500 text-sm">
                    Премиум Автосервис
                  </p>

                  <h1 className="text-3xl font-bold mt-2">
                    Arendocar Service
                  </h1>

                </div>

                <div className="bg-[#181818] border border-zinc-800 rounded-[30px] p-5 mb-6">

                  <div className="flex items-center gap-3">

                    <Clock className="text-orange-400" />

                    <div>

                      <p className="text-zinc-500 text-sm">
                        Активный ремонт
                      </p>

                      <h2 className="text-xl font-semibold mt-1">
                        Диагностика BMW M5
                      </h2>

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="flex items-center justify-between mb-2">

                      <p className="text-sm">
                        Прогресс ремонта
                      </p>

                      <p className="text-sm text-zinc-500">
                        70%
                      </p>

                    </div>

                    <div className="w-full bg-zinc-800 rounded-full h-2">

                      <div className="bg-white h-2 rounded-full w-[70%]"></div>

                    </div>

                  </div>

                </div>

                <button
                  onClick={() => setEmergencyModal(true)}
                  className="w-full bg-red-500 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 mb-8"
                >

                  <AlertTriangle size={20} />

                  Экстренная помощь

                </button>

                <div className="space-y-5">

                  {
                    services.map((service) => (

                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        key={service.id}
                        className="bg-[#181818] border border-zinc-800 rounded-[30px] p-5"
                      >

                        <div className="flex items-start justify-between">

                          <div>

                            <p className="text-zinc-500 text-sm">
                              {service.category}
                            </p>

                            <h2 className="text-2xl font-bold mt-2">
                              {service.title}
                            </h2>

                          </div>

                          <div className="text-right">

                            <p className="font-semibold">
                              {service.estimate}
                            </p>

                            <p className="text-zinc-500 text-sm mt-1">
                              {service.duration}
                            </p>

                          </div>

                        </div>

                        <p className="text-zinc-400 mt-5">
                          {service.description}
                        </p>

                        <button
                          onClick={() => {
                            setSelectedService(service)
                            setBookingStep(1)
                          }}
                          className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-6"
                        >
                          Записаться
                        </button>

                      </motion.div>

                    ))
                  }

                </div>

              </motion.div>

            )
          }

          {
            activeTab === 'repair' && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >

                <h1 className="text-3xl font-bold mb-8">
                  Статус ремонта
                </h1>

                <div className="space-y-5">

                  <div className="bg-[#181818] rounded-[30px] p-5 border border-zinc-800">

                    <div className="flex items-center gap-3">

                      <CheckCircle2 className="text-green-500" />

                      <p>Автомобиль принят</p>

                    </div>

                  </div>

                  <div className="bg-[#181818] rounded-[30px] p-5 border border-zinc-800">

                    <div className="flex items-center gap-3">

                      <CheckCircle2 className="text-green-500" />

                      <p>Диагностика завершена</p>

                    </div>

                  </div>

                  <div className="bg-[#181818] rounded-[30px] p-5 border border-orange-500">

                    <h2 className="text-xl font-bold">
                      Требуется подтверждение
                    </h2>

                    <p className="text-zinc-400 mt-3">
                      Обнаружена проблема в передней подвеске.
                    </p>

                    <p className="text-2xl font-bold mt-5">
                      $420
                    </p>

                    {
                      !repairApproved ? (

                        <div className="flex gap-3 mt-6">

                          <button
                            onClick={() => {
                              setRepairApproved(true)
                              showToast('Ремонт подтвержден')
                            }}
                            className="flex-1 bg-white text-black py-3 rounded-2xl font-semibold"
                          >
                            Подтвердить
                          </button>

                          <button
                            onClick={() => showToast('Запрос отклонен')}
                            className="flex-1 bg-zinc-800 py-3 rounded-2xl font-semibold"
                          >
                            Отклонить
                          </button>

                        </div>

                      ) : (

                        <div className="bg-green-500/20 border border-green-500 rounded-2xl p-4 mt-6">

                          Ремонт успешно подтвержден

                        </div>

                      )
                    }

                  </div>

                </div>

              </motion.div>

            )
          }

          {
            activeTab === 'cars' && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >

                <div className="flex items-center justify-between mb-8">

                  <h1 className="text-3xl font-bold">
                    Мои автомобили
                  </h1>

                  <button
                    onClick={() => showToast('Новый автомобиль добавлен')}
                    className="bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold"
                  >
                    Добавить
                  </button>

                </div>

                <div className="space-y-5">

                  {
                    myCars.map((car) => (

                      <div
                        key={car.id}
                        className="bg-[#181818] rounded-[30px] p-5 border border-zinc-800"
                      >

                        <div className="flex items-center justify-between">

                          <div>

                            <h2 className="text-2xl font-bold">
                              {car.brand} {car.model}
                            </h2>

                            <p className="text-zinc-500 mt-2">
                              {car.plate}
                            </p>

                          </div>

                          <Car size={28} />

                        </div>

                        <div className="mt-6 space-y-2">

                          <p className="text-zinc-400">
                            Пробег: {car.mileage}
                          </p>

                          <p className="text-orange-400">
                            {car.nextService}
                          </p>

                        </div>

                      </div>

                    ))
                  }

                </div>

              </motion.div>

            )
          }

          {
            activeTab === 'profile' && (

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >

                <div className="flex flex-col items-center pt-5">

                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-red-500 to-orange-500 mb-5"></div>

                  <h1 className="text-3xl font-bold">
                    Ibrohim
                  </h1>

                  <p className="text-zinc-500 mt-2">
                    Premium Service Member
                  </p>

                </div>

                <div className="space-y-4 mt-10">

                  <button
                    onClick={() => setProfileModal('history')}
                    className="w-full bg-[#181818] border border-zinc-800 rounded-2xl p-5 text-left"
                  >
                    История обслуживания
                  </button>

                  <button
                    onClick={() => setProfileModal('notifications')}
                    className="w-full bg-[#181818] border border-zinc-800 rounded-2xl p-5 text-left"
                  >
                    Напоминания
                  </button>

                  <button
                    onClick={() => setProfileModal('payments')}
                    className="w-full bg-[#181818] border border-zinc-800 rounded-2xl p-5 text-left"
                  >
                    Способы оплаты
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
              <span className="text-xs mt-1">Главная</span>
            </button>

            <button
              onClick={() => setActiveTab('repair')}
              className={`flex flex-col items-center ${
                activeTab === 'repair'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <Wrench size={22} />
              <span className="text-xs mt-1">Ремонт</span>
            </button>

            <button
              onClick={() => setActiveTab('cars')}
              className={`flex flex-col items-center ${
                activeTab === 'cars'
                  ? 'text-white'
                  : 'text-zinc-500'
              }`}
            >
              <Car size={22} />
              <span className="text-xs mt-1">Авто</span>
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
              <span className="text-xs mt-1">Профиль</span>
            </button>

          </div>

        </div>

      </div>

      <AnimatePresence>

        {
          selectedService && (

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
                className="bg-[#111111] rounded-t-[40px] p-5 w-full max-w-[430px] mx-auto"
              >

                <h2 className="text-3xl font-bold">
                  {selectedService.title}
                </h2>

                <p className="text-zinc-400 mt-4">
                  Оформление записи
                </p>

                <div className="space-y-4 mt-8">

                  <div className={`rounded-2xl p-4 border ${
                    bookingStep >= 1
                      ? 'border-white'
                      : 'border-zinc-800'
                  }`}>
                    Выбор услуги
                  </div>

                  <div className={`rounded-2xl p-4 border ${
                    bookingStep >= 2
                      ? 'border-white'
                      : 'border-zinc-800'
                  }`}>

                    <p className="mb-3">
                      Выберите автомобиль
                    </p>

                    <select
                      value={selectedCar}
                      onChange={(e) => setSelectedCar(e.target.value)}
                      className="w-full bg-black border border-zinc-700 rounded-xl p-3"
                    >
                      <option>BMW M5 F90</option>
                      <option>Mercedes AMG GT</option>
                    </select>

                  </div>

                  <div className={`rounded-2xl p-4 border ${
                    bookingStep >= 3
                      ? 'border-white'
                      : 'border-zinc-800'
                  }`}>

                    <p className="mb-3">
                      Выберите время
                    </p>

                    <div className="flex gap-3">

                      {
                        ['10:00', '12:00', '15:00'].map((time) => (

                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-4 py-2 rounded-xl ${
                              selectedTime === time
                                ? 'bg-white text-black'
                                : 'bg-zinc-800'
                            }`}
                          >
                            {time}
                          </button>

                        ))
                      }

                    </div>

                  </div>

                  <div className={`rounded-2xl p-4 border ${
                    bookingStep >= 4
                      ? 'border-white'
                      : 'border-zinc-800'
                  }`}>

                    Подтверждение записи

                  </div>

                </div>

                {
                  bookingStep < 4 ? (

                    <button
                      onClick={() => setBookingStep(bookingStep + 1)}
                      className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-8"
                    >
                      Продолжить
                    </button>

                  ) : (

                    <button
                      onClick={() => {
                        setBookingConfirmed(true)
                        setSelectedService(null)
                        setActiveTab('repair')
                        showToast('Запись успешно создана')
                      }}
                      className="w-full bg-green-500 text-white py-4 rounded-2xl font-semibold mt-8"
                    >
                      Подтвердить запись
                    </button>

                  )
                }

                <button
                  onClick={() => setSelectedService(null)}
                  className="w-full mt-4 text-zinc-500"
                >
                  Закрыть
                </button>

              </motion.div>

            </motion.div>

          )
        }

      </AnimatePresence>

      <AnimatePresence>

        {
          emergencyModal && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-5"
            >

              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-zinc-800 rounded-[30px] p-6 w-full max-w-[380px]"
              >

                <h2 className="text-2xl font-bold mb-6">
                  Экстренная помощь
                </h2>

                <div className="space-y-4">

                  <button
                    onClick={() => showToast('Эвакуатор вызван')}
                    className="w-full bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-3"
                  >
                    <Phone />
                    Вызвать эвакуатор
                  </button>

                  <button
                    onClick={() => showToast('Механик уже едет')}
                    className="w-full bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-3"
                  >
                    <Wrench />
                    Вызвать механика
                  </button>

                  <button
                    onClick={() => showToast('Геолокация отправлена')}
                    className="w-full bg-[#1A1A1A] p-4 rounded-2xl flex items-center gap-3"
                  >
                    <MapPin />
                    Отправить геолокацию
                  </button>

                </div>

                <button
                  onClick={() => setEmergencyModal(false)}
                  className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-8"
                >
                  Закрыть
                </button>

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
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="bg-[#111111] border border-zinc-800 rounded-[30px] p-6 w-full max-w-[380px]"
              >

                {
                  profileModal === 'history' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        История обслуживания
                      </h2>

                      <div className="space-y-4">

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          BMW M5 • Замена масла • Апрель 2026
                        </div>

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          Mercedes AMG • Диагностика • Март 2026
                        </div>

                      </div>
                    </>

                  )
                }

                {
                  profileModal === 'notifications' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        Напоминания
                      </h2>

                      <div className="space-y-4">

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          Замена масла через 1200 км
                        </div>

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          Рекомендуется диагностика тормозов
                        </div>

                      </div>
                    </>

                  )
                }

                {
                  profileModal === 'payments' && (

                    <>
                      <h2 className="text-2xl font-bold mb-6">
                        Способы оплаты
                      </h2>

                      <div className="space-y-4">

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          Visa •••• 2048
                        </div>

                        <div className="bg-[#1A1A1A] rounded-2xl p-4">
                          Apple Pay
                        </div>

                      </div>
                    </>

                  )
                }

                <button
                  onClick={() => setProfileModal(null)}
                  className="w-full bg-white text-black py-4 rounded-2xl font-semibold mt-8"
                >
                  Закрыть
                </button>

              </motion.div>

            </motion.div>

          )
        }

      </AnimatePresence>

      <AnimatePresence>

        {
          toast && (

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-white text-black px-6 py-3 rounded-2xl font-semibold z-[100]"
            >

              {toast}

            </motion.div>

          )
        }

      </AnimatePresence>

    </div>
  )
}