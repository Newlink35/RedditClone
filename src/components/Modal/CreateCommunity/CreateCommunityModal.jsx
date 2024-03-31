import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Box,
    Input,
    Divider,
    Checkbox,
    Stack,
    Flex,
    Icon,
} from '@chakra-ui/react'
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs"
import { HiLockClosed } from "react-icons/hi"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateCommunityModal({ open, handleClose }) {
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsremaining] = useState(21);
    const [communityType, setCommunityType] = useState("public");
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        if (event.target.value.length > 21) {
            return;
        }
        setCommunityName(event.target.value);
        setCharsremaining(21 - event.target.value.length);
        //recalculate chars we have left
    };
    function onCommunityTypeChange(event) {
        setCommunityType(event.target.name)
    }
    //Get the token here 
    const token = JSON.parse(sessionStorage.getItem("userToken"))
    console.log(token);
    var formData = new FormData();



    // Api creating to create a community
    async function handleCreateCommunity() {
        try {
            setLoading(true)

            formData.append("name", communityName);
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/channel/`,

                formData
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            setLoading(false)
            return response;
        } catch (error) {
            setLoading(false)
            return error;
        }
    }
    const navigate = useNavigate();

    async function handleCommunityButtonClick() {
        //First we will check whether its meeting the criteria
        if (communityName.length < 3) {
            setMessage(
                `comunity Names Must be between 3-21 characters`
            )
            return;
        }
        // Validate the community
        const result = await handleCreateCommunity(communityName);
        console.log(result);
        //If name already exists then there will be error hence we will show the error
        if (communityName)
            if (result?.response?.data?.message === 'Channel with this name already exists') {
                setMessage(result?.response?.data?.message);
            } else if (result?.data?.status === "success") {
                setMessage(result)
                navigate(`communitypage/${result?.data?.data._id}`)
                handleClose();
            }
    }

    return (
        <>

            <Modal isOpen={open} onClose={handleClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        display='flex'
                        flexDirection="column"
                        fontSize={15}
                        padding={3}
                    >
                        Create a community
                    </ModalHeader>
                    <Box pr={3} pl={3}>
                        <Divider />
                        <ModalCloseButton />
                        <ModalBody
                            display="flex"
                            flexDirection="column"
                            padding="10px 0px"
                        >
                            <Text fontWeight={600} fontSize={15}>
                                Name
                            </Text>
                            <Text fontSize={11} color="gray.500">
                                Community was including capitalization cannot be changed
                            </Text>
                            <Text position="relative"
                                top="28px"
                                left="10px"
                                width="20px"
                                color="gray.400">
                                r/
                            </Text>
                            <Input
                                position="relative"
                                value={communityName}
                                size="sm"
                                pl="22px"
                                onChange={handleChange} />
                            <Text
                                color={charsRemaining === 0 ? "red" : "gray.500"}
                                fontSize="9pt">
                                {charsRemaining} Characters remaining
                            </Text>

                            <Text fontSize="9pt" color="red" pt={1} >
                                {/* {message} */}
                                {message === "Channel with this name already exists" ? message : null}
                                {message === "comunity Names Must be between 3-21 characters" ? message : null}

                            </Text>

                            <Box mt={4} mb={4}>
                                <Text fontWeight={600}
                                    fontSize={15}>
                                    Community Type
                                </Text>
                                {/* <CheckBox /> */}
                                <Stack spacing={2}>
                                    <Checkbox
                                        name='public'
                                        isChecked={communityType === "public"}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Public
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Anyone Can view, post, and comment to this community
                                            </Text>
                                        </Flex>

                                    </Checkbox>
                                    <Checkbox
                                        name='restricted'
                                        isChecked={communityType === "restricted"}
                                        onChange={onCommunityTypeChange}
                                    > <Flex align="center" >
                                            <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                                            <Text fontSize="10pt" mr={1}>
                                                Restricted
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Anyone Can view this, but only approved users can post
                                            </Text>
                                        </Flex>

                                    </Checkbox>
                                    <Checkbox
                                        name='private'
                                        isChecked={communityType === "private"}
                                        onChange={onCommunityTypeChange}
                                    >
                                        <Flex align="center">
                                            <Icon as={HiLockClosed} color="gray.500" mr={2} />

                                            <Text fontSize="10pt" mr={1}>
                                                Private
                                            </Text>
                                            <Text fontSize="8pt" color="gray.500" pt={1}>
                                                Only approved users can view and submit to this community
                                            </Text>
                                        </Flex>
                                    </Checkbox>
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>


                    <ModalFooter
                        bg="gray.100"
                        borderRadius="0px 0px 10px 10px">
                        <Button
                            variant="outline"
                            height="30px"
                            mr={3}
                            onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button height="30px"
                            onClick={handleCommunityButtonClick} isLoading={loading}>Create Community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}

export default CreateCommunityModal
