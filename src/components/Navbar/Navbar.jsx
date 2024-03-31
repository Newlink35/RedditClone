import { Button, Flex, Image, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import SearchInput from './SearchInput'
import RightContent from './RightContent/RightContent'
import Directory from './Directory/Directory'
import useIsLoggedInStore from '../../store/Authentication/authenticationstore'
import { NavLink } from 'react-router-dom'
import useStateCheck from '../../store/Authentication/stateCheck'


function Navbar() {

    const { stateCheck, setStateCheck } = useStateCheck()

    function handleStateCheck() {
        setStateCheck(!stateCheck)
        if (stateCheck === true) {
            localStorage.setItem("stateCheck", "true");
        } else if (stateCheck === false) {
            localStorage.setItem("stateCheck", "false");
        }
    }
    isLoggedIn

    const { colorMode } = useColorMode()
    console.log(colorMode);

    function setDarkMode() {
        document.querySelector("body").setAttribute('data-theme', 'dark')
    }

    function setLightMode() {
        document.querySelector("body").setAttribute('data-theme', 'light')
    }

    const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();





    return (
        <>
            <Flex
                bg={colorMode === "dark" ? "#1A1A1B" : "white"}
                height="44px"
                padding="6px 12px"
                justify={{ md: "space-between", }}
            >

                <Flex align="center" width={{ base: "40px", md: "auto" }}
                    mr={{ base: 0, md: 2 }}
                >
                    <NavLink to="/"><Image src="/images/redditFace.svg" height="30px" /></NavLink>
                    <Image src={colorMode === 'dark' ? "/images/redditTextWhite.svg" : "/images/redditText.svg"}
                        height={colorMode === 'dark' ? "16px" : "46px"}
                        display={{ base: 'none', md: "unset" }}
                        ml={colorMode === 'dark' ? "6px" : null}
                    />
                </Flex>
                {isLoggedIn && <Directory />}
                <SearchInput />
                <RightContent />

            </Flex >
        </>
    )
}

export default Navbar
