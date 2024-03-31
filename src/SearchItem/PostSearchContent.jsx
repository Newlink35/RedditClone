import { Flex, Icon, Stack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'
import { IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function PostSearchContent({ details }) {
    const { colorMode } = useColorMode();

    const navigate = useNavigate();
    console.log(details);
    return (
        <Flex border="1px solid"
            bg={colorMode === "dark" ? "black" : "white"}
            borderColor={colorMode === "dark" ? "black" : "gray.300"}
            borderRadius={4}
            cursor="pointer"
            onClick={() => { navigate(`../../comment/${details._id}`) }}
            _hover={{ borderColor: "gray.500" }}
        >

            <Flex direction="column" width="100%">
                <Stack spacing={1} p="10px">
                    <Stack
                        direction="row"
                        spacing="0.6"
                        align="center"
                        fontSize="9pt"
                    >
                        {/* <p>Home page check</p> */}
                        <Text
                            _hover={{ color: "blue.500" }}
                            cursor="pointer"
                        >Posted by u/{details?.author?.name}{" "}
                            from {details?.channel?.name}</Text>
                    </Stack>
                    <Text
                        fontSize="12pt"
                        fontWeight={600}>{details.title}
                    </Text>
                    <Text fontSize="12pt">
                        {details.content}
                    </Text>




                </Stack>
                <Flex ml={1} mb={0.5} color="gray.500">

                    <Flex align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                        cursor="pointer">
                        <Icon as={BsChat} mr={2} />
                        <Text fontSize="9pt">
                            {details.commentCount}
                        </Text>
                    </Flex>

                    <Flex align="center"
                        p="8px 10px"
                        borderRadius={4}
                        _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                        cursor="pointer">
                        <Icon as={IoBookmarkOutline} mr={2} />
                        <Text fontSize="9pt">
                            5
                        </Text>
                    </Flex>


                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostSearchContent
