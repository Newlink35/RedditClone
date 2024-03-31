import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Flex,

} from '@chakra-ui/react'
import useSignUpStore from '../../../store/Authentication/signupstate';
import AuthSignputs from './AuthSignputs';

function AuthModal() {



    const { signInButton, setSigninButton } = useSignUpStore();




    return (
        <>
            <Modal isOpen={signInButton} onClose={() => setSigninButton(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">SignUp</ModalHeader>
                    <ModalCloseButton onClose={() => setSigninButton(false)} />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center" >

                        <Flex direction="column"
                            align="center"
                            justify="center"
                            width="70%">


                            {/* <Oauth /> */}
                            <AuthSignputs />
                            {/* <ResetPasswords /> */}
                        </Flex>



                    </ModalBody>
                </ModalContent>
            </Modal >
        </>
    )
}

export default AuthModal
