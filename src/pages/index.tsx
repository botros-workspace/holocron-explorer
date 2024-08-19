import ContentSectionContainer from '@/components/MainPage/ContentSectionContainer'
import HeroContainer from '@/components/MainPage/HeroContainer'
import axios from 'axios'
import { useState, useEffect } from 'react'

export default function Home() {
  return (
    <>
      <HeroContainer />
      <ContentSectionContainer />
    </>
  )
}
