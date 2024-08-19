import { useColor } from '@/shared/hooks/use-color.hook'
import { ContentAttributes } from '@/shared/interfaces/ContentAttributes'
import { Flex, Text, Image, Box } from '@chakra-ui/react'
import Link from 'next/link'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

type Props = {
  contentArray: ContentAttributes[]
}

const ContentGalleryContainer: FunctionComponent<Props> = ({
  contentArray,
}) => {
  const colors = useColor()
  const [activeIndex, setActiveIndex] = useState(0)
  const [hideActiveContainer, setHideActiveContainer] = useState(false)
  const [isAutoNavigationOn, setIsAutoNavigationOn] = useState(true)
  const [transformValue, setTransformValue] = useState('')
  const containerRef = useRef(null)

  const navigateRight = useCallback(() => {
    setHideActiveContainer(true)
    setTransformValue('translateX(500px)')
    const timer = setTimeout(() => {
      if (activeIndex < contentArray.length - 1) {
        setActiveIndex(activeIndex + 1)
      } else {
        setActiveIndex(0)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [activeIndex, contentArray.length])

  const navigateLeft = useCallback(() => {
    setHideActiveContainer(true)
    setTransformValue('translateX(-500px)')
    const timer = setTimeout(() => {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1)
      } else {
        setActiveIndex(contentArray.length - 1)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [activeIndex, contentArray.length])

  useEffect(() => {
    if (hideActiveContainer) {
      const timer = setTimeout(() => {
        setTransformValue('translateX(0px)')
        setHideActiveContainer(false)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [hideActiveContainer])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setIsAutoNavigationOn(false)
      if (e.key === 'ArrowRight') {
        navigateRight()
      } else if (e.key === 'ArrowLeft') {
        navigateLeft()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateLeft, navigateRight])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAutoNavigationOn) {
        navigateRight()
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [isAutoNavigationOn, navigateRight])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isAutoNavigationOn) {
        setIsAutoNavigationOn(true)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [isAutoNavigationOn])

  return (
    <Flex
      pos={'absolute'}
      w={'100vw'}
      h={'100vh'}
      top={0}
      left={0}
      zIndex={3}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Flex
        h={{ base: 10, md: 16 }}
        w={{ base: 10, md: 16 }}
        bg={'#171717'}
        borderWidth={1}
        borderRadius={'full'}
        borderColor={colors.red}
        onClick={() => {
          navigateLeft()
          setIsAutoNavigationOn(false)
        }}
        cursor={'pointer'}
        boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={{ base: '2xl', md: '8xl' }}
        textColor={'white'}
      >
        <MdKeyboardArrowLeft />
      </Flex>

      <Flex
        w={{ base: '75%', md: '65%' }}
        h={'50%'}
        flexDir={'column'}
        overflow={'hidden'}
      >
        <Flex
          w={'100%'}
          h={'95%'}
          onMouseEnter={() => setIsAutoNavigationOn(false)}
          onMouseLeave={() => setIsAutoNavigationOn(true)}
          ref={containerRef}
          transition={'all 0.5s'}
          transform={transformValue}
          opacity={hideActiveContainer ? 0 : 1}
          gap={10}
          justifyContent={'center'}
          alignItems={'center'}
          px={2}
        >
          <Flex w={{ base: '100%', lg: '60%' }} h={{ base: '100%', lg: '90%' }}>
            <Image
              w={'100%'}
              src={contentArray[activeIndex].image}
              alt={contentArray[activeIndex].category}
              fit={'contain'}
            />
          </Flex>
          <Flex
            h={'100%'}
            w={'50%'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
          >
            <Flex
              alignItems={'center'}
              flexDir={'column'}
              gap={2}
              fontFamily={'Star Jedi'}
              h={{ base: '70%', xl: '80%' }}
            >
              <Text
                textColor={colors.red}
                fontSize={{ base: 'lg', md: '2xl', lg: '4xl' }}
              >
                {contentArray[activeIndex].category}
              </Text>
              <Text
                textColor={colors.yellow}
                fontSize={{ base: 'xs', md: 'md', lg: 'xl' }}
              >
                {contentArray[activeIndex].description}
              </Text>
            </Flex>
            <Flex w={'100%'} justifyContent={'flex-end'}>
              <Link href={contentArray[activeIndex].url}>
                <Box
                  px={4}
                  w={{ base: 48, lg: 72 }}
                  py={2}
                  bg={'#171717'}
                  borderWidth={1}
                  borderRadius={'lg'}
                  textAlign={'center'}
                  borderColor={colors.red}
                  boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  fontSize={{ base: 'sm', lg: '2xl' }}
                  textColor={colors.red}
                  fontFamily={'Star Jedi'}
                  cursor={'pointer'}
                >
                  Show {`${contentArray[activeIndex].category}`.toLowerCase()}
                </Box>
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          w={'100%'}
          flexDir={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={2}
          mt={2}
        >
          {contentArray.map((singleContent, index) => {
            return (
              <Flex
                key={singleContent.category}
                w={3}
                h={3}
                bg={activeIndex === index ? 'rgba(255, 48, 48, 1)' : '#171717'}
                borderWidth={1}
                borderRadius={'full'}
                borderColor={colors.red}
                cursor={'pointer'}
                boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
                onClick={() => {
                  setActiveIndex(index)
                  setIsAutoNavigationOn(false)
                }}
              />
            )
          })}
        </Flex>
      </Flex>

      <Flex
        h={{ base: 10, md: 16 }}
        w={{ base: 10, md: 16 }}
        bg={'#171717'}
        borderWidth={1}
        borderRadius={'full'}
        borderColor={colors.red}
        boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
        onClick={() => {
          navigateRight()
          setIsAutoNavigationOn(false)
        }}
        cursor={'pointer'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={{ base: '2xl', md: '8xl' }}
        textColor={'white'}
      >
        <MdKeyboardArrowRight />
      </Flex>
    </Flex>
  )
}

export default ContentGalleryContainer
