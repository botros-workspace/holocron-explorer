import { useColor } from '@/shared/hooks/use-color.hook'
import { Flex, Link } from '@chakra-ui/react'

import router from 'next/router'
import React, { FunctionComponent, useEffect, useState } from 'react'

type Props = {
  singleItem: {
    name: string
    link: string
    delay: number
  }
  onClose: () => void
}

const MenuItemTemplate: FunctionComponent<Props> = ({
  singleItem,
  onClose,
}) => {
  const colors = useColor()
  const [isLinkHovered, setisLinkHovered] = useState(false)
  const [isLinkVisible, setIsLinkVisible] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLinkVisible(true)
    }, singleItem.delay)
    return () => clearTimeout(timer)
  }, [singleItem.delay])

  return (
    <Link
      href={singleItem.link}
      onMouseEnter={() => setisLinkHovered(true)}
      onMouseLeave={() => setisLinkHovered(false)}
      style={{
        textDecoration: 'none',
        boxShadow: 'none',
      }}
    >
      <Flex
        w={'100%'}
        bg={router.pathname === singleItem.link ? colors.red : '#171717'}
        _focus={{
          outline: 'none',
          boxShadow: 'none',
        }}
        borderWidth={1}
        borderRadius={'lg'}
        borderColor={colors.red}
        boxShadow={isLinkHovered ? '0px 4px 30px rgba(255, 48, 48, 1)' : ''}
        fontSize={{ base: 'sm', md: 'sm' }}
        textColor={router.pathname === singleItem.link ? 'white' : colors.red}
        fontFamily={'Star Jedi'}
        onClick={onClose}
        h={10}
        opacity={isLinkVisible ? 1 : 0}
        transition={'opacity 0.5s'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        {singleItem.name}
      </Flex>
    </Link>
  )
}

export default MenuItemTemplate
