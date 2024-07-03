import Navbar from '@/components/navbar'
import { NextPage } from 'next'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const QuestionLayout: NextPage<Props> = ({children}) => {
  return <div>
    <Navbar/>
    {children}
  </div>
}

export default QuestionLayout