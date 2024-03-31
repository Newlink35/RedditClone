import { Box, Button, Divider, Flex, Icon, Stack, Text, useColorMode } from '@chakra-ui/react'
import moment from 'moment';
import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { RiCakeLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom';
import useCreatePost from '../../store/Authentication/createPost';


function About({ findPosts }) {




    const { createPostBtn, setCreatePostBtn } = useCreatePost();
    const { colorMode } = useColorMode();


    function handleOnClick() {
        console.log("hi");
        setCreatePostBtn("hi")
    }
    return (
        <Box
            position="sticky"
            top="14px">
            <Flex
                justify="space-between"
                align="center"
                bg={colorMode === "dark" ? "gray.800" : "blue.400"}
                color="white"
                p={3}
                borderRadius="4px 4px 0px 0px">
                <Text fontSize="10pt" fontWeight={700}>
                    About Community
                </Text>
                <Icon as={HiOutlineDotsHorizontal} />
            </Flex>
            <Flex direction="column"
                p={3}
                bg={colorMode === "dark" ? "#161617" : "white"}
                borderRadius="0px 0px 4px 4px"
            >
                <Stack>
                    <Flex
                        width="100%"
                        p={2}
                        fontSize="10pt"
                        fontWeight={700}>
                        <Flex direction="column" flexGrow={1}>
                            <Text>{findPosts ? findPosts : 0}</Text>
                            <Text>Post</Text>
                        </Flex>
                        <Flex direction="column" flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider />

                    {/* link */}
                    <Button mt={3}
                        height="30px"
                        onClick={handleOnClick}
                    > Create Post</Button>
                </Stack>
            </Flex>
        </Box >
    )
}

export default About
