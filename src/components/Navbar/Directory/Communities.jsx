import { Divider, Flex, Icon, Image, MenuItem, Text, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GrAdd } from 'react-icons/gr'
import CreateCommunityModal from '../../Modal/CreateCommunity/CreateCommunityModal'
import useCommunityCreation from '../../../store/Authentication/communityCreation';
import axios from 'axios';
import { TiHome } from "react-icons/ti"
import { filterProps } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import useCreateCom from '../../../store/Authentication/createComShutter';

function Communities({ communityPost }) {

    const { colorMode, toggleColorMode } = useColorMode();

    const { createComOpen, setCreateComOpen } = useCreateCom();
    const navigate = useNavigate();
    return (
        <>
            <CreateCommunityModal open={createComOpen} handleClose={() => setCreateComOpen(false)} />
            <MenuItem
                width="100%"
                fontSize="10pt"
                _hover={colorMode === "dark" ? "gray.700" : "gray.100"}
                onClick={() => setCreateComOpen(true)}
            >
                <Flex
                    align="center"

                >
                    <Icon fontSize={28} mr={2} as={GrAdd} />
                    Create Community
                </Flex>
            </MenuItem>
            <Divider />

            {/* I am creating the community which is also being created */}

            <Text
                fontSize="9pt"
                p={3}
                color="gray.500"
            >YOUR COMMMUNITIES
            </Text>

            {communityPost && communityPost.map((details) => (
                <MenuItem
                    width="100%"
                    fontSize="10pt"
                    _hover={colorMode === "dark" ? "gray.700" : "gray.100"}
                    onClick={() => navigate(`communitypage/${details._id}`)}
                >
                    <Flex align="center" justifyContent="space-between">
                        <Flex alignItems="center">
                            <Image src='/images/r.png' height="20px" mr={2} />
                            <Text>r/{details?.name}</Text>
                        </Flex>
                    </Flex>
                </MenuItem >
            ))

            }
            <Divider />
            {/* This will be the feed section  */}

            <Text
                fontSize="9pt"
                p={3}
                color="gray.500"
            >FEEDS
            </Text>

            <MenuItem
                width="100%"
                textAlign="center"
                fontSize="10pt"
                _hover={colorMode === "dark" ? "gray.700" : "gray.100"}
                onClick={() => navigate(`/`)}
            >
                <Flex align="center">
                    <Icon fontSize={24} mr={2} as={TiHome} />
                    <Text textAlign="center">Home</Text>
                </Flex>
            </MenuItem>
        </>

    )

}

export default Communities
