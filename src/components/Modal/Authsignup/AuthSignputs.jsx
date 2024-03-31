import React, { useEffect, useState } from 'react'
import useSignUpStore from '../../../store/Authentication/signupstate';
import useLoginStore from '../../../store/Authentication/loginstate';
import { Button, Flex, Input, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { getHeaderWithProjectId } from '../../utils/service';

function AuthSignputs() {
    const { signInButton, setSigninButton } = useSignUpStore();
    const { loginButton, setLoginButton } = useLoginStore();
    const [signupForm, setSignupForm] = useState({
        fullName: "",
        email: "",
        password: "",

    })
    const { colorMode, toggleColorMode } = useColorMode();

    //This is the state to find the status of the message 
    const [message, setMessage] = useState('')
    //message parts ends here 

    //loading state starts here 
    const [loading, setLoading] = useState(false)
    //loading state ends here 

    //Api Logic starts 

    async function getSignupDone() {

        try {
            setLoading(true)
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/user/signup`,
                {
                    "name": signupForm.fullName,
                    "email": signupForm.email,
                    "password": signupForm.password,
                    "appType": "reddit"
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'g4hvu8o4jh5h',
                    }
                },
            )

            console.log(response);
            setMessage(response.data.status)
            if (response.data.status == "success") {
                setLoading(false)
            }
        } catch (error) {
            if (error.response.data.message === "User already exists") {
                setLoading(false)
            }
            console.log(error.response.data.message);
            setMessage(error.response.data.message);
        }
    }

    //Api Logic Ends Here

    //Here changing to login view

    function changeToSignUp() {
        setSigninButton(false)
        setLoginButton(true)
    }
    //Login view ends here

    function onChange(event) {
        const { value } = event.target;
        setSignupForm(prev => ({
            ...prev,
            [event.target.name]: value
        }))
        console.log(event.target);
    }

    function onSubmit(event) {
        event.preventDefault();
        getSignupDone();
    }
    useEffect(() => {
        // This will be triggered whenever the message state is updated
        if (message === 'success') {
            setLoading(true)
            setSigninButton(false);
            setLoginButton(true);
        }
    }, [message]);


    return (
        <Flex
            direction="column"
            align="center"
            width="100%"
            mt={4}
        >
            <form onSubmit={onSubmit}>
                <Input name='fullName'
                    required
                    placeholder='Name'
                    onChange={onChange}
                    type='text'
                    fontSize="10pt"
                    mb={2}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: colorMode === "dark" ? 'black' : "white",
                        border: '1px solid',
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
                <Input name='email'
                    required
                    placeholder='email'
                    onChange={onChange}
                    type='email'
                    fontSize="10pt"
                    mb={2}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: colorMode === "dark" ? 'black' : "white",
                        border: '1px solid',
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

                <Input name='password'
                    required
                    type='password'
                    placeholder='password'
                    onChange={onChange}
                    fontSize="10pt"
                    mb={2}
                    _placeholder={{ color: "gray.500" }}
                    _hover={{
                        bg: colorMode === "dark" ? 'black' : "white",
                        border: '1px solid',
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
                {message === "User already exists" && <Text textAlign="center" color="red" fontSize="10pt">User Already Exist</Text>}
                {message === "success" && <Text textAlign="center" color="green" fontSize="10pt">Signed In</Text>}

                <Button
                    width="100%"
                    height="36px"
                    mt={2}
                    mb={2}
                    type='submit'
                    isLoading={loading}
                >
                    SignUp
                </Button>

                <Flex fontSize="9pt"
                    justifyContent="center"
                >

                    <Text
                        mr={1}>Already a redditor?</Text>
                    <Text
                        color="blue.500"
                        fontWeight={700}
                        cursor="pointer"
                        onClick={changeToSignUp}>Login</Text>
                </Flex>
            </form>


        </Flex>
    )
}

export default AuthSignputs;
