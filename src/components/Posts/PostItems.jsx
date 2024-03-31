import { Flex, Icon, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius } from 'react-icons/bi';
import { BsChat } from 'react-icons/bs';
import {
    IoArrowDownCircle,
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";
import Posts from '../r/Posts';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci';
import useIsLoggedInStore from '../../store/Authentication/authenticationstore';
import useLoginStore from '../../store/Authentication/loginstate';

function PostItems(props) {

    const editHome = "EditHomePosts"
    const { isLoggedIn } = useIsLoggedInStore();
    const { setLoginButton } = useLoginStore()
    const { colorMode } = useColorMode();

    const { userId } = props;

    const { post } = props;

    const { profile } = props
    console.log(profile);
    console.log(post);



    const { getPostRandom } = props;


    const send = "sendToHome"

    console.log(getPostRandom);



    console.log("this is important", post);

    const userName = JSON.parse(sessionStorage.getItem("userName"));


    //This is for handle upvote

    async function handleUpVote(x) {

        try {
            if (!isLoggedIn) {
                setLoginButton(true)
            }

            const token = JSON.parse(sessionStorage.getItem("userToken"))
            console.log(token);
            console.log("This is xx", x);
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
            getPostRandom(x);
            console.log(response);
        } catch (error) {

            console.log("this is errora", error);
        }
    }

    // Logic of downvote starts here 
    async function downvote(x) {

        try {
            if (!isLoggedIn) {
                setLoginButton(true)
            }
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
            getPostSingle(x);
        } catch (error) {
            console.log(error);

        }
    }

    async function getPostSingle(details) {
        try {
            console.log(details);
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/reddit/post/${details}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'g4hvu8o4jh5h',
                    },
                }
            );
            console.log(response);
            getPostRandom()

        } catch (error) {

            console.log(error);

        }
    }

    async function getDeletePost(details) {
        setPosts(null)
    }

    //This if for downvote 













    //This is for delete

    async function handleDelete(x) {

        try {
            console.log("this is delete", x);

            const token = JSON.parse(sessionStorage.getItem("userToken"))
            console.log(token);
            console.log(x);
            const response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/post/${x}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h',
                    }
                }
            )
            //just jugad
            getPostRandom(x);
            console.log("this is deleted", response);

        } catch (error) {
            console.log(error);
        }
    }

    // Call the fetchData function


    //Handle comment click

    // post._id, post.images, post.commentCount, post.likeCount, post.content
    const navigate = useNavigate();

    async function handleCommentClick(post) {

        if (profile === "profile") {
            navigate(`../../comment/${post._id}`);
        } else {
            navigate(`./comment/${post._id}`);
        }


    }


    //end of handle comment click


    //Handle edit 

    async function HandleEdit(x) {
        navigate(`../../community/submit`, { state: { x, editHome, send } })
    }
    //end edit


    return (
        <>
            {post ? <Flex border="1px solid"
                bg={colorMode === "dark" ? "#1A1A1B" : "white"}
                borderColor={colorMode === "dark" ? "gray.800" : "gray.300"}
                borderRadius={4}
                _hover={{ borderColor: "gray.500" }}
            >
                <Flex
                    direction="column"
                    align="center"
                    bg={colorMode === "dark" ? "#161617" : "gray.100"}
                    p={2}
                    width="40px"
                    borderRadius={4}>
                    <Icon as={IoArrowUpCircleSharp}
                        fontSize={22}
                        cursor="pointer"
                        onClick={() => handleUpVote(post._id)}
                        color="blue.300" />
                    <Text fontSize="9pt">
                        {post?.likeCount}
                    </Text>
                    <Icon
                        as={IoArrowDownCircle}
                        fontSize={22}
                        color="blue.300"
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
                            <Text
                                onClick={() => { navigate(`/communitypage/${post.channel?._id}`) }}
                                _hover={{ color: "blue.500" }}
                                cursor="pointer"
                            >Posted by u/{post.author.name}{" "}
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
                            _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
                            cursor="pointer">
                            <Icon as={BsChat} mr={2} />
                            <Text fontSize="9pt">
                                {post.commentCount}
                            </Text>
                        </Flex>

                        <Flex align="center"
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
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
                                _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
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
                                _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
                                cursor="pointer">
                                <Icon as={CiEdit} mr={2} />
                                <Text fontSize="9pt" >
                                    Edit
                                </Text>
                            </Flex>}
                    </Flex>
                </Flex>
            </Flex> : null}
        </>
    )
}

export default PostItems
