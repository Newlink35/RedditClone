import { Button, Flex, Input, Stack, Textarea, useColorMode } from '@chakra-ui/react'
import React from 'react'

function TextInputs({
    textInputs,
    onChange, handleCreatePost, handleUpdatePost,
    send,
    userId,
    editedValue,

    loading }) {
    const { colorMode } = useColorMode();
    console.log(send);
    console.log(textInputs);


    console.log(userId);

    return (

        <Stack
            spacing={3}
            width="100%">
            <Input
                name='title'
                value={textInputs.title}
                onChange={onChange}
                fontSize="10pt"
                borderRadius={4}
                placeholder='Title'
                _placeholder={{ color: "gray.500" }}
                _focus={{
                    outline: "none",
                    bg: colorMode === "dark" ? "black" : "white",
                    border: "1px solid",
                    borderColor: "black"
                }} />
            <Textarea
                name='body'
                value={textInputs.body}
                onChange={onChange}
                fontSize="10pt"
                borderRadius={4}
                placeholder='Text (optional)'
                height="100px"
                _placeholder={{ color: "gray.500" }}
                _focus={{
                    outline: "none",
                    bg: colorMode === "dark" ? "black" : "white",
                    border: "1px solid",
                    borderColor: "black"
                }} />
            <Flex justify="flex-end">
                <Button
                    height="34px"
                    padding="0px 30px"
                    isDisabled={!textInputs.title}
                    _hover={{ backgroundColor: "gray.500" }}
                    isLoading={loading}
                    onClick={userId === "Direct Redirecting" || (userId === "Community Redirecting" && editedValue === undefined) ? handleCreatePost : handleUpdatePost}
                >{(userId === "Community Redirecting" && editedValue === undefined) || userId === "Direct Redirecting" ? "Post" : "Update"}</Button>
            </Flex>
        </Stack >
    )
}

export default TextInputs
