import React from "react";
import { Button, Flex, Icon, Stack, Text, useColorMode } from "@chakra-ui/react";
import { FaReddit } from "react-icons/fa";
import useCreateCom from "../../store/Authentication/createComShutter";
import useCreatePost from "../../store/Authentication/createPost";

function PersonalHome() {
    const { createComOpen, setCreateComOpen } = useCreateCom();
    const { createPostBtn, setCreatePostBtn } = useCreatePost();

    const { colorMode, toggleColorMode } = useColorMode();
    console.log(colorMode);

    return (
        <Flex
            direction="column"
            bg={colorMode === "dark" ? "#1A1A1B" : "white"}
            borderRadius={4}
            cursor="pointer"
            border="1px solid"
            borderColor={colorMode === "dark" ? "gray.800" : "gray.300"}
            position="sticky"
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                bg="blue.500"
                height="34px"
                borderRadius="4px 4px 0px 0px"
                fontWeight={600}
                bgImage="url(/images/redditPersonalHome.png)"
                backgroundSize="cover"
            ></Flex>
            <Flex direction="column" p="12px">
                <Flex align="center" mb={2}>
                    <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
                    <Text fontWeight={600}>Home</Text>
                </Flex>
                <Stack spacing={3}>
                    <Text fontSize="9pt">
                        Your personal Reddit frontpage, built for you.
                    </Text>
                    <Button height="30px" onClick={() => { setCreatePostBtn(true) }}>Create Post</Button>
                    <Button onClick={() => setCreateComOpen(true)} variant="outline" height="30px">
                        Create Community
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    )
}

export default PersonalHome
