import { Button, Flex, Input, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useSignUpStore from '../../../store/Authentication/signupstate';
import useLoginStore from '../../../store/Authentication/loginstate';

import axios from 'axios';
import useIsLoggedInStore from '../../../store/Authentication/authenticationstore';

function AuthLoginInputs() {

    const { colorMode, toggleColorMode } = useColorMode();

    const { signInButton, setSigninButton } = useSignUpStore();
    const { loginButton, setLoginButton } = useLoginStore();


    // This is global varibale and it will check the state and can be used for protected routes
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
    console.log(isLoggedIn);
    //isloggedin part ends here 

    //This is the state to find the status of the message 
    const [message, setMessage] = useState('')
    //message parts ends here 

    //loading state starts here 
    const [loading, setLoading] = useState(false)
    //loading state ends here 



    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    })




    //Api Logic  
    async function getLoginDone() {
        try {
            setLoading(true)
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/user/login`,
                {
                    "email": loginForm.email,
                    "password": loginForm.password,
                    "appType": "reddit",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'g4hvu8o4jh5h',
                    }
                },
            )
            console.log(response);
            if (response.data.status === "success") {
                setMessage(response.data.status)
                setLoading(false)
            }
            const token = response.data.token;
            if (token) {
                setLoading(false)
                sessionStorage.setItem("userToken", JSON.stringify(token));
                sessionStorage.setItem("userName", JSON.stringify(response.data.data.name))
                sessionStorage.setItem("userEmail", JSON.stringify(response.data.data.email))
                sessionStorage.setItem("userIdPer", response.data.data._id)
            }
        } catch (error) {

            console.log(error);
            if (error.response.data.message === "Incorrect EmailId or Password") {
                setMessage("Incorrect EmailId or Password");
                setLoading(false)
                console.log(message);
            }
        }
    }
    //Api logic ends here ...

    //Here changing to login view
    function changeToLogin() {

        setSigninButton(true)
        setLoginButton(false)
    }
    //Login view ends here

    function onChange(event) {
        const { value } = event.target;
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: value
        }))
        console.log(event.target.name);
    }

    function onSubmit(event) {
        event.preventDefault();
        getLoginDone();
    }

    useEffect(() => {
        if (message === "success") {
            setLoginButton(false);
            setIsLoggedIn(true);
        }
    }, [message])

    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            mt={4}
        >
            <form onSubmit={onSubmit}>
                <Input name='email'
                    required
                    placeholder='email'
                    onChange={onChange}
                    type='email'
                    fontSize="10pt"
                    mb={2}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: colorMode === "dark" ? "black" : 'white',
                        border: '1px solid',
                        borderColor: 'blue.500',
                    }}
                    _focus={{
                        outline: "none",
                        bg: colorMode === "dark" ? "black" : 'white',
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    bg={colorMode === "dark" ? 'black' : "gray.50"}
                />

                <Input name='password'
                    required
                    type='password'
                    placeholder='password'
                    onChange={onChange}
                    fontSize="10pt"
                    mb={2}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: 'white',
                        bg: colorMode === "dark" ? 'black' : "white",
                        borderColor: 'blue.500',
                    }}
                    _focus={{
                        outline: "none",
                        bg: colorMode === "dark" ? 'black' : "white",
                        border: "1px solid",
                        borderColor: "blue.500",
                    }}
                    bg={colorMode === "dark" ? 'black' : "gray.50"}
                />
                {message === "Incorrect EmailId or Password" && <Text textAlign="center" color="red" fontSize="10pt">Incorrect EmailId or Password</Text>}
                {message === "success" && <Text textAlign="center" color="green" fontSize="10pt">Logged In</Text>}
                <Button

                    width="100%"
                    height="36px"
                    mt={2}
                    mb={2}
                    type='submit'
                    isLoading={loading}
                >
                    Login
                </Button>

                <Flex fontSize="9pt"
                    justifyContent="center"
                >
                    <Text
                        mr={1}>New here?</Text>
                    <Text
                        color="blue.500"
                        fontWeight={700}
                        cursor="pointer"
                        onClick={changeToLogin}>SIGN UP</Text>

                </Flex>
            </form>


        </Flex>
    );
}

export default AuthLoginInputs
