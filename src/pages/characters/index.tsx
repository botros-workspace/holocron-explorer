import ContentDetailsPageTemplate from '@/components/shared/ContentDetailsPageTemplate'
import DetailRowTemplate from '@/components/shared/DetailRowTemplate'
import useFetch from '@/shared/hooks/use-axios.hook'
import { Result } from '@/shared/interfaces/ApiResultAttributes'
import { Character } from '@/shared/interfaces/CharacterAttributes'
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
  resultArray: Character[]
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
            title={'Name'}
            value={[resultArray[activeIndex]?.name]}
          />
          <DetailRowTemplate
            title={'Gender'}
            value={[resultArray[activeIndex]?.gender]}
          />
          <DetailRowTemplate
            title={'Height'}
            value={[resultArray[activeIndex]?.height + ' CM']}
          />
          <DetailRowTemplate
            title={'Mass'}
            value={[resultArray[activeIndex]?.mass + ' KG']}
          />
          <DetailRowTemplate
            title={'Hair'}
            value={[resultArray[activeIndex]?.hair_color]}
          />
          <DetailRowTemplate
            title={'Skin'}
            value={[resultArray[activeIndex]?.skin_color]}
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
          title={'Eye'}
          value={[resultArray[activeIndex]?.eye_color]}
        />
        <DetailRowTemplate
          title={'Birth day'}
          value={[resultArray[activeIndex]?.birth_year]}
        />
        <DetailRowTemplate
          title={'Films'}
          value={resultArray[activeIndex]?.films.map((film) => {
            return film
          })}
        />
        <DetailRowTemplate
          title={'Vehicles'}
          value={resultArray[activeIndex]?.vehicles.map((vehicle) => {
            return vehicle
          })}
        />
        <DetailRowTemplate
          title={'Star ships'}
          value={resultArray[activeIndex]?.starships.map((starship) => {
            return starship
          })}
        />
      </Flex>
    </>
  )
}
const AllCharactersPage: NextPage = () => {
  const [resultArray, setResultArray] = useState<Character[]>([])
  const [tempResultArray, setTempResultArray] = useState<Character[]>([])
  const [resultInformation, setResultInformation] = useState<Result>()
  const [tempResultInformation, setTempResultInformation] = useState<Result>()
  const [isError, setIsError] = useState(false)
  const [currentPageUrl, setCurrentPageUrl] = useState(
    'https://swapi.dev/api/people/'
  )
  const { data, loading, error } = useFetch<Result>(currentPageUrl)
  const [nextPageUrl, setNextPageUrl] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const setSearchResult = useCallback(
    (searchResult: Result) => {
      if (searchResult.results.length > 0) {
        if (tempResultArray.length === 0) {
          setTempResultInformation(resultInformation)
          setTempResultArray(resultArray)
        }
        setIsError(false)
        setactiveIndex(0)
        setResultArray(searchResult.results as Character[])
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
    let response: Character[]
    let error: boolean = false
    try {
      response = await Promise.all(
        (data.results as Character[]).map(async (item: Character) => {
          try {
            const [homeWorld, films, species, vehicles, starShips] =
              await Promise.all([
                axios
                  .get(item.homeworld, { signal: controller.signal })
                  .then((res) => res.data.name),
                Promise.all(
                  item.films.map((film) =>
                    axios
                      .get(film, { signal: controller.signal })
                      .then((res) => res.data.title)
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
              homeworld: homeWorld,
              films: films,
              species: species,
              vehicles: vehicles,
              starships: starShips,
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
      categoryName={'Characters'}
      setCurrentPageUrl={setCurrentPageUrl}
      nextPageUrl={nextPageUrl}
      setactiveIndex={setactiveIndex}
      activeIndex={activeIndex}
      isError={isError}
      childrenComponent={
        <DetailsComponent resultArray={resultArray} activeIndex={activeIndex} />
      }
      url={'https://swapi.dev/api/people/'}
      fetchData={fetchData}
      setSearchResult={setSearchResult}
      removeSearchResult={removeSearchResult}
    />
  )
}

export default AllCharactersPage
