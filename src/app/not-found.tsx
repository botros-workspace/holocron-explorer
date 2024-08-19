import { Flex, Text, Image, Box } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'
import '../global.css'
import Link from 'next/link'
import { useColor } from '@/shared/hooks/use-color.hook'
const NotFound: FunctionComponent = () => {
  const colors = useColor()
  return (
    <>
      <Flex
        w={'100vw'}
        h={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        className='not-found'
        flexDir={'column'}
        gap={40}
      >
        <Image
          src={'/notfound.jpg'}
          pos={'absolute'}
          alt='notfound'
          width={'100vw'}
          height={'100vh'}
          fit={'cover'}
        ></Image>
        <Box
          pos={'absolute'}
          top='0'
          left='0'
          right='0'
          bottom='0'
          bg={'rgba(0, 0, 0, 0.7)'}
          zIndex={2}
        />
        <Flex
          flexDir={'row'}
          width={'80%'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={44}
          fontSize={{ base: '2xl', md: '8xl' }}
        >
          <Box
            fontFamily={'Star Jedi'}
            width={'50%'}
            textColor={colors.red}
            zIndex={2}
          >
            The Force seems to have led you astray. Perhaps this page is hidden
            in the Unknown Regions, or maybe it has been lost like Alderaan...
            <Text textColor={colors.yellow}>But fear not, young Padawan!</Text>
            Use the navigation below to return to the main galaxy, head back to
            the Home page to continue your journey. May the Force be with you.
          </Box>
        </Flex>
        <Link
          href={'/'}
          style={{
            zIndex: 10,
            textDecoration: 'none',
          }}
        >
          <Box
            px={24}
            py={16}
            bg={'#171717'}
            borderRadius={'5%'}
            textAlign={'center'}
            borderColor={colors.red}
            boxShadow={`0px 4px 30px ${colors.red}`}
            fontSize={{ base: 'md', md: '2xl' }}
            cursor={'pointer'}
            zIndex={10}
            textColor={colors.red}
            fontFamily={'Star Jedi'}
          >
            Return home
          </Box>
        </Link>
      </Flex>
    </>
  )
}

export default NotFound
