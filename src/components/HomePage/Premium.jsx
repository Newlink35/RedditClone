import React from "react";
import { Flex, Icon, Text, Stack, Button, useColorMode } from "@chakra-ui/react";
import { GiCheckedShield } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

function Premium() {

    const navigate = useNavigate();
    const { colorMode } = useColorMode();
    console.log(colorMode);

    return (
        <Flex
            direction="column"
            bg={colorMode === "dark" ? "#1A1A1B" : "white"}
            borderRadius={4}
            cursor="pointer"
            p="12px"
            border="1px solid"
            borderColor={colorMode === "dark" ? "gray.800" : "gray.300"}
        >
            <Flex mb={2}>
                <Icon as={GiCheckedShield} fontSize={26} color="brand.100" mt={2} />
                <Stack spacing={1} fontSize="9pt" pl={2}>
                    <Text fontWeight={600}>Reddit Premium</Text>
                    <Text>The best Reddit experience, with monthly Coins</Text>
                </Stack>
            </Flex>
            <Button onClick={() => { navigate('premiumcontent') }} height="30px" bg="brand.100">
                Try Now
            </Button>
        </Flex>
    );
}

export default Premium
