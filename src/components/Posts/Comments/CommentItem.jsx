import React, { useCallback, useEffect, useState } from "react";
import {
    Avatar,
    Box,
    Flex,
    Icon,
    Spinner,
    Stack,
    Text,
    useColorMode,
} from "@chakra-ui/react";
import moment from "moment";
import { FaReddit } from "react-icons/fa";
import {
    IoArrowDownCircleOutline,
    IoArrowUpCircleOutline,
} from "react-icons/io5";
import axios from "axios";
import useOnDelete from "../../../store/Authentication/onDelete";
import { useNavigate } from "react-router-dom";

function CommentItem({ getPostComments, details }) {



    console.log(details);

    const { postDelete, setPostDelete } = useOnDelete();
    const { colorMode } = useColorMode();




    const [commentItem, setCommentItem] = useState(details)
    console.log(details);
    const userName = JSON.parse(sessionStorage.getItem("userName"));

    async function onDelete(commendId) {
        try {
            console.log(commendId);
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            let response = await axios.delete(`https://academics.newtonschool.co/api/v1/reddit/comment/${commendId}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            getPostComments(details.post);
            setPostDelete(details.post)
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate();

    return (

        <Flex>
            <Box mr={2}>
                <Icon
                    as={FaReddit}
                    fontSize={30}
                    color="gray.300" />
            </Box>
            <Stack spacing={1}>
                <Stack direction="row" align="center" fontSize="8pt">
                    <Text
                        cursor="pointer"
                        _hover={{ bg: colorMode === "dark" ? "gray.800" : "blue.100" }}
                        onClick={() => navigate(`../../profile/${details?.author}`)}>
                        {details.author}
                    </Text>
                    <Text>{new Date(details?.createdAt).toLocaleString()}</Text>
                </Stack>
                <Text fontSize="10pt">{details?.content}</Text>
                <Stack direction="row" align="center" cursor="pointer" color="gray.500">
                    <Icon as={IoArrowUpCircleOutline} />
                    <Icon as={IoArrowDownCircleOutline} />
                    <>
                        <Text fontSize="9pt"
                            _hover={{ color: "blue.500" }}>Edit</Text>
                        <Text fontSize="9pt"
                            onClick={() => onDelete(details._id)}
                            _hover={{ color: "blue.500" }}>Delete</Text>
                    </>
                </Stack>
            </Stack>
        </Flex>
    )
}

export default CommentItem
