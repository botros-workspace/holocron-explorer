import ContentDetailsPageTemplate from '@/components/shared/ContentDetailsPageTemplate'
import DetailRowTemplate from '@/components/shared/DetailRowTemplate'
import useFetch from '@/shared/hooks/use-axios.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Film } from '@/shared/interfaces/FilmAttributes'
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
  resultArray: Film[]
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
        <>
          <DetailRowTemplate
            title={'Title'}
            value={[resultArray[activeIndex].title]}
          />
          <DetailRowTemplate
            title={'Episode'}
            value={[`Episode ${resultArray[activeIndex].episode_id}`]}
          />
          <DetailRowTemplate
            title={'Director'}
            value={[resultArray[activeIndex].director]}
          />
          <DetailRowTemplate
            title={'Producer(s)'}
            value={resultArray[activeIndex].producer.split(', ')}
          />
          <DetailRowTemplate
            title={'Release Date'}
            value={[resultArray[activeIndex].release_date]}
          />
          <DetailRowTemplate
            title={'Opening Crawl'}
            value={[resultArray[activeIndex].opening_crawl]}
          />
        </>
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
          title={'Characters'}
          value={resultArray[activeIndex].characters}
        />
        <DetailRowTemplate
          title={'Planets'}
          value={resultArray[activeIndex].planets}
        />
        <DetailRowTemplate
          title={'Starships'}
          value={resultArray[activeIndex].starships}
        />
        <DetailRowTemplate
          title={'Vehicles'}
          value={resultArray[activeIndex].vehicles}
        />
        <DetailRowTemplate
          title={'Species'}
          value={resultArray[activeIndex].species}
        />
      </Flex>
    </>
  )
}
const AllFilmsPage: NextPage = () => {
  const [resultArray, setResultArray] = useState<Film[]>([])
  const [isError, setIsError] = useState(false)
  const [resultInformation, setResultInformation] = useState<Result>()
  const [tempResultInformation, setTempResultInformation] = useState<Result>()
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://swapi.dev/api/films/'
  )
  const { data, loading, error } = useFetch<Result>(currentPageUrl)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const [tempResultArray, setTempResultArray] = useState<Film[]>([])
  const setSearchResult = useCallback(
    (searchResult: Result) => {
      if (searchResult.results.length > 0) {
        if (tempResultArray.length === 0) {
          setTempResultInformation(resultInformation)
          setTempResultArray(resultArray)
        }
        setIsError(false)
        setactiveIndex(0)
        setResultArray(searchResult.results as Film[])
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
    let response: Film[]
    let error: boolean = false
    try {
      response = await Promise.all(
        (data.results as Film[]).map(async (item: Film) => {
          try {
            const [characters, planets, starships, vehicles, species] =
              await Promise.all([
                Promise.all(
                  item.characters.map((character) =>
                    axios
                      .get(character, { signal: controller.signal })
                      .then((res) => res.data.name)
                  )
                ),
                Promise.all(
                  item.planets.map((planet) =>
                    axios
                      .get(planet, { signal: controller.signal })
                      .then((res) => res.data.name)
                  )
                ),
                Promise.all(
                  item.species.map((specie) =>
                    axios
                      .get(specie, { signal: controller.signal })
                      .then((res) => res.data.name)
                  )
                ),
                Promise.all(
                  item.vehicles.map((vehicle) =>
                    axios
                      .get(vehicle, { signal: controller.signal })
                      .then((res) => res.data.name)
                  )
                ),
                Promise.all(
                  item.starships.map((starShip) =>
                    axios
                      .get(starShip, { signal: controller.signal })
                      .then((res) => res.data.name)
                  )
                ),
              ])

            return {
              ...item,
              characters: characters,
              planets: planets,
              species: species,
              vehicles: vehicles,
              starships: starships,
            }
          } catch (itemError) {
            error = true
            setIsError(true)
            return item
          }
        })
      )
    } catch (fetchError: any) {
      setIsError(true)
      error = true
    } finally {
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
      categoryName={'Films'}
      setCurrentPageUrl={setCurrentPageUrl}
      nextPageUrl={nextPageUrl}
      setactiveIndex={setactiveIndex}
      activeIndex={activeIndex}
      childrenComponent={
        <DetailsComponent resultArray={resultArray} activeIndex={activeIndex} />
      }
      url={'https://swapi.dev/api/films/'}
      fetchData={fetchData}
      isError={isError}
      setSearchResult={setSearchResult}
      removeSearchResult={removeSearchResult}
    />
  )
}

export default AllFilmsPage
