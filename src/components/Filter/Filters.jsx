import { Flex, Icon, Text, background, useColorMode } from "@chakra-ui/react";
import { PiRocketFill } from "react-icons/pi";
import { FaSun } from "react-icons/fa";
import { GrCloudlinux } from "react-icons/gr";
import { FaFire } from "react-icons/fa";

import React, { useState } from "react";

function Filters({ backGroundf, setBackGround }) {
  const { colorMode } = useColorMode();

  return (
    <Flex
      justify="space-around"
      bg={colorMode === "dark" ? "#1A1A1B" : "white"}
      p="10px 10px"
      marginBottom={3}
    >
      <Flex
        onClick={() => setBackGround(1)}
        backgroundColor={
          colorMode === "dark"
            ? backGroundf === 1
              ? "#272729"
              : "gray.800"
            : backGroundf === 1
              ? "gray.200"
              : "white"
        }
        cursor="pointer"
        padding="6px"
        borderRadius="5px"
        align="center"
        gap="6px"
      >
        <Icon as={GrCloudlinux} color="blue.500" />
        <Text color="#0079D3">Best</Text>
      </Flex>

      <Flex
        onClick={() => setBackGround(2)}
        backgroundColor={
          colorMode === "dark"
            ? backGroundf === 2
              ? "#272729"
              : "gray.800"
            : backGroundf === 2
              ? "gray.200"
              : "white"
        }
        padding="6px"
        cursor="pointer"
        borderRadius="5px"
        align="center"
        gap="6px"
      >
        <Icon as={FaFire} color="yellow.500" />
        <Text color="#0079D3">Hot</Text>
      </Flex>

      <Flex
        onClick={() => setBackGround(3)}
        backgroundColor={
          colorMode === "dark"
            ? backGroundf === 3
              ? "#272729"
              : "gray.800"
            : backGroundf === 3
              ? "gray.200"
              : "white"
        }
        cursor="pointer"
        borderRadius="5px"
        align="center"
        padding="6px"
        gap="6px"
      >
        <Icon as={FaSun} color="red.500" />
        <Text color="#0079D3">New</Text>
      </Flex>
    </Flex>
  );
}

export default Filters;
