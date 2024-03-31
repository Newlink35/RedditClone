import { Box, Flex, SkeletonCircle, SkeletonText, Stack, Text, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import CommentInput from './CommentInput';
import CommentItem from './CommentItem';
import axios from 'axios';

function Comments({ fetchData, postId }) {


    const [comments, setComments] = useState([]);
    const [commentsText, setCommentsText] = useState();
    const [fetchLoading, setFetchLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);

    const { colorMode } = useColorMode();


    async function OnCreateComment() {

    }

    async function onDeleteComments() {

    }

    async function getPostComments(postId) {
        try {
            console.log(postId);
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            let response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            console.log(response.data.data);
            response = response.data.data.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
            setCommentsText(response);
            // fetchData(postId);
        } catch (error) {
            console.log(error);
        }
    }

    // This use effect is effective whenever there is fetch data call going to the parent
    useEffect(() => {
        getPostComments(postId);
    }, [fetchData])


    return (
        <Box
            bg={colorMode === "dark" ? "#161617" : "white"}
            borderRadius="0px 0px 4px 4px">
            <Flex
                direction="column"
                pl={10}
                pr={4}
                mb={6}
                fontSize="10pt"
                width="100%">
                <CommentInput
                    fetchData={fetchData}
                    postId={postId}
                    createLoading={createLoading}
                    OnCreateComment={OnCreateComment}
                />
            </Flex>
            <Stack spacing={6} p={2}>
                {false ? (
                    <>
                        {[0, 1, 2].map((item) => (
                            <Box key={item} padding="6" bg="white">
                                <SkeletonCircle size="10" />
                                <SkeletonText mt="4" noOfLines={2} spacing="4" />
                            </Box>
                        ))}
                    </>
                ) : (
                    <>{
                        true ? (
                            commentsText?.map((details) => {
                                return (
                                    <CommentItem
                                        getPostComments={getPostComments}
                                        details={details}
                                    />
                                )
                            })


                        ) : (
                            <Flex
                                direction="column"
                                justify="center"
                                align="center"
                                borderTop="1px solid"
                                borderColor={colorMode === "dark" ? "gray.800" : "white"}
                                p={20}
                            >
                                <Text fontWeight={700} opacity={0.3}>
                                    No Comments Yet
                                </Text>
                            </Flex>
                        )
                    }
                    </>
                )
                }
            </Stack>
        </Box>
    )
}

export default Comments
