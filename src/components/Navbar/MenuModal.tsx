import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { FunctionComponent, useState } from 'react'
import MenuItemTemplate from './MenuItemTemplate'
import { useColor } from '@/shared/hooks/use-color.hook'

const MenuModal: FunctionComponent = () => {
  const colors = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMenuButtonHovered, setIsMenuButtonHovered] = useState(false)
  const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false)
  const menuItemsArray = [
    { name: 'Home', link: '/', delay: 0 },
    { name: 'Characters', link: '/characters', delay: 100 },
    { name: 'Planets', link: '/planets', delay: 200 },
    { name: 'Films', link: '/films', delay: 300 },
    { name: 'Species', link: '/species', delay: 400 },
    { name: 'Vehicles', link: '/vehicles', delay: 500 },
    { name: 'Star ships', link: '/starships', delay: 600 },
    { name: 'Motivation letter', link: '/motivation-letter', delay: 700 },
  ]

  return (
    <>
      <Flex
        flexDir={'column'}
        gap={isMenuButtonHovered || isOpen ? 0 : 2}
        transition={'gap 0.3s'}
        h={12}
        justifyContent={'center'}
        cursor={'pointer'}
        onMouseEnter={() => setIsMenuButtonHovered(true)}
        onMouseLeave={() => setIsMenuButtonHovered(false)}
        onClick={onOpen}
      >
        <Flex
          h={1}
          w={8}
          bg={colors.red}
          borderRadius={'full'}
          transform={
            isMenuButtonHovered || isOpen
              ? 'rotate(45deg)translateY(2.5px)'
              : 'rotate(0deg)'
          }
          transition={'transform 0.3s'}
        />
        <Flex
          h={1}
          w={8}
          bg={colors.yellow}
          borderRadius={'full'}
          transform={
            isMenuButtonHovered || isOpen
              ? 'rotate(-45deg)translateY(-2.5px)'
              : 'rotate(0deg)'
          }
          transition={'transform 0.3s'}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderWidth={1}
          borderRadius={'lg'}
          borderColor={colors.red}
          justifyContent={'center'}
          alignItems={'center'}
          bg={'#171717'}
          w={'90%'}
        >
          <ModalBody w={'100%'}>
            <Flex gap={4} flexDir={'column'} py={8} w={'100%'}>
              {menuItemsArray.map((singleItem) => {
                return (
                  <MenuItemTemplate
                    singleItem={singleItem}
                    onClose={onClose}
                    key={singleItem.name}
                  />
                )
              })}
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent={'flex-end'} w={'100%'}>
            <Flex
              borderWidth={1}
              borderRadius={'lg'}
              borderColor={colors.red}
              fontSize={{ base: 'sm', md: 'sm' }}
              fontFamily={'Star Jedi'}
              onClick={onClose}
              onMouseLeave={() => {
                setIsCloseButtonHovered(false)
              }}
              onMouseEnter={() => {
                setIsCloseButtonHovered(true)
              }}
              h={8}
              w={20}
              justifyContent={'center'}
              alignItems={'center'}
              bg={'#171717'}
              boxShadow={
                isCloseButtonHovered ? '0px 4px 30px rgba(255, 48, 48, 1)' : ''
              }
              textColor={colors.red}
              cursor={'pointer'}
            >
              Close
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MenuModal
