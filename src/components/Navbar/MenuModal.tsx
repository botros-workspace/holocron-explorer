import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React, { FunctionComponent, useCallback, useState } from 'react'
import MenuItemTemplate from './MenuItemTemplate'
import { useColor } from '@/shared/hooks/use-color.hook'
import { MenuItemAttributes } from '@/shared/interfaces/MenuItemAttributes'

const MenuModal: FunctionComponent = () => {
  const colors = useColor()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMenuButtonHovered, setIsMenuButtonHovered] = useState(false)
  const [isCloseButtonHovered, setIsCloseButtonHovered] = useState(false)
  const [menuItemsArray, setMenuItemsArray] = useState<MenuItemAttributes[]>([
    { id: 1, name: 'Home', link: '/', delay: 0, isVisible: false },
    { id: 2, name: 'Films', link: '/films', delay: 60, isVisible: false },
    {
      id: 3,
      name: 'Characters',
      link: '/characters',
      delay: 120,
      isVisible: false,
    },
    { id: 4, name: 'Planets', link: '/planets', delay: 180, isVisible: false },
    { id: 5, name: 'Species', link: '/species', delay: 240, isVisible: false },
    {
      id: 6,
      name: 'Vehicles',
      link: '/vehicles',
      delay: 300,
      isVisible: false,
    },
    {
      id: 7,
      name: 'Star ships',
      link: '/starships',
      delay: 360,
      isVisible: false,
    },
    {
      id: 8,
      name: 'Motivation letter',
      link: '/motivation-letter',
      delay: 420,
      isVisible: false,
    },
  ])
  const handleClose = () => {
    const maxDelay = Math.max(...menuItemsArray.map((item) => item.delay))
    menuItemsArray.forEach((item) => {
      let timeUntilHide = maxDelay - item.delay
      if (item.id !== 1) timeUntilHide + 200
      setTimeout(() => {
        setMenuItemsArray((prevState) =>
          prevState.map((menuItem) =>
            menuItem.id === item.id
              ? { ...menuItem, isVisible: false }
              : menuItem
          )
        )
      }, timeUntilHide)
    })

    setTimeout(() => {
      onClose()
    }, maxDelay + 300)
  }
  const setVisible = useCallback((id: number) => {
    setMenuItemsArray((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return { ...item, isVisible: true }
        }
        return item
      })
    )
  }, [])
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
      <Modal isOpen={isOpen} onClose={handleClose}>
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
                    onClose={handleClose}
                    setVisible={setVisible}
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
