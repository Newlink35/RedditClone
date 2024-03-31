import { ChevronDownIcon, Icon } from '@chakra-ui/icons'
import { Flex, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import useIsLoggedInStore from '../../../store/Authentication/authenticationstore'
import useLoginStore from '../../../store/Authentication/loginstate'
import { TiHome } from "react-icons/ti"
import Communities from './Communities'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import useCommunityCreation from '../../../store/Authentication/communityCreation'
import useNavigator from '../../../store/Authentication/navigatorStore'


function Directory() {
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
    const [communityPost, setCommunityPost] = useState([]);
    const { menuButtonText, setMenuButtonText } = useNavigator();


    const userName = JSON.parse(sessionStorage.getItem("userName"));
    console.log(userName);

    const { communityGlobal, setCommunityGlobal } = useCommunityCreation();
    console.log(communityGlobal);


    //getcommunities api
    async function getAllCommunity() {
        // I will be getting community details from here
        try {
            const token = JSON.parse(sessionStorage.getItem("userToken"))
            let response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/?limit=1000`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                },
            )
            response = response.data.data.filter((details) => {
                return details.owner.name === userName;
            })
            console.log(response);
            setCommunityPost(response)

            console.log(communityPost);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllCommunity();
    }, [communityGlobal])



    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding='0px 6px'
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: "gray.200" }}
                mr={2}
                ml={{ outline: "1px solid", outlineColor: "gray.200" }}
            >
                <Flex align="center" justify="space-between" width={{ base: "auto", lg: "200px" }}>
                    <Flex align="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                        <Flex display={{ base: "none", lg: "flex" }}>
                            <Text fontWeight={600} fontSize="10pt">{menuButtonText}</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />

                </Flex>

            </MenuButton>

            <MenuList>
                <Communities
                    communityPost={communityPost}
                    getAllCommunity={getAllCommunity}
                />
            </MenuList>
        </Menu>
    )
}

export default Directory
