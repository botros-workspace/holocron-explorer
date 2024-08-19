import { useColor } from '@/shared/hooks/use-color.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Flex, Input } from '@chakra-ui/react'
import axios from 'axios'
import React, {
  FunctionComponent,
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoCloseOutline } from 'react-icons/io5'
import { TbZoomReset } from 'react-icons/tb'
import { VscDebugStart } from 'react-icons/vsc'
import Spinner from './Spinner'

type Props = {
  url: string
  setSearchResult: (value: Result) => void
  removeSearchResult: () => void
  isFetching: boolean
}
const SearchButton: FunctionComponent<Props> = ({
  url,
  setSearchResult,
  removeSearchResult,
  isFetching,
}) => {
  const colors = useColor()
  const searchButtonRef = useRef<HTMLDivElement | null>(null)
  const [isSearchHovered, setIsSearchHovered] = useState(false)
  const [isResetHovered, setIsResetHovered] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showResetButton, setShowResetButton] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${url}?search=${searchValue}`)
      if (response.data.count !== 0) {
        setIsSearchActive(false)
        setSearchValue('')
        setShowResetButton(true)
        setSearchResult(response.data)
      } else {
        setSearchValue('No result')
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchValue, setSearchResult, url])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchButtonRef.current &&
        !searchButtonRef.current.contains(event.target as Node)
      ) {
        setIsSearchActive(false)
        setSearchValue('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isSearchActive) {
        fetchData()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fetchData, isSearchActive])
  return (
    <>
      {showResetButton && !isSearchActive && (
        <Flex
          pos={'absolute'}
          bottom={{ base: 5, md: 10 }}
          right={{ base: 16, md: 32 }}
          alignItems={'center'}
          cursor={'pointer'}
          zIndex={3}
          h={{ base: 10, md: 16 }}
          w={{ base: 10, md: 16 }}
          color={colors.yellow}
          fontSize={
            isResetHovered
              ? { base: '2xl', md: '4xl' }
              : { base: 'xl', md: '3xl' }
          }
          borderLeftRadius={10}
          bg={'#171717'}
          borderWidth={1}
          borderRadius={'full'}
          borderColor={colors.yellow}
          boxShadow={isResetHovered ? '0px 4px 30px rgba(255, 193, 37, 1)' : ''}
          justifyContent={'center'}
          transition={'all 1s'}
          onMouseEnter={() => setIsResetHovered(true)}
          onMouseLeave={() => setIsResetHovered(false)}
          onClick={() => {
            removeSearchResult()
            setShowResetButton(false)
          }}
        >
          <TbZoomReset />
        </Flex>
      )}
      <Flex
        pos={'absolute'}
        bottom={{ base: 5, md: 10 }}
        right={{ base: 2, md: 10 }}
        zIndex={3}
        ref={searchButtonRef}
      >
        <Input
          ref={inputRef}
          type='string'
          w={isSearchActive ? { base: 72, md: 96 } : 0}
          h={{ base: 10, md: 16 }}
          bg={'#171717'}
          textColor={colors.red}
          fontFamily={'Star Jedi'}
          pos={'absolute'}
          right={0}
          transition={'all 0.5s'}
          borderColor={colors.red}
          boxShadow={'0px 4px 30px rgba(255, 48, 48, 1)'}
          _focus={{
            borderColor: colors.red,
            boxShadow: '0px 4px 30px rgba(255, 48, 48, 1)',
          }}
          _hover={{
            borderColor: colors.red,
          }}
          zIndex={10}
          opacity={isSearchActive ? 1 : 0}
          borderRadius={'full'}
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
          }}
        />

        {isSearchActive ? (
          <Flex
            alignItems={'center'}
            cursor={'pointer'}
            zIndex={10}
            h={{ base: 10, md: 16 }}
            w={{ base: 10, md: 16 }}
            color={colors.red}
            fontSize={
              isSearchHovered
                ? { base: '2xl', md: '4xl' }
                : { base: 'xl', md: '3xl' }
            }
            borderLeftRadius={10}
            bg={'#171717'}
            borderWidth={1}
            borderRadius={'full'}
            borderColor={colors.red}
            boxShadow={
              isSearchHovered ? '0px 4px 30px rgba(255, 48, 48, 1)' : ''
            }
            justifyContent={'center'}
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            onClick={() => {
              if (searchValue.length > 0) {
                fetchData()
              } else {
                setIsSearchActive(false)
                setSearchValue('')
              }
            }}
          >
            {isLoading ? (
              <Spinner />
            ) : searchValue.length > 0 ? (
              <VscDebugStart />
            ) : (
              <IoCloseOutline />
            )}
          </Flex>
        ) : (
          <Flex
            alignItems={'center'}
            cursor={isFetching ? '' : 'pointer'}
            zIndex={10}
            h={{ base: 10, md: 16 }}
            w={{ base: 10, md: 16 }}
            color={colors.red}
            fontSize={{ base: '2xl', md: '4xl' }}
            borderLeftRadius={10}
            bg={'#171717'}
            borderWidth={1}
            borderRadius={'full'}
            borderColor={colors.red}
            boxShadow={
              isSearchHovered ? '0px 4px 30px rgba(255, 48, 48, 1)' : ''
            }
            justifyContent={'center'}
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            onClick={() => {
              if (isFetching) return
              setIsSearchActive(true)
              if (inputRef.current) {
                inputRef.current.focus()
              }
            }}
          >
            {isFetching ? <Spinner /> : <BsSearch />}
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default SearchButton
