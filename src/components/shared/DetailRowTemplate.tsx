import { useColor } from '@/shared/hooks/use-color.hook'
import { Flex } from '@chakra-ui/react'
import React, { FunctionComponent, useCallback } from 'react'
import Spinner from './Spinner'

type Props = {
  title: string
  value: string[]
}

const DetailRowTemplate: FunctionComponent<Props> = ({ title, value }) => {
  const colors = useColor()
  const replaceHttpsWithUnknown = useCallback((values: string[]): string[] => {
    const processedValues = values?.map((value) =>
      value?.includes('https') ? 'unknown' : value
    )
    const allUnknown = processedValues?.every((value) => value === 'unknown')
    return allUnknown ? ['unknown'] : processedValues
  }, [])
  const processedValue = replaceHttpsWithUnknown(value)
  if (!value) {
    return (
      <Flex w={16} h={16}>
        <Spinner />
      </Flex>
    )
  }

  return (
    <Flex
      flexDir={'row'}
      fontFamily={'Star Jedi'}
      w={'100%'}
      px={8}
      py={2}
      fontSize={{ base: 'xx-small', md: 'md' }}
    >
      <Flex textColor={colors.red} w={{ base: '40%', lg: '50%' }} gap={2}>
        {value.length > 1 && <Flex>{value.length}</Flex>} {title} :
      </Flex>
      <Flex
        flexDir={'column'}
        textColor={colors.yellow}
        w={{ base: '60%', lg: '50%' }}
        overflow={'scroll'}
        px={1}
        maxH={processedValue.length > 3 ? '80px' : 'auto'}
        css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {processedValue.length === 0 ? (
          <Flex>None</Flex>
        ) : processedValue.length > 1 ? (
          processedValue.map((item, index) => (
            <Flex
              key={index}
              mb={1}
              w={'100%'}
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
            >
              - {item}
            </Flex>
          ))
        ) : (
          <Flex
            maxH={'80px'}
            overflow={'scroll'}
            w={'100%'}
            css={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {processedValue[0]}
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default DetailRowTemplate
