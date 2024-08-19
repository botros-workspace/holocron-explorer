import React, { FunctionComponent, ReactNode } from 'react'
import NavbarMainContainer from '../Navbar/NavbarMainContainer'

type Props = {
  children: ReactNode
}

export const Layout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div>
      <NavbarMainContainer />
      <div>{children}</div>
    </div>
  )
}

export default Layout
