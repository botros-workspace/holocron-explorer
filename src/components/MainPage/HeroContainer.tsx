import { useColor } from '@/shared/hooks/use-color.hook'
import { Flex, Box, Image, Text } from '@chakra-ui/react'
import React, { FunctionComponent, useEffect, useState } from 'react'

const HeroContainer: FunctionComponent = () => {
  const colors = useColor()
  const [hideIntro, setHideIntro] = useState(false)
  const [showHero, setShowHero] = useState(false)
  const [enableScrolling, setEnableScrolling] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setHideIntro(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true)
    }, 1300)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (showHero) {
      const timer = setTimeout(() => {
        setEnableScrolling(true)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [showHero])
  useEffect(() => {
    if (enableScrolling) {
      document.body.style.overflow = 'auto'
    } else {
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [enableScrolling])
  return (
    <Flex position='relative' h={'100vh'} w={'100vw'} overflow={'hidden'}>
      <Flex
        h={'100vh'}
        w={'100vw'}
        justifyContent={'center'}
        alignItems={'center'}
        opacity={hideIntro ? 0 : 1}
        transition={'opacity 1s'}
      >
        <Image src='/intro.webp' alt='intro-image' />
      </Flex>
      <Flex position='absolute' top='0' left='0' right='0' bottom='0'>
        <Box
          position='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          transition={'all 1s'}
          opacity={showHero ? 1 : 0}
          transitionDelay={'0.99s'}
          bg={'rgba(0, 0, 0, 0.3)'}
        />
        <Image
          src='/hero-image.jpg'
          alt='hero-image'
          fit={'fill'}
          transition={'all 1s'}
          opacity={showHero ? 1 : 0}
          w={'100vw'}
          h={'100%'}
        />
      </Flex>

      <Flex
        position='absolute'
        top='100'
        left='0'
        w={{ base: '60%', md: '50%' }}
        pl={6}
        flexWrap={'wrap'}
        fontFamily={'Star Jedi'}
        alignItems={'center'}
        gap={2}
      >
        <Box overflow={'hidden'}>
          <Text
            fontSize={{ base: 'large', md: 'xx-large' }}
            fontWeight={'semi-bold'}
            textColor={colors.yellow}
            transition={'all 1s '}
            transform={showHero ? 'translateY(0px)' : 'translateY(-500px)'}
            transitionDelay={'0.1s'}
          >
            Welcome to Holocron Explorer
          </Text>
        </Box>
        <Box overflow={'hidden'}>
          <Text
            fontSize={{ base: 'sm', md: 'large' }}
            textColor={colors.red}
            fontWeight={'light'}
            transition={'all 1s '}
            transitionDelay={'0.1s'}
            transform={showHero ? 'translateY(0px)' : 'translateY(1000px)'}
          >
            Discover the rich lore of the Star Wars universe. From iconic
            characters to legendary starships, explore everything that makes
            this galaxy so vast and fascinating. Whether you’re a Jedi, a Sith,
            or simply a curious traveler, the knowledge of the Holocron awaits
            you.
          </Text>
        </Box>
      </Flex>
      <Box
        px={4}
        py={2}
        pos={'absolute'}
        bottom={10}
        right={10}
        bg={'#171717'}
        borderWidth={1}
        borderRadius={'lg'}
        textAlign={'center'}
        borderColor={colors.red}
        boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={{ base: 'md', md: '2xl' }}
        cursor={'pointer'}
        onClick={() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          })
        }}
        textColor={colors.red}
        fontFamily={'Star Jedi'}
        transition={'transform 0.9s'}
        transitionDelay={'0.5s'}
        transform={showHero ? 'translateY(0px)' : 'translateY(100px)'}
      >
        Scroll to explore
      </Box>
    </Flex>
  )
}

export default HeroContainer
