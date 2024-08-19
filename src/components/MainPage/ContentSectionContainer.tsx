import { ContentAttributes } from '@/shared/interfaces/ContentAttributes'
import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import ContentGalleryContainer from './ContentGalleryContainer'
import StarWarCustomBackgroundTemplate from '../shared/StarWarCustomBackgroundTemplate'

const ContentSectionContainer: FunctionComponent = () => {
  const contentArray: ContentAttributes[] = [
    {
      category: 'Films',
      description:
        'Relive the epic saga with a detailed look at all Star Wars films. From “A New Hope” to “The Rise of Skywalker,” explore the plots, release dates, directors, and memorable moments from each film.',
      image: '/content-films.png',
      url: '/films',
    },
    {
      category: 'Characters',
      description:
        'Explore the galaxy’s most iconic characters, from legendary Jedi Knights to notorious Sith Lords. Discover details about their homeworlds, species, affiliations, and much more.',
      image: '/characters-content.png',
      url: '/characters',
    },
    {
      category: 'Planets',
      description:
        'Journey across the Star Wars universe and visit distant worlds, from the desert planet Tatooine to the city-covered Coruscant. Learn about each planet’s terrain, climate, and the fascinating species that inhabit them.',
      image: '/content-planets.png',
      url: '/planets',
    },
    {
      category: 'Species',
      description:
        'Meet the diverse species that populate the Star Wars galaxy. Learn about their unique characteristics, homeworlds, and notable appearances throughout the series.',
      image: '/content-species.png',
      url: '/species',
    },
    {
      category: 'Vehicles',
      description:
        'Speed through the galaxy in the most iconic vehicles, from speeder bikes to AT-ATs. Discover details about the various vehicles used by the Empire, the Rebellion, and everyone in between.',
      image: '/content-vehicles.png',
      url: '/vehicles',
    },
    {
      category: 'Star ships',
      description:
        'Take to the stars with a look at the most famous starships in the Star Wars universe. Explore details about the Millennium Falcon, Star Destroyers, X-Wings, and many more legendary vessels.',
      image: '/content-starships.png',
      url: '/starships',
    },
  ]
  return (
    <Flex pos={'relative'}>
      <ContentGalleryContainer contentArray={contentArray} />
      <StarWarCustomBackgroundTemplate />
    </Flex>
  )
}

export default ContentSectionContainer
