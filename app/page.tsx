"use client"

import React, { useState, useEffect, useMemo } from "react"
// State cho modal carousel ảnh
// (phải để trong function component, không để ngoài cùng file)

import { Heart, Sparkles, Gift, Camera, X, Volume2, VolumeX } from "lucide-react"

export default function SweetLoveApp() {
  // Swipe state for full screen photo
  const touchStart = React.useRef<number | null>(null)
  const touchEnd = React.useRef<number | null>(null)

  // State cho modal carousel ảnh
  const [showPhotoCarousel, setShowPhotoCarousel] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)
  // State cho chế độ xem ảnh full screen trên mobile
  const [fullPhoto, setFullPhoto] = useState(false)
  // Lấy danh sách ảnh từ biến môi trường (dạng chuỗi, phân tách bởi dấu phẩy)
  const photoList = useMemo(() => {
    const envList = process.env.NEXT_PUBLIC_PHOTO_LIST || ''
    return envList.split(',').map(url => url.trim()).filter(Boolean)
  }, [])
  // State để bật/tắt nhạc nền (dừng hẳn audio)
  const [musicOff, setMusicOff] = useState(false)
  // State kiểm tra audio đã từng phát chưa
  const [musicPlayed, setMusicPlayed] = useState(false)
  const [music2Played, setMusic2Played] = useState(false)
  const [music3Played, setMusic3Played] = useState(false)
  // Ref cho audio
  const giftAudioRef = React.useRef<HTMLAudioElement>(null)
  const giftAudioRef2 = React.useRef<HTMLAudioElement>(null)
  const giftAudioRef3 = React.useRef<HTMLAudioElement>(null)

  const giftAudioSrc = process.env.NEXT_PUBLIC_GIFT_AUDIO_SRC || "/gift-music.mp3"
  const giftAudioSrc2 = process.env.NEXT_PUBLIC_GIFT_AUDIO_SRC_2 || "/gift-music.mp3"
  const giftAudioSrc3 = process.env.NEXT_PUBLIC_GIFT_AUDIO_SRC_3 || "/gift-music.mp3"
  // Love letter content from .env
  const letterTitle = process.env.NEXT_PUBLIC_LETTER_TITLE || "💌 Thư Tình Gửi Bé Iu 💌"
  const letterGreeting = process.env.NEXT_PUBLIC_LETTER_GREETING || "Bé iu yêu dấu của anh,"
  const letterPara1 = process.env.NEXT_PUBLIC_LETTER_PARA1 || "Mỗi ngày trôi qua, anh lại yêu bé nhiều hơn một chút. Bé là ánh sáng trong cuộc đời anh, là lý do khiến anh mỉm cười mỗi sáng thức dậy. 🌅"
  const letterPara2 = process.env.NEXT_PUBLIC_LETTER_PARA2 || "Cảm ơn bé vì đã luôn ở bên anh, vì đã cho anh cảm giác được yêu thương và trân trọng. Bé là món quà quý giá nhất mà cuộc đời trao tặng cho anh. 🎁"
  const letterPara3 = process.env.NEXT_PUBLIC_LETTER_PARA3 || "Anh hứa sẽ luôn yêu thương, che chở và làm bé hạnh phúc. Dù có khó khăn gì, anh cũng sẽ luôn ở bên bé. 💪"
  const letterLove = process.env.NEXT_PUBLIC_LETTER_LOVE || "Anh yêu bé vô cùng! 💕"
  const letterSign = process.env.NEXT_PUBLIC_LETTER_SIGN || "Forever yours, ❤️️"
  const [showMessage, setShowMessage] = useState(false)
  const [showHeader, setShowHeader] = useState(false)
  const [showDivider, setShowDivider] = useState(false)
  const [showMessage1, setShowMessage1] = useState(false)
  const [showMessage2, setShowMessage2] = useState(false)
  const [showMessage3, setShowMessage3] = useState(false)
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([])
  const [fallingRoses, setFallingRoses] = useState<
    Array<{ id: number; x: number; delay: number; duration: number; size: string }>
  >([])

  const [giftOpened, setGiftOpened] = useState(false)
  const [giftShaking, setGiftShaking] = useState(false)
  const [showGiftContent, setShowGiftContent] = useState(false)
  const [giftConfetti, setGiftConfetti] = useState<
    Array<{ id: number; x: number; y: number; delay: number; rotation: number; distance: number }>
  >([])
  const [giftHearts, setGiftHearts] = useState<
    Array<{ id: number; x: number; y: number; delay: number; rotation: number; distance: number }>
  >([])

  // Love Letter states
  const [letterOpened, setLetterOpened] = useState(false)
  const [letterShaking, setLetterShaking] = useState(false)
  const [showLetterContent, setShowLetterContent] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [letterHearts, setLetterHearts] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])

  // Get values from environment variables
  const headerDelay = Number.parseInt(process.env.NEXT_PUBLIC_HEADER_DELAY || "2500")
  const dividerDelay = Number.parseInt(process.env.NEXT_PUBLIC_DIVIDER_DELAY || "3500")
  const messageEnableDelay = Number.parseInt(process.env.NEXT_PUBLIC_MESSAGE_ENABLE_DELAY || "4200")
  const message1Delay = Number.parseInt(process.env.NEXT_PUBLIC_MESSAGE1_DELAY || "4800")
  const message2Delay = Number.parseInt(process.env.NEXT_PUBLIC_MESSAGE2_DELAY || "6200")
  const message3Delay = Number.parseInt(process.env.NEXT_PUBLIC_MESSAGE3_DELAY || "7800")

  const mainTitle = process.env.NEXT_PUBLIC_MAIN_TITLE || "Gửi bé iu yêu dấu"
  const sweetBadge = process.env.NEXT_PUBLIC_SWEET_BADGE || "Sweet Love"
  const message1Text =
    process.env.NEXT_PUBLIC_MESSAGE1 ||
    "Hôm nay là ngày của những người phụ nữ tuyệt vời nhất thế giới, và bé iu là người phụ nữ tuyệt vời nhất trong trái tim anh! 💕"
  const message2Text =
    process.env.NEXT_PUBLIC_MESSAGE2 ||
    "Cảm ơn bé vì đã luôn là nguồn động lực, là ánh sáng trong cuộc sống của anh. Bé xứng đáng có tất cả những điều tốt đẹp nhất! ✨"
  const mainLoveMessage = process.env.NEXT_PUBLIC_MAIN_LOVE_MESSAGE || "Anh yêu bé nhiều lắm!"
  const foreverText = process.env.NEXT_PUBLIC_FOREVER_TEXT || "Forever & Always 💖"

  const fallingRosesCount = Number.parseInt(process.env.NEXT_PUBLIC_FALLING_ROSES_COUNT || "8")
  const floatingPetalsCount = Number.parseInt(process.env.NEXT_PUBLIC_FLOATING_PETALS_COUNT || "12")
  const sparklesCount = Number.parseInt(process.env.NEXT_PUBLIC_SPARKLES_COUNT || "20")
  const roseGenerationInterval = Number.parseInt(process.env.NEXT_PUBLIC_ROSE_GENERATION_INTERVAL || "4000")

  // Helper: seeded random for SSR-safe deterministic sparkle positions
  function seededRandom(seed: number) {
    let x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  // Generate sparkle positions deterministically for SSR
  const sparklePositions = useMemo(() => {
    return Array.from({ length: sparklesCount }, (_, i) => {
      // Use a fixed seed for SSR hydration match
      const left = seededRandom(i + 1) * 100
      const top = seededRandom(i + 100) * 100
      const delay = seededRandom(i + 200) * 3
      return { left, top, delay }
    })
  }, [sparklesCount])

  // Falling hearts: rơi liên tục như hoa hồng, lặp lại trong 1 phút rồi dừng
  // Tự động giảm số lượng trái tim nếu là mobile
  function isMobile() {
    if (typeof window === 'undefined') return false
    return window.innerWidth <= 768
  }
  const getFallingHeartsCount = () => {
    const base = Number.parseInt(process.env.NEXT_PUBLIC_FALLING_HEARTS_COUNT || "28")
    if (typeof window !== 'undefined' && isMobile()) {
      return Math.max(4, base - 6) // Giảm xuống còn tối thiểu 4 trái tim trên mobile
    }
    return base
  }
  const [fallingHeartsCount, setFallingHeartsCount] = useState(getFallingHeartsCount())
  // Cập nhật lại khi resize
  useEffect(() => {
    const handleResize = () => setFallingHeartsCount(getFallingHeartsCount())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  const [fallingHearts, setFallingHearts] = useState<Array<{ id: number; left: number; delay: number; duration: number }>>([])
  const [showFallingHearts, setShowFallingHearts] = useState(true)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    let timeout: NodeJS.Timeout | null = null
    let heartId = 0
    const generateHearts = () => {
      setFallingHearts(prev => [
        ...prev,
        ...Array.from({ length: fallingHeartsCount }, (_, i) => ({
          id: Date.now() + heartId++,
          left: 5 + Math.random() * 90,
          delay: Math.random() * 2,
          duration: 3 + Math.random() * 2,
        }))
      ])
    }
    generateHearts()
    // Giảm thời gian giữa các đợt để hiệu ứng dày hơn
    interval = setInterval(generateHearts, 2200)
    timeout = setTimeout(() => {
      setShowFallingHearts(false)
      if (interval) clearInterval(interval)
    }, process.env.NEXT_PUBLIC_FALLING_HEARTS_DURATION ? Number.parseInt(process.env.NEXT_PUBLIC_FALLING_HEARTS_DURATION) : 60000)
    return () => {
      if (interval) clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [fallingHeartsCount])

  // Xóa các trái tim đã rơi xong để tránh tràn bộ nhớ
  useEffect(() => {
    if (!showFallingHearts) return
    const cleanup = setInterval(() => {
      setFallingHearts(prev => prev.filter(h => {
        // Nếu đã qua thời gian rơi + delay thì xóa
        const elapsed = (Date.now() - h.id) / 1000
        return elapsed < (h.delay + h.duration + 0.5)
      }))
    }, 2000)
    return () => clearInterval(cleanup)
  }, [showFallingHearts])

  useEffect(() => {
    // Staggered animation sequence with slower timing
    const timer1 = setTimeout(() => setShowHeader(true), headerDelay)
    const timer2 = setTimeout(() => setShowDivider(true), dividerDelay)
    const timer3 = setTimeout(() => setShowMessage(true), messageEnableDelay)
    const timer4 = setTimeout(() => setShowMessage1(true), message1Delay)
    const timer5 = setTimeout(() => setShowMessage2(true), message2Delay)
    const timer6 = setTimeout(() => setShowMessage3(true), message3Delay)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(timer6)
    }
  }, [headerDelay, dividerDelay, messageEnableDelay, message1Delay, message2Delay, message3Delay])

  // Generate falling roses continuously
  useEffect(() => {
    const generateRoses = () => {
      const newRoses = Array.from({ length: fallingRosesCount }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: Math.random() > 0.5 ? "text-2xl" : "text-xl",
      }))
      setFallingRoses(newRoses)
    }

    generateRoses()
    const interval = setInterval(generateRoses, roseGenerationInterval)
    return () => clearInterval(interval)
  }, [fallingRosesCount, roseGenerationInterval])

  const openGift = () => {
    if (giftOpened) return
    //Stop and reset letter audio if playing
    if (giftAudioRef2.current) {
      giftAudioRef2.current.pause()
      giftAudioRef2.current.currentTime = 0
    }
    if (giftAudioRef3.current) {
      giftAudioRef3.current.pause()
      giftAudioRef3.current.currentTime = 0
    }
    // Play gift audio
    if (giftAudioRef.current) {
      giftAudioRef.current.currentTime = 0
      giftAudioRef.current.play().then(() => {
        setMusicPlayed(true)
      }).catch(() => {})
    }
    // Start shaking animation
    setGiftShaking(true)

    // After shake, open the gift
    setTimeout(() => {
      setGiftShaking(false)
      setGiftOpened(true)

      // Create massive confetti burst - toàn màn hình
      const confetti = Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * 360
        const distance = 150 + Math.random() * 200
        return {
          id: Date.now() + i,
          x: Math.cos((angle * Math.PI) / 180) * distance,
          y: Math.sin((angle * Math.PI) / 180) * distance,
          delay: Math.random() * 0.8,
          rotation: Math.random() * 360,
          distance: distance,
        }
      })
      setGiftConfetti(confetti)

      // Create massive hearts burst - toàn màn hình
      const hearts = Array.from({ length: 30 }, (_, i) => {
        const angle = (i / 30) * 360 + 15 // Offset 15 degrees from sparkles
        const distance = 120 + Math.random() * 250
        return {
          id: Date.now() + i + 1000, // Different ID range
          x: Math.cos((angle * Math.PI) / 180) * distance,
          y: Math.sin((angle * Math.PI) / 180) * distance,
          delay: Math.random() * 1.2 + 0.3, // Slightly different timing
          rotation: Math.random() * 360,
          distance: distance,
        }
      })
      setGiftHearts(hearts)

      // Show gift content
      setTimeout(() => {
        setShowGiftContent(true)
      }, 800)

      // Reset after animation
      setTimeout(() => {
        setGiftOpened(false)
        setShowGiftContent(false)
        setGiftConfetti([])
        setGiftHearts([])
      }, 6000)

    }, 800)

    setTimeout(() => {
      // reset gift audio
      if (giftAudioRef.current) {
        giftAudioRef.current.pause()
        giftAudioRef.current.currentTime = 0
      }
    }, 83000) // Delay to allow gift animation to finish
  }

  const openLetter = () => {
    if (letterOpened) return

    // Stop and reset gift audio if playing
    if (giftAudioRef.current) {
      giftAudioRef.current.pause()
      giftAudioRef.current.currentTime = 0
    }
    if (giftAudioRef3.current) {
      giftAudioRef3.current.pause()
      giftAudioRef3.current.currentTime = 0
    }
    // Play letter audio
    if (giftAudioRef2.current) {
      giftAudioRef2.current.currentTime = 0
      giftAudioRef2.current.play().then(() => {
        setMusic2Played(true)
      }).catch(() => {})
    }

    // Start shaking animation
    setLetterShaking(true)

    // After shake, open the letter
    setTimeout(() => {
      setLetterShaking(false)
      setLetterOpened(true)
      setShowLetter(true)

      // Create floating hearts
      const hearts = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }))
      setLetterHearts(hearts)

      // Show letter content
      setTimeout(() => {
        setShowLetterContent(true)
      }, 1500)

      // Reset after animation
      //setTimeout(() => {
      //  setLetterOpened(false)
      //  setShowLetter(false)
      //  setShowLetterContent(false)
      //  setLetterHearts([])
      //}, 8000)
    }, 800)
  }

  const closeLetter = () => {
    setLetterOpened(false)
    setShowLetter(false)
    setShowLetterContent(false)
    setLetterHearts([])
    // stop audio giftAudioRef2.current?.pause()
    giftAudioRef2.current?.pause()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 overflow-hidden relative">
      {/* Nút tắt/mở nhạc ở góc phải trên cùng */}
      {(musicPlayed || music2Played || music3Played) && (
        <button
          className="fixed top-4 left-4 z-[10001] bg-white/80 hover:bg-white rounded-full p-2 shadow-lg border border-pink-200 transition-colors"
          onClick={() => {
            setMusicOff((off) => {
              const newOff = !off
              if (newOff) {
                // Nếu chuyển sang tắt nhạc, dừng và reset tất cả audio
                if (giftAudioRef.current) {
                  giftAudioRef.current.pause()
                  giftAudioRef.current.currentTime = 0
                }
                if (giftAudioRef2.current) {
                  giftAudioRef2.current.pause()
                  giftAudioRef2.current.currentTime = 0
                }
                if (giftAudioRef3.current) {
                  giftAudioRef3.current.pause()
                  giftAudioRef3.current.currentTime = 0
                }
              }
              // Không tự động phát lại audio khi bật lại
              return newOff
            })
          }}
          aria-label={musicOff ? "Bật nhạc" : "Tắt nhạc"}
        >
          {musicOff ? (
            <VolumeX className="w-6 h-6 text-rose-400" />
          ) : (
            <Volume2 className="w-6 h-6 text-rose-400" />
          )}
        </button>
      )}
      {/* Floating Hearts Background */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-bounce-up pointer-events-none"
          style={{ left: heart.x, top: heart.y }}
        >
          <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-pulse" />
        </div>
      ))}

      {/* Sparkles Animation - deterministic for hydration */}
      <div className="absolute inset-0 pointer-events-none">
        {sparklePositions.map((pos, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${pos.left}%`,
              top: `${pos.top}%`,
              animationDelay: `${pos.delay}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </div>
        ))}
      </div>

      {/* Falling Hearts Animation - deterministic for hydration */}
      {showFallingHearts && (
        <div className="absolute inset-0 pointer-events-none">
          {fallingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute animate-falling-heart"
              style={{
                left: `${heart.left}%`,
                top: `-40px`,
                animationDelay: `${heart.delay}s`,
                animationDuration: `${heart.duration}s`,
              }}
            >
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 opacity-80" />
            </div>
          ))}
        </div>
      )}

      {/* Falling Roses Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {fallingRoses.map((rose) => (
          <div
            key={rose.id}
            className="absolute animate-fall-rose"
            style={{
              left: `${rose.x}%`,
              top: "-50px",
              animationDelay: `${rose.delay}s`,
              animationDuration: `${rose.duration}s`,
            }}
          >
            <div className={`${rose.size} text-rose-400 animate-spin-gentle`}>🌹</div>
          </div>
        ))}
      </div>

      {/* Audio for Gift */}
      <audio ref={giftAudioRef} src={giftAudioSrc} preload="auto" />
      {/* Audio for Letter */}
      <audio ref={giftAudioRef2} src={giftAudioSrc2} preload="auto" />
       {/* Audio for Camera */}
      <audio ref={giftAudioRef3} src={giftAudioSrc3} preload="auto" />
      {/* Love Letter Modal */}
      {showLetter && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex  items-center justify-center p-4 pt-8">
          <div className="relative max-w-2xl w-full">
            {/* Close button */}
            <button
              onClick={closeLetter}
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            {/* Envelope */}
            <div className="relative">
              <div className="bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg p-4 md:p-8 shadow-2xl animate-letter-glow">
                {/* Envelope flap */}
                <div
                  className={`absolute top-0 left-0 right-0 h-16 bg-gradient-to-br from-rose-300 to-pink-400 rounded-t-lg ${letterOpened ? "animate-envelope-open" : ""}`}
                  style={{ transformOrigin: "bottom" }}
                >
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                  </div>
                </div>

                {/* Letter content */}
                <div className={`md:mt-8 ${showLetterContent ? "animate-letter-unfold" : "opacity-0"}`}>
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-6 shadow-lg border border-pink-200">
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {letterTitle}
                      </h3>
                      <div className="flex justify-center gap-2 text-lg">
                        <span className="animate-heartbeat">💖</span>
                        <span className="animate-heartbeat" style={{ animationDelay: "0.3s" }}>🌹</span>
                        <span className="animate-heartbeat" style={{ animationDelay: "0.6s" }}>💖</span>
                      </div>
                    </div>
                    <div className="space-y-4 text-gray-700">
                      <p className="text-lg leading-relaxed text-sm sm:text-lg">
                        <span className="font-semibold text-rose-600">{letterGreeting}</span>
                      </p>
                      <p className="leading-relaxed text-sm sm:text-base">{letterPara1}</p>
                      <p className="leading-relaxed text-sm sm:text-base">{letterPara2}</p>
                      <p className="leading-relaxed text-sm sm:text-base">{letterPara3}</p>
                      <div className="text-center py-1 md:py-4">
                        <p className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                          {letterLove}
                        </p>
                        <p className="text-sm text-gray-600 mt-2">{letterSign}</p>
                      </div>
                      <div className="flex justify-center gap-3 text-2xl">
                        <span className="animate-bounce">💖</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>🌹</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>💕</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.6s" }}>✨</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.8s" }}>💖</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating hearts around letter */}
              {letterHearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute animate-hearts-float-up pointer-events-none"
                  style={{
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                    animationDelay: `${heart.delay}s`,
                  }}
                >
                  <div className="text-red-400 text-xl">💖</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 relative z-10 h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-6xl">
            {/* Top Icons Section */}
            <div className="flex justify-center items-center gap-8 md:gap-12 pt-4 pb-2 animate-fade-in">
              <div className="flex flex-col items-center group cursor-pointer" onClick={openGift}>
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br from-pink-200 to-rose-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 w-[55px] h-[55px] ${giftShaking ? "animate-gift-shake" : ""} ${giftOpened ? "animate-gift-explosion" : ""}`}
                  >
                    {!giftOpened ? (
                      <Gift className="w-8 h-8 text-pink-600" />
                    ) : (
                      <div className="relative">
                        {/* Gift lid */}
                        <div className="absolute inset-0 animate-gift-lid-open">
                          <div className="w-10 h-4 bg-pink-700 rounded-t-lg"></div>
                        </div>
                        {/* Gift content - Much bigger */}
                        {showGiftContent && (
                          <div className="animate-gift-content-reveal">
                            <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-heartbeat" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Massive confetti burst effect */}
                  {giftConfetti.map((confetti) => (
                    <div
                      key={confetti.id}
                      className="absolute animate-gift-mega-burst pointer-events-none"
                      style={
                        {
                          left: "50%",
                          top: "50%",
                          "--x": `${confetti.x}px`,
                          "--y": `${confetti.y}px`,
                          animationDelay: `${confetti.delay}s`,
                          transform: `rotate(${confetti.rotation}deg)`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="text-yellow-400 text-lg">✨</div>
                    </div>
                  ))}

                  {/* Massive hearts burst effect */}
                  {giftHearts.map((heart) => (
                    <div
                      key={heart.id}
                      className="absolute animate-gift-mega-burst pointer-events-none"
                      style={
                        {
                          left: "50%",
                          top: "50%",
                          "--x": `${heart.x}px`,
                          "--y": `${heart.y}px`,
                          animationDelay: `${heart.delay}s`,
                          transform: `rotate(${heart.rotation}deg)`,
                        } as React.CSSProperties
                      }
                    >
                      <div className="text-red-400 text-xl">💖</div>
                    </div>
                  ))}

                  {/* Additional sparkle rings */}
                  {giftOpened && (
                    <>
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`ring-${i}`}
                          className="absolute animate-gift-sparkle-burst pointer-events-none"
                          style={{
                            left: "50%",
                            top: "50%",
                            transform: `rotate(${i * 45}deg)`,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        >
                          <div className="text-pink-400 text-xl">💖</div>
                        </div>
                      ))}
                    </>
                  )}

                  {/* Original sparkle */}
                  <div className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-twinkle">✨</div>
                </div>
              </div>

              <div className="flex flex-col items-center group cursor-pointer" onClick={openLetter}>
                <div className="relative">
                  <div
                    className={`bg-gradient-to-br from-purple-200 to-pink-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 w-[55px] h-[55px] ${letterShaking ? "animate-envelope-shake" : ""}`}
                  >
                    <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-twinkle"
                    style={{ animationDelay: "0.5s" }}
                  >
                    ✨
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center group cursor-pointer"
                onClick={() => {
                  if (giftAudioRef.current) {
                    giftAudioRef.current.pause()
                    giftAudioRef.current.currentTime = 0
                  }
                  if (giftAudioRef2.current) {
                    giftAudioRef2.current.pause()
                    giftAudioRef2.current.currentTime = 0
                  }
                  if (giftAudioRef3.current) {
                    giftAudioRef3.current.currentTime = 0
                    giftAudioRef3.current.play().then(() => {
                      setMusic3Played(true);
                    }).catch(() => {});
                  }
                  setShowPhotoCarousel(true);
                }}
              >
                <div className="relative">
                  <div className="bg-gradient-to-br from-rose-200 to-red-300 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 w-[55px] h-[55px]">
                    <Camera className="w-8 h-8 text-rose-600 animate-pulse" />
                  </div>
                  <div
                    className="absolute -top-1 -right-1 text-yellow-400 text-xs animate-twinkle"
                    style={{ animationDelay: "1s" }}
                  >
                    ✨
                  </div>
                </div>
              </div>
      {/* Photo Carousel Modal */}
      {showPhotoCarousel && (
        <>
          {/* Overlay modal */}
          <div className="fixed inset-0 z-[10002] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 pt-8">
            <div className="relative max-w-2xl w-full">
              {/* Close button */}
              <button
                onClick={() => setShowPhotoCarousel(false)}
                className="absolute -top-4 -right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                aria-label="Đóng carousel"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className="bg-gradient-to-br from-pink-200 to-rose-300 rounded-lg p-4 md:p-8 shadow-2xl animate-letter-glow relative flex flex-col items-center">
                {/* Decorative hearts and sparkles */}
                <div className="w-full flex flex-col items-center">
                  <img
                    src={photoList[carouselIndex]}
                    alt={`Kỷ niệm ${carouselIndex + 1}`}
                    className="rounded-lg max-h-80 object-contain mb-4 border-4 border-white shadow-xl bg-white/80 cursor-zoom-in"
                    style={{ width: '100%', background: '#f3f3f3' }}
                    onClick={() => setFullPhoto(true)}
                  />
                  <div className="flex justify-between items-center w-full mt-2">
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 hover:from-rose-300 hover:to-pink-300 text-rose-600 font-bold shadow-lg border border-rose-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400/60 animate-heartbeat"
                      onClick={() => setCarouselIndex((i) => (i - 1 + photoList.length) % photoList.length)}
                      disabled={photoList.length <= 1}
                    >
                      <span className="text-lg">💖</span>
                    </button>
                    <span className="text-sm text-gray-600 font-semibold">
                      {carouselIndex + 1} / {photoList.length}
                    </span>
                    <button
                      className="flex items-center gap-1 px-4 py-2 rounded-full bg-gradient-to-r from-pink-200 via-rose-200 to-red-200 hover:from-rose-300 hover:to-pink-300 text-rose-600 font-bold shadow-lg border border-rose-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-400/60 animate-heartbeat"
                      onClick={() => setCarouselIndex((i) => (i + 1) % photoList.length)}
                      disabled={photoList.length <= 1}
                    >
                      <span className="text-lg">🌹</span>
                    </button>
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    <span className="animate-bounce text-xl">💖</span>
                    <span className="animate-bounce text-xl" style={{ animationDelay: '0.2s' }}>🌸</span>
                    <span className="animate-bounce text-xl" style={{ animationDelay: '0.4s' }}>💝</span>
                    <span className="animate-bounce text-xl" style={{ animationDelay: '0.6s' }}>🌹</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Full screen photo on mobile */}
          {fullPhoto && (
            <div
              className="fixed inset-0 z-[10003] bg-black flex items-center justify-center min-h-0 overflow-hidden"
              style={{ touchAction: 'none', padding: 0, margin: 0 }}
              onClick={() => setFullPhoto(false)}
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'ArrowLeft') {
                  setCarouselIndex(i => (i - 1 + photoList.length) % photoList.length)
                } else if (e.key === 'ArrowRight') {
                  setCarouselIndex(i => (i + 1) % photoList.length)
                } else if (e.key === 'Escape') {
                  setFullPhoto(false)
                }
              }}
              onTouchStart={e => {
                if (e.touches && e.touches.length === 1) {
                  touchStart.current = e.touches[0].clientX
                }
              }}
              onTouchMove={e => {
                if (e.touches && e.touches.length === 1) {
                  touchEnd.current = e.touches[0].clientX
                }
              }}
              onTouchEnd={() => {
                if (touchStart.current !== null && touchEnd.current !== null) {
                  const delta = touchEnd.current - touchStart.current
                  if (Math.abs(delta) > 40) {
                    if (delta > 0) {
                      setCarouselIndex(i => (i - 1 + photoList.length) % photoList.length)
                    } else {
                      setCarouselIndex(i => (i + 1) % photoList.length)
                    }
                  }
                }
                touchStart.current = null
                touchEnd.current = null
              }}
              autoFocus
            >
              <img
                src={photoList[carouselIndex]}
                alt={`Kỷ niệm ${carouselIndex + 1}`}
                className="object-contain cursor-zoom-out"
                style={{ maxWidth: '100vw', maxHeight: '100dvh', display: 'block', margin: 0, padding: 0 }}
              />
              <button
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
                onClick={e => { e.stopPropagation(); setFullPhoto(false) }}
                aria-label="Đóng ảnh lớn"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          )}
        </>
      )}
            </div>
            {/* Love Message Card - Rose Shape */}
            <div className="flex justify-center animate-scale-in">
              <div className="relative">
                {/* Rose Shape Container */}
                <div className="rose-container-large relative">
                  {/* Rose Shape Background */}
                  <div className="rose-shape-large relative">
                    {/* Outer petals */}
                    <div className="rose-petal-large rose-petal-1 bg-gradient-to-br from-pink-200 to-rose-300"></div>
                    <div className="rose-petal-large rose-petal-2 bg-gradient-to-br from-rose-200 to-pink-300"></div>
                    <div className="rose-petal-large rose-petal-3 bg-gradient-to-br from-pink-300 to-rose-400"></div>
                    <div className="rose-petal-large rose-petal-4 bg-gradient-to-br from-rose-300 to-pink-400"></div>
                    <div className="rose-petal-large rose-petal-5 bg-gradient-to-br from-pink-200 to-rose-300"></div>
                    <div className="rose-petal-large rose-petal-6 bg-gradient-to-br from-rose-200 to-pink-300"></div>

                    {/* Middle petals */}
                    <div className="rose-petal-mid-large rose-petal-mid-1 bg-gradient-to-br from-pink-300 to-rose-400"></div>
                    <div className="rose-petal-mid-large rose-petal-mid-2 bg-gradient-to-br from-rose-300 to-pink-400"></div>
                    <div className="rose-petal-mid-large rose-petal-mid-3 bg-gradient-to-br from-pink-400 to-rose-500"></div>
                    <div className="rose-petal-mid-large rose-petal-mid-4 bg-gradient-to-br from-rose-400 to-pink-500"></div>

                    {/* Inner petals */}
                    <div className="rose-petal-inner-large rose-petal-inner-1 bg-gradient-to-br from-pink-400 to-rose-500"></div>
                    <div className="rose-petal-inner-large rose-petal-inner-2 bg-gradient-to-br from-rose-400 to-pink-500"></div>
                    <div className="rose-petal-inner-large rose-petal-inner-3 bg-gradient-to-br from-pink-500 to-rose-600"></div>

                    {/* Center */}
                    <div className="rose-center-large bg-gradient-to-br from-rose-500 to-red-600"></div>

      {/* Floating rose petals around - deterministic for hydration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {useMemo(() => {
          return Array.from({ length: floatingPetalsCount }, (_, i) => {
            const left = 10 + seededRandom(i + 300) * 80
            const top = 10 + seededRandom(i + 400) * 80
            const delay = seededRandom(i + 500) * 4
            const duration = 3 + seededRandom(i + 600) * 2
            return (
              <div
                key={i}
                className="absolute animate-float-petal"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: `${duration}s`,
                }}
              >
                <div className="text-pink-300 text-sm opacity-50">🌸</div>
              </div>
            )
          })
        }, [floatingPetalsCount])}
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </div>
        ))}
      </div>

                    {/* Content inside rose */}
                    <div className="rose-content-large absolute inset-0 flex items-center justify-center p-4">
                      <div className="text-center max-w-lg mt-[5px] sm:mt-0">
                        {/* Sweet love header */}
                        <div className="mb-6" style={{ pointerEvents: 'auto' }}>
                          {showHeader && (
                            <div className="flex justify-center items-center gap-3 mb-4 animate-slide-in-from-heart">
                              <div className="relative">
                                <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-heartbeat drop-shadow-lg" />
                                <div className="absolute -top-1 -right-1 text-yellow-400 text-sm animate-twinkle">
                                  ✨
                                </div>
                              </div>
                              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                                {mainTitle}
                              </h2>
                              <div className="relative">
                                <Heart className="w-8 h-8 text-red-500 fill-red-500 animate-heartbeat drop-shadow-lg" />
                                <div
                                  className="absolute -top-1 -left-1 text-yellow-400 text-sm animate-twinkle"
                                  style={{ animationDelay: "0.5s" }}
                                >
                                  ✨
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Sweet decorative divider */}
                          {showDivider && (
                            <div className="flex items-center justify-center gap-3 mb-6 animate-divider-expand">
                              <div className="h-px bg-gradient-to-r from-transparent via-rose-500 to-rose-500 flex-1 max-w-16"></div>
                              <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-pink-200/80 to-rose-200/80 rounded-full border border-rose-300 backdrop-blur-sm">
                                <span className="text-rose-600 text-sm animate-heartbeat">🌹</span>
                                <span className="text-rose-700 text-sm font-medium">{sweetBadge}</span>
                                <span
                                  className="text-rose-600 text-sm animate-heartbeat"
                                  style={{ animationDelay: "0.3s" }}
                                >
                                  🌹
                                </span>
                              </div>
                              <div className="h-px bg-gradient-to-l from-transparent via-rose-500 to-rose-500 flex-1 max-w-16"></div>
                            </div>
                          )}
                        </div>

                        {showMessage && (
                          <div className="space-y-4">
                            {/* Message 1 */}
                            {/* {showMessage1 && (
                              <div className="relative group animate-message-appear">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 md:p-4 border border-pink-300/50 shadow-lg">
                                  <p className="text-xs md:text-base text-gray-700 leading-snug md:leading-relaxed mb-2 md:mb-3 font-medium">
                                    {message1Text}
                                  </p>
                                  <div className="flex justify-center gap-1 md:gap-2 text-base md:text-lg">
                                    <span className="animate-bounce">💖</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>✨</span>
                                    <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>💖</span>
                                  </div>
                                </div>
                              </div>
                            )} */}

                            {/* Message 2 */}
                            {showMessage2 && (
                              <div className="relative group animate-message-appear">
                                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2 md:p-4 border border-rose-300/50 shadow-lg">
                                  <p className="text-xs md:text-base text-gray-700 leading-snug md:leading-relaxed mb-2 md:mb-3 font-medium">
                                    {message2Text}
                                  </p>
                                  <div className="flex justify-center gap-1 md:gap-2 text-base md:text-lg">
                                    <span className="animate-pulse">🌸</span>
                                    <span className="animate-pulse" style={{ animationDelay: "0.3s" }}>💝</span>
                                    <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>🌸</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Main love message */}
                            {showMessage3 && (
                              <div className="relative group animate-message-appear">
                                <div className="bg-gradient-to-r from-pink-100/95 via-rose-100/95 to-red-100/95 backdrop-blur-sm rounded-2xl p-3 md:p-6 border-2 border-rose-400/50 shadow-xl">
                                  <div className="text-center">
                                    <p className="text-base md:text-2xl font-bold bg-gradient-to-r from-pink-700 via-rose-600 to-red-600 bg-clip-text text-transparent mb-2 md:mb-3 drop-shadow-sm">
                                      {mainLoveMessage}
                                    </p>
                                    <div className="flex justify-center gap-1 md:gap-2 text-lg md:text-2xl mb-1 md:mb-2">
                                      <span className="animate-heartbeat">❤️</span>
                                      <span className="animate-heartbeat" style={{ animationDelay: "0.3s" }}>🌹</span>
                                      <span className="animate-heartbeat" style={{ animationDelay: "0.6s" }}>❤️</span>
                                    </div>
                                    <p className="text-rose-700 font-semibold text-xs md:text-sm">{foreverText}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
