import ContentDetailsPageTemplate from '@/components/shared/ContentDetailsPageTemplate'
import DetailRowTemplate from '@/components/shared/DetailRowTemplate'
import useFetch from '@/shared/hooks/use-axios.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Starship } from '@/shared/interfaces/StarshipAttributes'
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
  resultArray: Starship[]
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
        h={{ base: '50%', lg: '100%' }}
        flexDir={'column'}
        gap={4}
        justifyContent={{ base: 'flex-end', lg: 'center' }}
      >
        <DetailRowTemplate
          title={'Name'}
          value={[resultArray[activeIndex].name]}
        />
        <DetailRowTemplate
          title={'Model'}
          value={[resultArray[activeIndex].model]}
        />
        <DetailRowTemplate
          title={'Manufacturer'}
          value={[resultArray[activeIndex].manufacturer]}
        />
        <DetailRowTemplate
          title={'Cost in Credits'}
          value={[resultArray[activeIndex].cost_in_credits]}
        />
        <DetailRowTemplate
          title={'Length'}
          value={[resultArray[activeIndex].length]}
        />
        <DetailRowTemplate
          title={'Max Atmosphering Speed'}
          value={[resultArray[activeIndex].max_atmosphering_speed]}
        />
        <DetailRowTemplate
          title={'Hyperdrive Rating'}
          value={[resultArray[activeIndex].hyperdrive_rating]}
        />
      </Flex>
      <Flex
        w={{ base: '100%', lg: '50%' }}
        h={{ base: '50%', lg: '100%' }}
        pt={{ base: 1, lg: 8 }}
        flexDir={'column'}
        justifyContent={{ base: 'flex-start', lg: 'center' }}
        gap={4}
      >
        <DetailRowTemplate
          title={'MGLT'}
          value={[resultArray[activeIndex].MGLT]}
        />
        <DetailRowTemplate
          title={'Starship Class'}
          value={[resultArray[activeIndex].starship_class]}
        />
        <DetailRowTemplate
          title={'Crew'}
          value={[resultArray[activeIndex].crew]}
        />
        <DetailRowTemplate
          title={'Passengers'}
          value={[resultArray[activeIndex].passengers]}
        />
        <DetailRowTemplate
          title={'Cargo Capacity'}
          value={[resultArray[activeIndex].cargo_capacity]}
        />
        <DetailRowTemplate
          title={'Consumables'}
          value={[resultArray[activeIndex].consumables]}
        />
        <DetailRowTemplate
          title={'Pilots'}
          value={resultArray[activeIndex].pilots}
        />
        <DetailRowTemplate
          title={'Films'}
          value={resultArray[activeIndex].films}
        />
      </Flex>
    </>
  )
}
const AllStarshipsPage: NextPage = () => {
  const [resultArray, setResultArray] = useState<Starship[]>([])
  const [resultInformation, setResultInformation] = useState<Result>()
  const [tempResultInformation, setTempResultInformation] = useState<Result>()
  const [isFetching, setIsFetching] = useState(false)
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://swapi.dev/api/starships/'
  )
  const { data, loading, error } = useFetch<Result>(currentPageUrl)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const [isError, setIsError] = useState(false)
  const [tempResultArray, setTempResultArray] = useState<Starship[]>([])
  const setSearchResult = useCallback(
    (searchResult: Result) => {
      if (searchResult.results.length > 0) {
        if (tempResultArray.length === 0) {
          setTempResultInformation(resultInformation)
          setTempResultArray(resultArray)
        }
        setIsError(false)
        setactiveIndex(0)
        setResultArray(searchResult.results as Starship[])
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
    let response: Starship[]
    let error: boolean = false
    try {
      setIsFetching(true)
      response = await Promise.all(
        (data.results as Starship[]).map(async (item: Starship) => {
          try {
            const pilots = item.pilots || []
            const films = item.films || []

            const [pilotNames, filmTitles] = await Promise.all([
              Promise.all(
                pilots.map((pilotUrl) =>
                  axios
                    .get(pilotUrl, { signal: controller.signal })
                    .then((res) => res.data.name)
                )
              ),
              Promise.all(
                films.map((filmUrl) =>
                  axios
                    .get(filmUrl, { signal: controller.signal })
                    .then((res) => res.data.title)
                )
              ),
            ])

            return {
              ...item,
              pilots: pilotNames,
              films: filmTitles,
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
      setIsFetching(false)
      clearTimeout(timeoutId)
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
      categoryName={'Star ships'}
      setCurrentPageUrl={setCurrentPageUrl}
      nextPageUrl={nextPageUrl}
      setactiveIndex={setactiveIndex}
      activeIndex={activeIndex}
      childrenComponent={
        <DetailsComponent resultArray={resultArray} activeIndex={activeIndex} />
      }
      url={'https://swapi.dev/api/starships/'}
      isError={isError}
      fetchData={fetchData}
      setSearchResult={setSearchResult}
      removeSearchResult={removeSearchResult}
      isFetching={loading || isFetching}
    />
  )
}

export default AllStarshipsPage
