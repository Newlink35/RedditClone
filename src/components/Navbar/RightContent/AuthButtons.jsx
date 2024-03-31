import { Button, background } from '@chakra-ui/react'
import React from 'react'
import useSignUpStore from '../../../store/Authentication/signupstate'
import useLoginStore from '../../../store/Authentication/loginstate'



function AuthButtons() {
    const { signInButton, setSigninButton } = useSignUpStore();
    const { loginButton, setLoginButton } = useLoginStore();
    return (
        <>
            <Button
                variant="outline"
                height="28px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                mr={2}
                onClick={() => setLoginButton(true)}
            >Login</Button>
            <Button
                height="28px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                mr={2}
                onClick={() => setSigninButton(true)}
            > Signup</Button >

        </>
    )
}

export default AuthButtons
