import ContentDetailsPageTemplate from '@/components/shared/ContentDetailsPageTemplate'
import DetailRowTemplate from '@/components/shared/DetailRowTemplate'
import useFetch from '@/shared/hooks/use-axios.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Species } from '@/shared/interfaces/SpeciesAttributes'
import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import { cloneDeep } from 'lodash'
import { NextPage } from 'next'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

type Props = {
  resultArray: Species[]
  activeIndex: number
}
const DetailsComponent: FunctionComponent<Props> = ({
  resultArray,
  activeIndex,
}) => {
  return (
    <>
      <Flex
        w={{ base: '100%', lg: '50%' }}
        h={{ base: 'auto', lg: '100%' }}
        pt={6}
        flexDir={'column'}
        gap={4}
        justifyContent={{ base: 'flex-end', lg: 'center' }}
      >
        <>
          <DetailRowTemplate
            title={'Name'}
            value={[resultArray[activeIndex].name]}
          />
          <DetailRowTemplate
            title={'Classification'}
            value={[resultArray[activeIndex].classification]}
          />
          <DetailRowTemplate
            title={'Designation'}
            value={[resultArray[activeIndex].designation]}
          />
          <DetailRowTemplate
            title={'Average Height'}
            value={[resultArray[activeIndex].average_height]}
          />
          <DetailRowTemplate
            title={'Skin Colors'}
            value={[resultArray[activeIndex].skin_colors]}
          />
          <DetailRowTemplate
            title={'Hair Colors'}
            value={[resultArray[activeIndex].hair_colors]}
          />
        </>
      </Flex>
      <Flex
        w={{ base: '100%', lg: '50%' }}
        h={{ base: 'auto', lg: '100%' }}
        pt={2}
        flexDir={'column'}
        justifyContent={{ base: 'flex-start', lg: 'center' }}
        gap={4}
      >
        <DetailRowTemplate
          title={'Eye Colors'}
          value={[resultArray[activeIndex].eye_colors]}
        />
        <DetailRowTemplate
          title={'Average Lifespan'}
          value={[resultArray[activeIndex].average_lifespan]}
        />
        <DetailRowTemplate
          title={'Language'}
          value={[resultArray[activeIndex].language]}
        />
        <DetailRowTemplate
          title={'Homeworld'}
          value={[
            resultArray[activeIndex].homeworld
              ? resultArray[activeIndex].homeworld
              : 'unknown',
          ]}
        />
        <DetailRowTemplate
          title={'People'}
          value={resultArray[activeIndex].people}
        />
        <DetailRowTemplate
          title={'Films'}
          value={resultArray[activeIndex].films}
        />
      </Flex>
    </>
  )
}
const AllSpeciesPage: NextPage = () => {
  const [resultArray, setResultArray] = useState<Species[]>([])
  const [resultInformation, setResultInformation] = useState<Result>()
  const [tempResultInformation, setTempResultInformation] = useState<Result>()
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://swapi.dev/api/species/'
  )
  const { data, loading, error } = useFetch<Result>(currentPageUrl)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const [isError, setIsError] = useState(false)
  const [tempResultArray, setTempResultArray] = useState<Species[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const setSearchResult = useCallback(
    (searchResult: Result) => {
      if (searchResult.results.length > 0) {
        if (tempResultArray.length === 0) {
          setTempResultInformation(resultInformation)
          setTempResultArray(resultArray)
        }
        setIsError(false)
        setactiveIndex(0)
        setResultArray(searchResult.results as Species[])
        setResultInformation(searchResult)
        setNextPageUrl(searchResult.next)
      }
    },
    [resultArray, resultInformation, tempResultArray.length]
  )
  const removeSearchResult = useCallback(() => {
    if (!tempResultInformation) return
    setactiveIndex(0)
    setNextPageUrl(tempResultInformation.next)
    setResultArray(tempResultArray)
    setResultInformation(tempResultInformation)
  }, [tempResultArray, tempResultInformation])
  const fetchData = useCallback(async () => {
    if (!data) return
    setIsError(false)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000)
    let response: Species[]
    let error: boolean = false
    try {
      setIsFetching(true)
      response = await Promise.all(
        (data.results as Species[]).map(async (item: Species) => {
          try {
            const [people, films] = await Promise.all([
              Promise.all(
                item.people.map((personUrl) =>
                  axios
                    .get(personUrl, { signal: controller.signal })
                    .then((res) => res.data.name)
                )
              ),
              Promise.all(
                item.films.map((filmUrl) =>
                  axios
                    .get(filmUrl, { signal: controller.signal })
                    .then((res) => res.data.title)
                )
              ),
            ])

            const homeworld = item.homeworld
              ? await axios
                  .get(item.homeworld, { signal: controller.signal })
                  .then((res) => res.data.name)
              : null

            return {
              ...item,
              people: people,
              homeworld: homeworld,
              films: films,
            }
          } catch (itemError) {
            setIsError(true)
            error = true
            return item
          }
        })
      )
    } catch (fetchError: any) {
      setIsError(true)
      error = true
    } finally {
      clearTimeout(timeoutId)
      setIsFetching(false)
    }
    if (!error) {
      setResultArray((prevArray) => [...prevArray, ...response])
      setResultInformation(data)
    } else {
      setResultArray([])
    }
  }, [data])
  useEffect(() => {
    if (data) {
      setNextPageUrl(data.next)
      fetchData()
    }
  }, [data, fetchData])
  return (
    <ContentDetailsPageTemplate
      resultArray={resultArray}
      allValuesCount={resultInformation?.count}
      categoryName={'Species'}
      setCurrentPageUrl={setCurrentPageUrl}
      nextPageUrl={nextPageUrl}
      setactiveIndex={setactiveIndex}
      activeIndex={activeIndex}
      childrenComponent={
        <DetailsComponent resultArray={resultArray} activeIndex={activeIndex} />
      }
      url={'https://swapi.dev/api/species/'}
      isError={isError}
      fetchData={fetchData}
      setSearchResult={setSearchResult}
      removeSearchResult={removeSearchResult}
      isFetching={loading || isFetching}
    />
  )
}

export default AllSpeciesPage
