import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  useColorMode,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useIsLoggedInStore from "../../store/Authentication/authenticationstore";
import { useNavigate } from "react-router-dom";

function SearchInput() {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
  const navigate = useNavigate();
  const [inputState, setInputState] = useState(null);

  const { colorMode } = useColorMode();
  console.log(colorMode);

  function handleOnClick(event) {
    const { value } = event.target;
    setInputState(value);
    console.log(inputState);
  }

  async function handleBoth() {
    console.log("hi");
    navigate(`searchCommunity/searchItem`, { state: { inputState } });
  }

  return (
    <Flex
      flexGrow={1}
      gap="5px"
      maxWidth={isLoggedIn ? "auto" : "600px"}
      mr={2}
      align="center"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" mb={1.5} />
        </InputLeftElement>
        <Input
          type="text"
          name="inputState"
          placeholder="Search Reddit"
          fontSize="10pt"
          onChange={handleOnClick}
          _placeholder={{ color: "gray.500" }}
          _hover={{
            bg: colorMode === "dark" ? "#2D3748" : "white",
            border: "1px-solid",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg={colorMode === "dark" ? "#2D3748" : "gray.50"}
        />
      </InputGroup>
      <Button borderRadius="4px" onClick={handleBoth} height="34px">
        Search
      </Button>
    </Flex>
  );
}

export default SearchInput;
