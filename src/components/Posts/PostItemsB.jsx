import { Flex, Icon, Image, Stack, Text, useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import { BiBorderRadius } from 'react-icons/bi';
import { BsChat } from 'react-icons/bs';
import { CiEdit } from "react-icons/ci";

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
import { useNavigate, useParams } from 'react-router-dom';
import useFetchRandomPosts from '../CustomHook/useFetchRandomPosts';
import useCreatePost from '../../store/Authentication/createPost';
import useIsLoggedInStore from '../../store/Authentication/authenticationstore';
import useLoginStore from '../../store/Authentication/loginstate';

function PostItemsB(props) {

    const { colorMode } = useColorMode();

    const { isLoggedIn } = useIsLoggedInStore();
    const { setLoginButton } = useLoginStore();


    const { createPostBtn, setCreatePostBtn } = useCreatePost();

    const PostItemsB = "edit";

    const { userId } = useParams();
    console.log(userId);

    const [post, setPosts] = useState(props.post);


    //Here I am saying that first we have to see whether the post is there in the post link then I have to see the id and do the thigns accordingly if not get post single
    const { refetch } = useFetchRandomPosts();



    async function fetchData(x) {



        try {
            console.log(x);
            const token = JSON.parse(sessionStorage.getItem("userToken"))
            let response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?limit=1200`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            console.log(response);
            response = response.data.data.find((details) => {
                return details._id === x;
            })
            console.log(response);
            if (!response) {
                getPostSingle(x);
            } else {
                setPosts(response);
            }
        } catch (error) {
            console.log(error);
        }
    }














    console.log(post);




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
            console.log(response);
            fetchData(x);
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
            fetchData(x);
        } catch (error) {
            getPostSingle(x);
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
            setPosts(response.data.data)
            localStorage.setItem(details, JSON.stringify(response.data.data));

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
            console.log("this is deleted", response);
            getDeletePost(x);

        } catch (error) {
            console.log(error);
        }
    }

    // Call the fetchData function


    //Handle edit 
    const navigate = useNavigate();

    async function HandleEdit(x) {
        const edit = "edit"
        console.log(x);
        navigate(`../../community/submit`, { state: { x, PostItemsB, userId } })
        console.log(x);
        getPostSingle(x);
    }


    //end edit

    console.log("this is the same comp", post);


    function handleOnCommentCount(IdOfPost) {
        console.log(IdOfPost);
        navigate(`../../comment/${IdOfPost}`);

    }

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
                        color="blue.300"
                        cursor="pointer"
                        onClick={() => handleUpVote(post._id)} />
                    <Text fontSize="9pt">
                        {post.likeCount}
                    </Text>
                    <Icon
                        as={IoArrowDownCircle}
                        color="blue.300"
                        fontSize={22}
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
                            onClick={() => handleOnCommentCount(post._id)}
                            p="8px 10px"
                            borderRadius={4}
                            _hover={{ bg: colorMode === "dark" ? "gray.700" : "gray.200" }}
                            cursor="pointer">
                            <Icon as={BsChat} mr={2} />
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

export default PostItemsB