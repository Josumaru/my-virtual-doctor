import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const AuthLayout: NextPage<Props> = ({children}) => {
  return <div>{children}</div>
}

export default AuthLayout