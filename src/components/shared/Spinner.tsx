import { Image, keyframes } from '@chakra-ui/react'
import React, { FunctionComponent } from 'react'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner: FunctionComponent = () => {
  return (
    <Image
      w={'100%'}
      h={'100%'}
      src='/spinner.png'
      alt='loader'
      animation={`${rotate} 2s linear infinite`}
    />
  )
}

export default Spinner
