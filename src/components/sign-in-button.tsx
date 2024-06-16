import { signIn } from '@/auth'
import { NextPage } from 'next'
import { Button } from './ui/button'

interface Props {}

const SignInButton: NextPage<Props> = ({}) => {
  return <form action={async()=>{
    "use server"
    await signIn();
  }}>
    <Button type='submit'>Sign In</Button>
  </form>
}

export default SignInButton