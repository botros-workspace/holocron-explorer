import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Flex } from '@chakra-ui/react'
import Spinner from './Spinner'
import SearchButton from './SearchButton'
import StarWarCustomBackgroundTemplate from './StarWarCustomBackgroundTemplate'
import { useColor } from '@/shared/hooks/use-color.hook'
import { Character } from '@/shared/interfaces/CharacterAttributes'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import { Film } from '@/shared/interfaces/FilmAttributes'
import { Planet } from '@/shared/interfaces/PlanetAttributes'
import { Species } from '@/shared/interfaces/SpeciesAttributes'
import { Vehicle } from '@/shared/interfaces/VehicleAttributes'
import { Starship } from '@/shared/interfaces/StarshipAttributes'
import { Result } from '@/shared/interfaces/ApiResultAttributes'

type Props = {
  resultArray:
    | Character[]
    | Film[]
    | Planet[]
    | Species[]
    | Vehicle[]
    | Starship[]
  allValuesCount: number | undefined
  categoryName: string
  setCurrentPageUrl: (value: string) => void
  setactiveIndex: (value: number) => void
  nextPageUrl: string
  activeIndex: number
  childrenComponent: ReactNode
  isError: boolean
  url: string
  fetchData: () => void
  isFetching: boolean
  setSearchResult: (value: Result) => void
  removeSearchResult: () => void
}
const ContentDetailsPageTemplate: FunctionComponent<Props> = ({
  resultArray,
  allValuesCount,
  categoryName,
  setCurrentPageUrl,
  setactiveIndex,
  nextPageUrl,
  activeIndex,
  childrenComponent,
  isError,
  url,
  fetchData,
  isFetching,
  setSearchResult,
  removeSearchResult,
}) => {
  const colors = useColor()
  const [isLeftArrowHovered, setIsLeftArrowHovered] = useState(false)
  const [isRightArrowHovered, setIsRightArrowHovered] = useState(false)

  const navigateRight = useCallback(() => {
    if (activeIndex + 9 === resultArray.length - 1) {
      setCurrentPageUrl(nextPageUrl)
    }
    if (activeIndex < resultArray.length - 1) {
      setactiveIndex(activeIndex + 1)
    }
  }, [
    activeIndex,
    nextPageUrl,
    resultArray.length,
    setCurrentPageUrl,
    setactiveIndex,
  ])
  const navigateLeft = useCallback(() => {
    if (activeIndex > 0) {
      setactiveIndex(activeIndex - 1)
    }
  }, [activeIndex, setactiveIndex])
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        navigateRight()
      } else if (e.key === 'ArrowLeft') {
        navigateLeft()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigateLeft, navigateRight])
  return (
    <Flex pos={'relative'}>
      <SearchButton
        url={url}
        setSearchResult={setSearchResult}
        removeSearchResult={removeSearchResult}
        isFetching={isFetching}
      />
      <StarWarCustomBackgroundTemplate />
      <Flex
        pos={'absolute'}
        w={'100vw'}
        h={'100vh'}
        top={0}
        left={0}
        textColor={colors.red}
        justifyContent={'center'}
        alignItems={'center'}
        zIndex={2}
      >
        <Flex
          w={{ base: '90%', md: '60%' }}
          h={'80%'}
          justifyContent={'center'}
          alignItems={'center'}
          borderRadius={10}
          borderWidth={1}
          bg={'rgba(0, 0, 0, 0.7)'}
          boxShadow={'0px 4px 40px rgba(255, 48, 48, 1)'}
          borderColor={colors.red}
          pos={'relative'}
          flexDir={{ base: 'column', lg: 'row' }}
          overflow={'scroll'}
        >
          <Flex
            pos={'absolute'}
            left={0}
            top={0}
            h={'100%'}
            alignItems={'center'}
            cursor={'pointer'}
            opacity={activeIndex === 0 || resultArray.length === 0 ? 0 : 1}
            color={isLeftArrowHovered ? colors.red : ''}
            w={8}
            fontSize={{ base: '2xl', md: '8xl' }}
            borderLeftRadius={10}
            onClick={() => {
              if (activeIndex !== 0) {
                navigateLeft()
              }
            }}
            onMouseEnter={() => setIsLeftArrowHovered(true)}
            onMouseLeave={() => setIsLeftArrowHovered(false)}
          >
            <MdKeyboardArrowLeft />
          </Flex>
          <Flex
            pos={'absolute'}
            right={0}
            top={0}
            h={'100%'}
            onMouseEnter={() => setIsRightArrowHovered(true)}
            onMouseLeave={() => setIsRightArrowHovered(false)}
            w={8}
            borderRightRadius={10}
            alignItems={'center'}
            fontSize={{ base: '2xl', md: '8xl' }}
            cursor={'pointer'}
            color={isRightArrowHovered ? colors.red : ''}
            opacity={
              activeIndex === resultArray.length - 1 || resultArray.length === 0
                ? 0
                : 1
            }
            onClick={navigateRight}
          >
            <MdKeyboardArrowRight />
          </Flex>
          {isError ? (
            <Flex
              w={'100%'}
              h={{ base: 72, md: 96 }}
              justifyContent={'center'}
              alignItems={'center'}
              fontFamily={'Star Jedi'}
              fontSize={{ base: 'xs', md: 'xl' }}
              flexDir={'column'}
              gap={4}
              zIndex={3}
            >
              An error accoured while fetching data
              <Flex
                borderWidth={1}
                borderRadius={10}
                alignItems={'center'}
                justifyContent={'center'}
                px={6}
                borderColor={colors.yellow}
                boxShadow={`0px 4px 30px rgba(255, 193, 37, 1)`}
                py={2}
                cursor={'pointer'}
                color={colors.red}
                onClick={fetchData}
              >
                Try again
              </Flex>
            </Flex>
          ) : resultArray.length ? (
            <>{childrenComponent}</>
          ) : (
            <Flex
              w={{ base: 72, md: 96 }}
              h={{ base: 72, md: 96 }}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Spinner />
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex
        pos={'absolute'}
        bottom={5}
        left={{ base: 5, md: 10 }}
        h={8}
        zIndex={2}
        textColor={colors.red}
        fontFamily={'Star Jedi'}
        fontSize={{ base: 'xs', md: 'xl' }}
      >
        Totall ${categoryName} number :{' '}
        {isError ? (
          'Error'
        ) : allValuesCount ? (
          activeIndex + 1 + ' / ' + allValuesCount
        ) : (
          <Flex w={8}>
            <Spinner />
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default ContentDetailsPageTemplate
