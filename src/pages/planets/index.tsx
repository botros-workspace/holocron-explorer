import ContentDetailsPageTemplate from '@/components/shared/ContentDetailsPageTemplate'
import DetailRowTemplate from '@/components/shared/DetailRowTemplate'
import useFetch from '@/shared/hooks/use-axios.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Planet } from '@/shared/interfaces/PlanetAttributes'
import { Flex } from '@chakra-ui/react'
import axios from 'axios'
import { NextPage } from 'next'
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react'

type Props = {
  resultArray: Planet[]
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
        flexDir={'column'}
        gap={4}
        pt={6}
        justifyContent={{ base: 'flex-end', lg: 'center' }}
      >
        <>
          <DetailRowTemplate
            title={'Name'}
            value={[resultArray[activeIndex].name]}
          />
          <DetailRowTemplate
            title={'Rotation Period'}
            value={[`${[resultArray[activeIndex].rotation_period]} hours`]}
          />
          <DetailRowTemplate
            title={'orbital Period'}
            value={[`${[resultArray[activeIndex].orbital_period]} days`]}
          />
          <DetailRowTemplate
            title={'Diameter'}
            value={[`${[resultArray[activeIndex].diameter]} km`]}
          />
          <DetailRowTemplate
            title={'Climate'}
            value={[resultArray[activeIndex].climate]}
          />
          <DetailRowTemplate
            title={'Gravity'}
            value={[resultArray[activeIndex].gravity]}
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
          title={'Terrain'}
          value={[resultArray[activeIndex].terrain]}
        />
        <DetailRowTemplate
          title={'Surface Water'}
          value={[`${[resultArray[activeIndex].surface_water]}%`]}
        />
        <DetailRowTemplate
          title={'Population'}
          value={[resultArray[activeIndex].population]}
        />
        <DetailRowTemplate
          title={'Residents'}
          value={resultArray[activeIndex].residents}
        />
        <DetailRowTemplate
          title={'Films'}
          value={resultArray[activeIndex].films}
        />
      </Flex>
    </>
  )
}
const AllPlanetsPage: NextPage = () => {
  const [resultArray, setResultArray] = useState<Planet[]>([])
  const [resultInformation, setResultInformation] = useState<Result>()
  const [tempResultInformation, setTempResultInformation] = useState<Result>()
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://swapi.dev/api/planets/'
  )
  const { data, loading, error } = useFetch<Result>(currentPageUrl)
  const [isFetching, setIsFetching] = useState(false)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [isError, setIsError] = useState(false)
  const [activeIndex, setactiveIndex] = useState(0)
  const [tempResultArray, setTempResultArray] = useState<Planet[]>([])
  const setSearchResult = useCallback(
    (searchResult: Result) => {
      if (searchResult.results.length > 0) {
        if (tempResultArray.length === 0) {
          setTempResultInformation(resultInformation)
          setTempResultArray(resultArray)
        }
        setIsError(false)
        setactiveIndex(0)
        setResultArray(searchResult.results as Planet[])
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
    const timeoutId = setTimeout(() => controller.abort(), 20000)
    let response: Planet[]
    let error: boolean = false
    try {
      setIsFetching(true)
      response = await Promise.all(
        (data.results as Planet[]).map(async (item: Planet) => {
          try {
            const [residents, films] = await Promise.all([
              Promise.all(
                item.residents.map((resident) =>
                  axios
                    .get(resident, { signal: controller.signal })
                    .then((res) => res.data.name)
                )
              ),
              Promise.all(
                item.films.map((film) =>
                  axios
                    .get(film, { signal: controller.signal })
                    .then((res) => res.data.title)
                )
              ),
            ])

            return {
              ...item,
              residents: residents,
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
      categoryName={'Planets'}
      setCurrentPageUrl={setCurrentPageUrl}
      nextPageUrl={nextPageUrl}
      setactiveIndex={setactiveIndex}
      activeIndex={activeIndex}
      childrenComponent={
        <DetailsComponent resultArray={resultArray} activeIndex={activeIndex} />
      }
      url={'https://swapi.dev/api/planets/'}
      isError={isError}
      fetchData={fetchData}
      setSearchResult={setSearchResult}
      removeSearchResult={removeSearchResult}
      isFetching={loading || isFetching}
    />
  )
}

export default AllPlanetsPage
