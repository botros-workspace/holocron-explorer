'use client'
import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'
import MenuModal from './MenuModal'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const NavbarMainContainer: FunctionComponent = () => {
  const [showContent, setShowContent] = useState(false)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1700)
    return () => clearTimeout(timer)
  }, [])
  return (
    <Flex
      w={'100%'}
      h={12}
      justifyContent={'space-between'}
      alignItems={'center'}
      pos={'fixed'}
      zIndex={1000}
      px={6}
      background={scrolled ? 'rgba(128, 128, 128, 0.2)' : 'transparent'}
      backdropFilter={scrolled ? 'blur(1px)' : 'none'}
      boxShadow={scrolled ? '0px 4px 6px rgba(0, 0, 0, 0.1)' : 'none'}
    >
      <Flex
        transform={
          showContent || router.pathname !== '/'
            ? 'translateX(0px)'
            : 'translateX(-100px)'
        }
        transition={'transform 1s'}
      >
        <Link href={'/'}>
          <Image src={'/logo.png'} alt='logo' width={44} height={44} />
        </Link>
      </Flex>
      <Flex
        transform={
          showContent || router.pathname !== '/'
            ? 'translateX(0px)'
            : 'translateX(100px)'
        }
        transition={'transform 1s'}
      >
        <MenuModal />
      </Flex>
    </Flex>
  )
}

export default NavbarMainContainer
