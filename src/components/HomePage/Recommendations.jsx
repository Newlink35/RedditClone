import { Box, Button, Flex, Icon, Image, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Sample from './Sample';
import PageContent from '../Layout/PageContent';
import PageLoader from '../Posts/PageLoader/PageLoader';
import { Link, NavLink } from 'react-router-dom';
import { FaReddit } from 'react-icons/fa';

function Recommendations() {
    // Get community recommendation
    const [joined, setJoined] = useState(true);
    console.log(joined);
    const [communities, setCommunities] = useState(null);
    const [loading, setLoading] = useState(false);
    const [flow, setFlow] = useState(false);
    const [collapseButton, setCollapseButton] = useState(true)
    const { colorMode } = useColorMode();


    //This should come from zustand
    // const [communityStateValue, setCommunityStateValue] = useCommunity
    const x = 5;
    async function getCommunityRecommendation(x) {
        try {
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            let response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel?limit=1000`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                })
            let top20Communities = [];
            let a = 1
            for (let i = response.data.data.length - 1; a < x + 1; i--) {
                top20Communities.push(response.data.data[i]);
                a++
            }
            console.log(top20Communities);
            setCommunities(top20Communities)
        } catch (error) {
            console.log(error);
        }
    }

    function onJoinedButton(params) {
        setJoined(!joined)
        console.log(params);
    }


    useEffect(() => {
        getCommunityRecommendation(x);
    }, [])

    function handleOnClick() {
        getCommunityRecommendation(20);
        setCollapseButton(false);
    }

    function handleOnClickCollapse() {
        getCommunityRecommendation(5)
        setCollapseButton(true);

    }





    return (
        <Flex direction="column"

            bg={colorMode === "dark" ? "#1A1A1B" : "white"}
            borderRadius={4}
            border="1px solid"
            borderColor={colorMode === "dark" ? "gray.800" : "gray.300"}

        >
            <Flex align="flex-end"
                color="white"
                p="6px 10px"
                height="70px"
                borderRadius="4px 4px 8px 8px"
                fontWeight={700}
                bgImage="url(/images/recCommsArt.png)"
                backgroundSize="cover"
                bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)),
                url('images/recCommsArt.png')"
            >
                Top Communities</Flex>

            <Flex direction="column" >
                {
                    loading ? (
                        <Stack mt={2} p={3} >
                            <Flex justify="space-between" align="center">
                                <SkeletonCircle size="10" />
                                <Skeleton height="10px" width="70%" />
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <SkeletonCircle size="10" />
                                <Skeleton height="10px" width="70%" />
                            </Flex>
                            <Flex justify="space-between" align="center">
                                <SkeletonCircle size="10" />
                                <Skeleton height="10px" width="70%" />
                            </Flex>
                        </Stack>
                    ) : (
                        <>
                            {communities?.map((item, index) => (
                                <NavLink to={`/communitypage/${item._id}`}>
                                    <Flex
                                        position="relative"
                                        align="center"
                                        fontSize="10pt"
                                        borderTop="1px solid"
                                        borderColor={colorMode === "dark" ? "#343536" : "gray.300"}
                                        p="10px 12px"
                                        fontWeight={600}

                                    >
                                        <Flex width="80%"
                                            align="center">
                                            <Flex width="15%">
                                                <Text mr={2}>
                                                    {index + 1}
                                                </Text>
                                            </Flex>
                                            <Flex align="center"
                                                width="80%">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        borderRadius="full"
                                                        boxSize="28px"
                                                        mr={2} />
                                                ) : (
                                                    <Icon
                                                        as={FaReddit}
                                                        fontSize={30}
                                                        color="brand.100"
                                                        mr={2}
                                                    />
                                                )}
                                                <span
                                                    style={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis"
                                                    }}
                                                >
                                                    {`r/${item.name}`}
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Box
                                            position="absolute"
                                            right="10px"
                                        >

                                        </Box>
                                    </Flex>
                                </NavLink>
                            ))}
                            <Box p="10px 20px">
                                {collapseButton ? <Button onClick={handleOnClick} height="30px" width="100%">
                                    View More
                                </Button> : <Button onClick={handleOnClickCollapse} height="30px" width="100%">
                                    Collapse
                                </Button>}
                            </Box>
                        </>
                    )
                }
            </Flex>
        </Flex>
    )
}

export default Recommendations
