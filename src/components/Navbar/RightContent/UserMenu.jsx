import { ChevronDownIcon } from '@chakra-ui/icons'
import { Button, Divider, Flex, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, Text, useColorMode } from '@chakra-ui/react'
import React from 'react'
import { Switch } from '@chakra-ui/react'
import { FaMoon, FaRedditSquare, FaSun } from "react-icons/fa"
import { VscAccount } from "react-icons/vsc"
import { CgProfile } from "react-icons/cg"
import { IoSparkles } from "react-icons/io5";
import { MdOutlineLogin } from "react-icons/md"
import useIsLoggedInStore from '../../../store/Authentication/authenticationstore'
import useLoginStore from '../../../store/Authentication/loginstate'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const UserMenu = ({ user }) => {
    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
    const { loginButton, setLoginButton } = useLoginStore()
    const userName = JSON.parse(sessionStorage.getItem("userName"))
    const userEmail = JSON.parse(sessionStorage.getItem("userEmail"));

    const { colorMode, toggleColorMode } = useColorMode();
    console.log(colorMode);

    function handleLogOut() {
        setIsLoggedIn(false);
        sessionStorage.removeItem("userToken")
    }


    const navigate = useNavigate();
    const userId = sessionStorage.getItem("userIdPer");


    function handleNavProfile() {

        navigate(`profile/${userId}`)
    }


    return (
        <Menu>
            <MenuButton
                cursor="pointer"
                padding='0px 6px'
                borderRadius={4}
                _hover={{ outline: '1px solid', outlineColor: "gray.200" }}

            >
                <Flex align="center">
                    <Flex align="center">
                        {user ? (

                            <>
                                <Icon fontSize={24}
                                    mr={1}
                                    color="gray.300"
                                    as={FaRedditSquare} />

                                <Flex
                                    direction="column"
                                    display={{ base: "none", lg: "flex" }}
                                    fontSize="8pt"
                                    align="flex-start"
                                    mr={8}
                                >
                                    <Text fontWeight={700}>
                                        {userEmail?.split("@")[0]}
                                    </Text>
                                    <Flex>
                                        <Icon as={IoSparkles}
                                            color="brand.100"
                                            mr={1} />
                                        <Text color="gray.400">1 Karma</Text>
                                    </Flex>
                                </Flex>
                            </>

                        ) : (
                            <Icon display="flex" as={VscAccount} fontSize={24}
                                color="gray.400"
                                mr={1}
                            />
                        )}
                    </Flex>
                    <ChevronDownIcon />

                </Flex>

            </MenuButton>

            <MenuList>
                {
                    user ? (
                        <>
                            <MenuItem
                                fontSize='10pt'
                                fontWeight={700}
                                onClick={handleNavProfile}
                                _hover={{ bg: "blue.500", color: "white" }}>

                                <Flex align="center">
                                    <Icon fontSize={20} mr={2} as={CgProfile} />
                                    Profile
                                </Flex>
                            </MenuItem>

                            <MenuDivider />

                            <MenuItem
                                alignItems="center"
                                fontSize='10pt'
                                fontWeight={700}
                                onClick={toggleColorMode}
                                _hover={{ bg: "blue.500", color: "white" }}
                            >

                                <Flex align="center" gap="10px">
                                    <Text>{colorMode === "dark" ? "Light Mode" : "Dark Mode"}</Text>
                                    <Icon onClick={toggleColorMode} as={colorMode === "dark" ? FaSun : FaMoon} />
                                </Flex>
                            </MenuItem>

                            <Divider />

                            <MenuItem
                                fontSize='10pt'
                                fontWeight={700}
                                _hover={{ bg: "blue.500", color: "white" }}
                                onClick={handleLogOut}>

                                <Flex align="center">
                                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                    Log Out
                                </Flex>
                            </MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem
                                fontSize='10pt'
                                fontWeight={700}
                                _hover={{ bg: "blue.500", color: "white" }}
                                onClick={() => setLoginButton(true)}>

                                <Flex align="center">
                                    <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
                                    Log In / Sign Up
                                </Flex>
                            </MenuItem>
                        </>
                    )
                }

            </MenuList>
        </Menu >
    )
}
