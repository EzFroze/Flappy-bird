import { SignIn } from '../features/sign-in/components/SignIn'
import { Presentation } from '../components/presentation/components/Presentation'
import { OAuth } from '../components/oauthButton/components/OAuth'

export const SignInPage: React.FC = () => {
  return (
    <>
      <Presentation />
      <OAuth />
      <SignIn />
    </>
  )
}
