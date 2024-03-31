import { Flex, Textarea, Text, Button, useColorMode } from '@chakra-ui/react'
import React, { useState } from 'react'
import AuthButtons from '../../Navbar/RightContent/AuthButtons'
import useIsLoggedInStore from '../../../store/Authentication/authenticationstore'
import axios from 'axios';

function CommentInput({ fetchData, postId }) {

    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
    const userEmail = JSON.parse(sessionStorage.getItem("userEmail"));
    const { colorMode } = useColorMode();

    // Creating state to take comments

    const [commentText, setCommentText] = useState('');


    async function getPostComments(x) {
        try {
            console.log(x);
            console.log(commentText);
            const token = JSON.parse(sessionStorage.getItem("userToken"))


            const response = await axios.post(`https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`,
                {
                    "content": commentText,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            console.log(response);
            fetchData(x);
        } catch (error) {
            console.log(error);
        }
    }

    function putTheComment(event) {
        const { value } = event.target;
        setCommentText(value)
        console.log(commentText);
    }


    return (
        <Flex direction="column" position="relative">
            {isLoggedIn ? (
                <>
                    <Text mb={1}>
                        Comment as{" "}
                        <span style={{ color: "#3182CE" }}>
                            {userEmail?.split("@")[0]}
                        </span>
                    </Text>
                    <Textarea
                        // value={"comment"}
                        name='commentText'
                        onChange={putTheComment}
                        placeholder="What are your thoughts?"
                        fontSize="10pt"
                        borderRadius={4}
                        minHeight="160px"
                        pb={10}
                        _placeholder={{ color: "gray.500" }}
                        _focus={{
                            outline: "none",
                            bg: colorMode === "dark" ? "#272729" : "gray.100",
                            border: "1px solid black",
                        }}
                    />
                    <Flex
                        position="absolute"
                        left="1px"
                        right={0.1}
                        bottom="1px"
                        justify="flex-end"
                        bg={colorMode === "dark" ? "#272729" : "white"}
                        p="6px 8px"
                        borderRadius="0px 0px 4px 4px"
                    >
                        <Button
                            height="26px"
                            zIndex="1"
                            _hover={{ variant: "outline" }}
                            // isLoading={loading}
                            onClick={() => getPostComments(postId)}
                        >
                            Comment
                        </Button>
                    </Flex>
                </>
            ) : (
                <Flex
                    align="center"
                    justify="space-between"
                    borderRadius={2}
                    border="1px solid"
                    borderColor="gray.100"
                    p={4}
                >
                    <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
                    <AuthButtons />
                </Flex>
            )
            }
        </Flex >
    )
}

export default CommentInput
