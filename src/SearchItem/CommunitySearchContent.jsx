import { Flex, Icon, Stack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { BsChat } from 'react-icons/bs'
import { CiEdit } from 'react-icons/ci'
import { IoArrowUpCircleSharp, IoBookmarkOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

function CommunitySearchContent({ details }) {
    console.log(details);
    const { colorMode } = useColorMode();

    const navigate = useNavigate();
    return (
        <Flex border="1px solid"
            bg={colorMode === "dark" ? "black" : "white"}
            borderColor={colorMode === "dark" ? "black" : "gray.300"}
            borderRadius={4}
            _hover={{ borderColor: "gray.500" }}
            cursor="pointer"
            onClick={() => navigate(`../../communitypage/${details._id}`)}
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
                        >Posted by u/{details.owner.name}{" "}</Text>
                    </Stack>
                    <Text
                        fontSize="12pt"
                        fontWeight={600}>{details.name}
                    </Text>
                    <Text fontSize="12pt">
                        {details.owner.email}
                    </Text>




                </Stack>

            </Flex>
        </Flex >
    )
}

export default CommunitySearchContent
