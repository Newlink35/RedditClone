import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

function Footer() {
    return (
        <Flex
            justifyContent="center"
            background="#0c3744"
            backgroundColor="#0c3744"
            p="48px 441px 32px"
            fontSize="14px"
            fontWeight={400}
            lineHeight="21px">
            <Flex
                direction="column"
                color="white"
                justifyContent="center"
                align="center"
                margin={0}
                flex="1 1 auto"
                textAlign="left">
                <Text>About</Text>
                <Text>Carrers</Text>
                <Text>Press</Text>
            </Flex>


            <Flex
                align="center"
                direction="column"
                color="white"
                margin={0}
                flex="1 1 auto"
                textAlign="left">
                <Text>Advertise</Text>
                <Text>Blog</Text>
                <Text>Help</Text>
            </Flex>


            <Flex
                align="center"
                direction="column"
                color="white"
                margin={0}
                flex="1 1 auto"
                textAlign="left">
                <Text>Facebook</Text>
                <Text>Twitter</Text>
                <Text>Instagram</Text>
            </Flex>
        </Flex>
    )
}

export default Footer
