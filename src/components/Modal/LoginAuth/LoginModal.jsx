import {
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import React from 'react';
import useLoginStore from '../../../store/Authentication/loginstate';
import AuthLoginInputs from './AuthLoginInputs';

function LoginModal() {
    const { loginButton, setLoginButton } = useLoginStore();

    return (
        <>
            <Modal isOpen={loginButton} onClose={() => setLoginButton(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">Login</ModalHeader>
                    <ModalCloseButton onClose={() => setLoginButton(false)} />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center" >

                        <Flex direction="column"
                            align="center"
                            justify="center"
                            width="70%"
                        >


                            {/* <Oauth /> */}
                            <AuthLoginInputs />
                            {/* <ResetPasswords /> */}
                        </Flex>



                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default LoginModal
