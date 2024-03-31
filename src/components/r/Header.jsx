import { Box, Button, Flex, Icon, Image, Text, useColorMode } from '@chakra-ui/react'
import { FaReddit } from "react-icons/fa"
import React, { useEffect, useState } from 'react'
import useLoginStore from '../../store/Authentication/loginstate';
import useCommunityCreation from '../../store/Authentication/communityCreation';
import axios from 'axios';

function Header({ communityName }) {

    const { colorMode } = useColorMode();

    const [communityNamea, setCommunityNamea] = useState();


    //This is I am creating for community creatiion menuitem
    // getCommunityDetails("hi");
    let idd = JSON.parse(localStorage.getItem("Comid"));
    console.log("This is add", idd);


    const [isJoined, setIsJoined] = useState(false)

    return (
        <Flex
            direction="column"
            width="100%"
            height="146px"
        >


            <Box
                height="50%"
                bg="blue.400"
            />

            <Flex
                justify="center"
                bg={colorMode === "dark" ? "#161617" : "gray.100"}
                flexGrow={1}
            >
                <Flex width="95%"
                    maxWidth="860px"
                >
                    {false ? "image" : (
                        <Icon as={FaReddit}
                            fontSize={64}
                            position="relative"
                            top={-3}
                            color="blue.500"
                            border="4px solid white"
                            borderRadius="50%"
                        />
                    )}
                    <Flex padding="10px 16px">
                        <Flex direction="column" mr={6}>
                            <Text
                                fontWeight={800}
                                fontSize="16pt">
                                {communityName?.data?.data.name}
                            </Text>
                            <Text
                                fontWeight={600}
                                fontSize="10pt"
                                color="gray.400">
                                r/{communityName?.data?.data.name}
                            </Text>
                        </Flex>
                        <Button
                            variant={isJoined ? "outline" : "solid"}
                            height="30px"
                            pr={6}
                            pl={6}
                        >
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    </Flex>
                </Flex>
            </Flex >
        </Flex >
    )
}

export default Header
