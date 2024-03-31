import { Flex, Icon, Input, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { BsLink45Deg } from 'react-icons/bs'
import { FaReddit } from 'react-icons/fa'
import { IoImageOutline } from 'react-icons/io5'
import { useNavigate, useParams } from 'react-router-dom'
import useCreatePost from '../../store/Authentication/createPost'
import useIsLoggedInStore from '../../store/Authentication/authenticationstore'
import useLoginStore from '../../store/Authentication/loginstate'

function CreatePostLink() {
    const { userId } = useParams();

    const { isLoggedIn } = useIsLoggedInStore();
    const { setLoginButton } = useLoginStore();


    const { colorMode } = useColorMode()
    console.log(userId);
    const navigate = useNavigate();
    const { createPostBtn, setCreatePostBtn } = useCreatePost();

    if (createPostBtn) {
        onClick();
        setCreatePostBtn(null);
    }


    function onClick() {

        if (!isLoggedIn) {
            setLoginButton(true)
            return;
        }

        if (userId) {
            navigate(`../community/submit`, { state: { userId } });
        } else if (userId === undefined) {
            navigate(`../community/submit`)
        }
    }
    return (
        <Flex
            justify="space-evenly"
            align="center"
            bg={colorMode === "dark" ? "#1A1A1B" : "white"}
            height="56px"
            borderRadius={4}
            border="1px solid"
            borderColor={colorMode === "dark" ? "gray.700" : "gray.300"}
            p={2}
            mb={4}
        >
            <Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />
            <Input
                placeholder='Create Post'
                fontSize="10pt"
                _placeholder={{ color: "gray.500" }}
                _hover={{
                    bg: colorMode === "dark" ? "#272729" : "gray.300",
                    border: "1px solid",
                    borderColor: colorMode === "dark" ? "white" : "gray.300"
                }}
                _focus={{
                    outline: "none",
                    bg: colorMode === "dark" ? "#000000" : "gray.300",
                    border: "1px solid",
                    borderColor: "blue.500",
                }}
                bg={colorMode === "dark" ? "#272729" : "#F6F7F8"}
                onClick={onClick}
                borderColor="gray.200"
                height="36px"
                borderRadius={4}
                mr={4}
            />
            <Icon
                as={IoImageOutline}
                _hover={{
                    color: "blue.300",
                }}
                onClick={onClick}
                fontSize={24}
                mr={4}
                color="gray.400"
                cursor="pointer"
            />
            <Icon
                as={BsLink45Deg}
                fontSize={24}
                color="gray.400"
                cursor="pointer"
            />
        </Flex>
    )
}

export default CreatePostLink
