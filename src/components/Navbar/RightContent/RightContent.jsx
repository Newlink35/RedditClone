import { Flex } from '@chakra-ui/react'
import useIsLoggedInStore from '../../../store/Authentication/authenticationstore'
import useLoginStore from '../../../store/Authentication/loginstate'
import useSignUpStore from '../../../store/Authentication/signupstate'
import AuthModal from '../../Modal/Authsignup/AuthModal'
import LoginModal from '../../Modal/LoginAuth/LoginModal'
import AuthButtons from './AuthButtons'
import Icons from './Icons'
import { UserMenu } from './UserMenu'

function RightContent() {
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
    const { signInButton, setSigninButton } = useSignUpStore();
    const { loginButton, setLoginButton } = useLoginStore();

    function handleLogOut() {
        setIsLoggedIn(false);
        sessionStorage.removeItem("userToken")
    }
    return (
        <>
            <AuthModal />
            <LoginModal />
            <Flex justify="center" align="center">
                {isLoggedIn ?
                    <Icons /> : <AuthButtons />}
                    <UserMenu user={isLoggedIn}/>
            </Flex>
        </>
    )
}

export default RightContent
