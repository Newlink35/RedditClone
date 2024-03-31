import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageContent from "../components/Layout/PageContent";
import { Flex, Stack, Text, useColorMode } from "@chakra-ui/react";
import axios from "axios";
import PostSearchItems from "./PostSearchItems";
import PostSearchContent from "./PostSearchContent";
import CommunitySearchContent from "./CommunitySearchContent";
import About from "../components/r/About";

const serchMenu = [
  {
    title: "Post",
    icon: "PostIcon",
  },
  {
    title: "Communities",
    icon: "CommunitiesIcon",
  },
];

function SearchItem() {
  const { colorMode } = useColorMode();

  const location = useLocation(); //This is the keyword I was looking for
  const keyWord = location.state.inputState;

  const [selectedTab, setSelectedTab] = useState(serchMenu[0].title);

  const [post, setPost] = useState([]);
  const [community, setCommunity] = useState([]);

  async function fetchApi() {
    try {
      const token = JSON.parse(sessionStorage.getItem("userToken"));
      let response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/post?limit=1200`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "g4hvu8o4jh5h",
          },
        },
      );
      console.log(response);
      response = response.data.data.filter((details) => {
        console.log(details);
        return (
          (details && details.title && details.title.includes(keyWord)) ||
          (details && details.content && details.content.includes(keyWord)) ||
          (details &&
            details.author &&
            details.author.name &&
            details.author.name.includes(keyWord))
        );
      });
      console.log(response);
      setPost(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchCommunity() {
    try {
      const token = JSON.parse(sessionStorage.getItem("userToken"));
      let response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/channel/?limit=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "g4hvu8o4jh5h",
          },
        },
      );
      console.log(response);
      response = response.data.data.filter((details) => {
        console.log(details);
        return (
          (details &&
            details.name &&
            details.name &&
            details.name.includes(keyWord)) ||
          (details &&
            details.author &&
            details.author.name &&
            details.author.name.includes(keyWord))
        );
      });
      console.log(response);
      setCommunity(response);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(selectedTab);

  useEffect(() => {
    fetchApi();
    fetchCommunity();
  }, [location.state]);
  let a = [1, 2, 3];

  return (
    <PageContent>
      <>
        <Flex
          bg={colorMode === "dark" ? "#1A1A1B" : "white"}
          borderRadius={4}
          mt={2}
          border="1px solid gray"
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex width="100%">
            {serchMenu.map((item) => (
              <PostSearchItems
                item={item}
                selected={item.title === selectedTab}
                setSelectedTab={setSelectedTab}
              />
            ))}
          </Flex>
          <Stack p={4}>
            {
              selectedTab === "Post" &&
                (post.length === 0 ? (
                  <Text>No Post Found</Text>
                ) : (
                  post.map((details) => <PostSearchContent details={details} />)
                ))
              // <Text>Hello</Text>
            }

            {selectedTab === "Communities" &&
              (community?.length === 0 ? (
                <Text>No Community Found</Text>
              ) : (
                community.map((details) => (
                  <CommunitySearchContent details={details} />
                ))
              ))}
          </Stack>
        </Flex>
      </>

      <>
        <About />
      </>
    </PageContent>
  );
}

export default SearchItem;
