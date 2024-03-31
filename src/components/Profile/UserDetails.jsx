import { Box, Button, Flex, Icon, Image, Stack, Text, useColorMode } from '@chakra-ui/react'
import { FaCircle, FaShirt } from 'react-icons/fa6'
import { LuCakeSlice } from 'react-icons/lu'
import React from 'react'
import useCreatePost from '../../store/Authentication/createPost';
import { useNavigate } from 'react-router-dom';

function UserDetails({ userDetails }) {

    console.log(userDetails);

    const { colorMode } = useColorMode();


    function formatDate(timeStamp) {
        const date = new Date(timeStamp);
        const option = { year: "numeric", month: 'long', day: "numeric" };
        const formattedDate = date.toLocaleDateString('en-US', option);
        return formattedDate;
    }

    const navigate = useNavigate();


    return (
        <>
            <Box bg={colorMode === "dark" ? "#1A1A1B" : "white"} color={colorMode === "dark" ? "gray.50" : "gray.600"} border="1px solid" borderColor="gray.300" borderRadius="4px" overflow="hidden" position="sticky" top="60px">

                <Box height="100px" bg="blue.400"></Box>

                <Box position="relative" >

                    <Flex width="100%" justify="center" align="center" position="absolute" top={-20}>
                        <Image src='/images/redditWhiteAvatar.png'
                            height="160px"
                            width="124px"
                        />
                    </Flex>

                    <Stack justify="center" align="center" gap={0} pt="80px" pr={2} pl={2} pb={2}>

                        <Text fontWeight={600} fontSize="18px">{userDetails.name}</Text>
                        <Text fontSize="10pt" color="gray.500">u/{userDetails.name}</Text>

                        <Flex bg="linear-gradient(90deg,#ec0623,#ff8717)" align="center" width="100%" borderRadius="20px" height="30px" mt={1} cursor="pointer">
                            <Icon as={FaShirt} fontSize="12pt" color="white" ml={3} />
                            <Text fontWeight={700} color="white" ml="42px">Choose Avatar</Text>
                        </Flex>

                        <Text fontWeight={600} mt={1}>Cake day</Text>
                        <Text fontSize="10pt" color="gray.500"> <Icon as={LuCakeSlice} color="blue.500" /> {formatDate(userDetails.createdAt)}</Text>

                        <Button onClick={() => navigate('../community/submit')} bg="blue.400" height="30px" width="100%" _hover={{ bg: "blue.300" }} mt={4} >Add a Post</Button>
                    </Stack>


                </Box>
            </Box>

        </>
    )
}

export default UserDetails
