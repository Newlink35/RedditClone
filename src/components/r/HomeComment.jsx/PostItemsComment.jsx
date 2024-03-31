import { Flex, Icon, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius } from 'react-icons/bi';
import { BsChat } from 'react-icons/bs';
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";
import { useNavigate } from 'react-router-dom';




function PostItemsComment(props) {

    const { colorMode } = useColorMode();


    const navigate = useNavigate();
    const { post } = props;
    const { fetchData } = props;
    const userName = JSON.parse(sessionStorage.getItem("userName"));

    // This is for updating post
    async function handleUpVote(x) {
        try {

            const token = JSON.parse(sessionStorage.getItem("userToken"))
            console.log(token);
            const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/like/${x}`,
                {
                    "hello": "hello"
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    projectID: 'g4hvu8o4jh5h',
                }
            }
            )
            fetchData(x)
            console.log(response);
        } catch (error) {

            console.log("this is errora", error);
        }
    }

    // This is for downvoting votes
    async function downvote(x) {

        try {

            const token = JSON.parse(sessionStorage.getItem("userToken"))
            console.log(token);
            console.log(x);
            const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/like/${x}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h',
                    }
                }
            )
            console.log("This is the response", response);
            fetchData(x);
        } catch (error) {
            console.log(error);

        }
    }



    //end

    return (
        <>
            {post ? <Flex
                border="1px solid"
                bg={colorMode === "dark" ? "#161617" : "white"}
                borderColor={colorMode === "dark" ? "gray.800" : "white"}
                borderRadius="4px 4px 0px 0px"
            >
                <Flex
                    direction="column"
                    align="center"
                    p={2}
                    width="40px"
                    borderRadius="0">
                    <Icon as={IoArrowUpCircleSharp}
                        fontSize={22}
                        cursor="pointer"
                        onClick={() => handleUpVote(post._id)} />
                    <Text fontSize="9pt">
                        {post?.likeCount}
                    </Text>
                    <Icon
                        as={IoArrowDownCircleOutline}
                        fontSize={22}
                        color="#4379ff"
                        cursor="pointer"
                        onClick={() => downvote(post._id)}
                    />


                </Flex>
                <Flex direction="column" width="100%">
                    <Stack spacing={1} p="10px">
                        <Stack
                            direction="row"
                            spacing="0.6"
                            align="center"
                            fontSize="9pt"
                        >
                            {/* <p>Home page check</p> */}
                            <Text>Posted by u/{post.author.name}{" "}
                                from {post.channel ? post.channel.name : "No Channel Found"}</Text>
                        </Stack>
                        <Text
                            fontSize="12pt"
                            fontWeight={600}>{post.title}
                        </Text>
                        <Text fontSize="12pt">
                            {post.content}
                        </Text>

                        <Flex justify="center"
                            align="center"
                            p={2}>
                            {post.images && post.images.length > 0 && <Image src={post.images} maxHeight="460px" alt="Post Image" />}
                        </Flex>


                    </Stack>
                    <Flex ml={1} mb={0.5} color="gray.500">

                        <Flex align="center"
                            onClick={() => handleCommentClick(post)}
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                            cursor="pointer">
                            <Icon as={BsChat} mr={2} />
                            <Text fontSize="9pt">
                                {post.commentCount}
                            </Text>
                        </Flex>

                        <Flex align="center"
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                            cursor="pointer">
                            <Icon as={IoArrowRedoOutline} mr={2} />
                            <Text fontSize="9pt">
                                Share
                            </Text>
                        </Flex>

                        <Flex align="center"
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                            cursor="pointer">
                            <Icon as={IoBookmarkOutline} mr={2} />
                            <Text fontSize="9pt">
                                {post.commentCount}
                            </Text>
                        </Flex>

                        {post.author.name === userName &&
                            <Flex
                                onClick={() => handleDelete(post._id)}
                                align="center"
                                p="8px 10px"
                                borderRadius={4}
                                _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                                cursor="pointer">
                                <Icon as={AiOutlineDelete} mr={2} />
                                <Text fontSize="9pt" >
                                    Delete
                                </Text>
                            </Flex>}

                        {post.author.name === userName &&
                            <Flex
                                onClick={() => HandleEdit(post._id)}
                                align="center"
                                p="8px 10px"
                                borderRadius={4}
                                _hover={{ bg: colorMode === "dark" ? "gray.800" : "gray.200" }}
                                cursor="pointer">
                                <Icon as={AiOutlineDelete} mr={2} />
                                <Text fontSize="9pt" >
                                    Edit
                                </Text>
                            </Flex>}
                    </Flex>
                </Flex>
            </Flex > : null
            }
        </>
    )
}

export default PostItemsComment
