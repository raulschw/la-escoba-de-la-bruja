'use client'

import { useState } from 'react'

export default function HeroImage() {
  const [src, setSrc] = useState('https://images.pexels.com/photos/7222090/pexels-photo-7222090.jpeg?auto=compress&cs=tinysrgb&w=1200')

  return (
    <img
      src={src}
      onError={() => setSrc('https://images.pexels.com/photos/7222090/pexels-photo-7222090.jpeg?auto=compress&cs=tinysrgb&w=1200')}
      alt="La Escoba de la Bruja — Tarot, Videncia y Astrología"
      className="h-full w-full object-cover"
    />
  )
}
