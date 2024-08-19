import { useColor } from '@/shared/hooks/use-color.hook'
import { Box, Flex, Image } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

const StarWarCustomBackgroundTemplate: FunctionComponent = () => {
  const colors = useColor()
  return (
    <>
      <Box
        pos={'absolute'}
        top='0'
        left='0'
        right='0'
        bottom='0'
        bg={'rgba(0, 0, 0, 0.7)'}
        zIndex={2}
      />
      <Image
        src='/content-section.jpg'
        alt='content-section-image'
        fit={'fill'}
        w={'100vw'}
        h={'100vh'}
      />

      <Flex
        pos={'absolute'}
        w={'100%'}
        h={'100%'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Flex
          w={{ base: '95%', md: '70%' }}
          h={{ base: '55%', md: '70%' }}
          alignItems={'center'}
          pos={'relative'}
        >
          <Flex
            w={{ base: '50%', md: '50%' }}
            h={{ base: '70%', md: '100%' }}
            borderRadius={'5%'}
            bg={colors.red}
            alignItems={'center'}
          >
            <Image
              src='/content-logo.png'
              w={{ base: '55%', md: '70%' }}
              h={{ base: '55%', md: '70%' }}
              alt='content-logo-image'
              fit={'contain'}
              ml={{ base: -4, md: -14 }}
            />
          </Flex>
        </Flex>
        <Flex
          pos={'absolute'}
          h={{ base: '35%', md: '65%' }}
          w={{ base: '70%', md: '50%' }}
          ml={{ base: 12, md: 40 }}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Image
            src='/content-section.jpg'
            alt='content-section-image'
            fit={'fill'}
            borderRadius={'5%'}
            w={'100%'}
            h={'100%'}
          />
        </Flex>
      </Flex>
    </>
  )
}

export default StarWarCustomBackgroundTemplate
