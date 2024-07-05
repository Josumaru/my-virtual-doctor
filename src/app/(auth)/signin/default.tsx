import { NextPage } from 'next'
import { ReactNode, Suspense } from 'react'

interface Props {
    children: ReactNode
}

const AuthLayout: NextPage<Props> = ({children}) => {
  return <Suspense>{children}</Suspense>
}

export default AuthLayout