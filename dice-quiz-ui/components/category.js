import React from 'react'
import { FaTv, FaFilm } from 'react-icons/fa' // You'll need to install react-icons package
import { useNavigation } from 'next/navigation'
import Link from 'next/link'

const ChooseCategoryScreen = () => {
  // URL of the provided illustration

  const backgroundImages = [
    'https://assets.nflxext.com/ffe/siteui/vlv3/ab4b0b22-2ddf-4d48-ae88-c201ae0267e2/0efe6360-4f6d-4b10-beb6-81e0762cfe81/IN-en-20231030-popsignuptwoweeks-perspective_alpha_website_large.jpg',
    'https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/65f1964b-8406-4fed-ac0e-9adbe0e4d994/JP-en-20231106-popsignuptwoweeks-perspective_alpha_website_small.jpg',
    'https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/6d387722-77a5-49ad-afac-78d4907598de/NL-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg',
    'https://assets.nflxext.com/ffe/siteui/vlv3/77d35039-751f-4c3e-9c8d-1240c1ca6188/212e4d93-cc97-4c69-a933-fbb5bc8d3a68/GB-en-20231106-popsignuptwoweeks-perspective_alpha_website_large.jpg',
  ]

  const illustrationUrl =
    'https://cdn.midjourney.com/8255cef6-bb3a-47d8-9d40-012f422ed7d4/0_2_384_N.webp'
  // URL of the provided background image
  const backgroundImageUrl = backgroundImages[2]

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-25"></div>{' '}
      {/* Shadow Effect */}
      <div className="w-full max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-xl relative z-10">
        <div className="z-10 shadow-lg p-5 rounded-lg">
          <div className="text-center mb-5">
            <h1 className="text-4xl font-bold text-black">
              Choose your preference
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-items-center">
            <div className="relative flex flex-col items-center justify-center">
              <Link href={'/quiz'}>
                <div className="text-center mb-2">
                  <span className="text-lg md:text-xl font-semibold text-black opacity-50">
                    Coming Soon
                  </span>
                </div>
                <button
                  disabled
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110"
                >
                  <FaTv className="text-3xl md:text-4xl" />
                  <span className="ml-3 text-lg md:text-xl">TV</span>
                </button>
              </Link>
            </div>
            <div className="relative flex flex-col items-center justify-center">
              <Link href={'/quiz'}>
                <div className="text-center mb-2">
                  <span className="text-lg md:text-xl font-semibold text-black">
                    Check it out!
                  </span>
                </div>
                <button className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-lg shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-110">
                  <FaFilm className="text-3xl md:text-4xl" />
                  <span className="ml-3 text-lg md:text-xl">Movie</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ChooseCategoryScreen }
