import { SignIn } from '../features/sign-in/components/SignIn'
import { Presentation } from '../components/presentation/components/Presentation'

export const SignInPage: React.FC = () => {
  return (
    <>
      <Presentation />
      <SignIn />
    </>
  )
}
