import { useColor } from '@/shared/hooks/use-color.hook'
import { Flex, Text, useBreakpointValue, keyframes } from '@chakra-ui/react'
import { NextPage } from 'next'
import React from 'react'
const crawlMobile = keyframes`
  0% {
    top: 90%;
  }
  100% {
    top: -130%; 
  }
`

const crawlDesktop = keyframes`
  0% {
    top: 90%;
  }
  100% {
    top: -235%;
  }
`
const MotivationLetter: NextPage = () => {
  const colors = useColor()
  const animation = useBreakpointValue({
    base: crawlMobile,
    md: crawlDesktop,
  })
  return (
    <Flex
      bg={'#171717'}
      w={'100vw'}
      h={'100vh'}
      justifyContent={'center'}
      overflow={'scroll'}
    >
      <Flex
        w={'80vw'}
        animation={`${animation} 80s linear`}
        fontSize={{ base: 'sm', lg: '4xl' }}
        fontFamily={'Star Jedi'}
        textColor={colors.red}
        position='relative'
        flexDir={'column'}
        textAlign={'center'}
        pt={20}
      >
        <Text fontSize={{ base: 'sm', lg: '4xl' }} textColor={colors.yellow}>
          My Excitement for the Senior Frontend Developer Position at JAKALA
        </Text>

        <Text pb={48}>
          I recently had the pleasure of interviewing for the{' '}
          <Text as='span' color={colors.yellow}>
            Senior Frontend Developer role
          </Text>{' '}
          at{' '}
          <Text as='span' color={colors.yellow}>
            JAKALA
          </Text>
          , and I am excited to share how the experience has further fueled my
          enthusiasm for this opportunity. From the moment I engaged with the
          team, I was impressed by the{' '}
          <Text as='span' color={colors.yellow}>
            professionalism
          </Text>{' '}
          and{' '}
          <Text as='span' color={colors.yellow}>
            friendliness
          </Text>{' '}
          that defined our conversation. This positive impression was further
          reinforced when I received the assignment in less than{' '}
          <Text as='span' color={colors.yellow}>
            24 hours
          </Text>
          , reflecting JAKALA’s{' '}
          <Text as='span' color={colors.yellow}>
            clear vision
          </Text>{' '}
          and{' '}
          <Text as='span' color={colors.yellow}>
            well-organized
          </Text>{' '}
          approach to hiring. The assignment involved creating a{' '}
          <Text as='span' color={colors.yellow}>
            website
          </Text>{' '}
          that connects with a{' '}
          <Text as='span' color={colors.yellow}>
            Star Wars API
          </Text>{' '}
          to fetch data, a task that I found both{' '}
          <Text as='span' color={colors.yellow}>
            creative
          </Text>{' '}
          and{' '}
          <Text as='span' color={colors.yellow}>
            inspiring
          </Text>
          . It allowed me to showcase my skills in{' '}
          <Text as='span' color={colors.yellow}>
            JavaScript
          </Text>
          ,{' '}
          <Text as='span' color={colors.yellow}>
            React
          </Text>
          , and{' '}
          <Text as='span' color={colors.yellow}>
            Next.js
          </Text>{' '}
          while embracing the thematic challenge. I was particularly thrilled to
          incorporate a{' '}
          <Text as='span' color={colors.yellow}>
            motivation letter page
          </Text>{' '}
          within the site, demonstrating my alignment with JAKALA’s{' '}
          <Text as='span' color={colors.yellow}>
            values
          </Text>{' '}
          and objectives.
          <Text as='span' color={colors.yellow}>
            JAKALA’s commitment
          </Text>{' '}
          to leveraging{' '}
          <Text as='span' color={colors.yellow}>
            data
          </Text>
          ,{' '}
          <Text as='span' color={colors.yellow}>
            AI
          </Text>
          , and{' '}
          <Text as='span' color={colors.yellow}>
            innovative technology
          </Text>{' '}
          to create{' '}
          <Text as='span' color={colors.yellow}>
            transformative
          </Text>{' '}
          and{' '}
          <Text as='span' color={colors.yellow}>
            meaningful experiences
          </Text>{' '}
          aligns seamlessly with my own professional philosophy. I am eager to
          bring my expertise and passion for{' '}
          <Text as='span' color={colors.yellow}>
            frontend development
          </Text>{' '}
          to JAKALA, contributing to projects that drive both{' '}
          <Text as='span' color={colors.yellow}>
            technological advancement
          </Text>{' '}
          and{' '}
          <Text as='span' color={colors.yellow}>
            positive societal impact
          </Text>
          . In summary, my interview experience has only deepened my enthusiasm
          for the{' '}
          <Text as='span' color={colors.yellow}>
            Senior Frontend Developer position
          </Text>{' '}
          at{' '}
          <Text as='span' color={colors.yellow}>
            JAKALA
          </Text>
          . I am excited about the possibility of joining a team that shares my
          commitment to{' '}
          <Text as='span' color={colors.yellow}>
            excellence
          </Text>
          ,{' '}
          <Text as='span' color={colors.yellow}>
            innovation
          </Text>
          , and making a difference in the world.
        </Text>
      </Flex>
    </Flex>
  )
}

export default MotivationLetter
