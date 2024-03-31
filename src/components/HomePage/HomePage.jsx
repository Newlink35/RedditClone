import React, { useEffect, useState } from "react";
import PageContent from "../Layout/PageContent";
import { Flex, Stack, background, filter } from "@chakra-ui/react";
import axios from "axios";
import useIsLoggedInStore from "../../store/Authentication/authenticationstore";
import CreatePostLink from "../r/CreatePostLink";
import PostItems from "../Posts/PostItems";
import PageLoader from "../Posts/PageLoader/PageLoader";
import Recommendations from "./Recommendations";
import usePostaddapi from "../../store/Authentication/postaddapi";
import Filters from "../Filter/Filters";
import useNavigator from "../../store/Authentication/navigatorStore";
import Premium from "./Premium";
import PersonalHome from "./PersonalHome";

function HomePage() {


  const defaultToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YmY5MGE5ZWY4MzlmNjczNGZlZmZkMCIsImlhdCI6MTcwOTIzOTIxNywiZXhwIjoxNzQwNzc1MjE3fQ.9bfGw6bouorHDqQXRhdxPauNI_9rmRA70MHmUqvYspk"


  const { menuButtonText, setMenuButtonText } = useNavigator();

  const [backGroundf, setBackGround] = useState(3);

  const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();
  const [loading, setLoading] = useState(false);
  const [postApiRandom, setPostApiRandom] = useState(null);
  const [upvoteCount, setUpvoteCount] = useState();
  const token = JSON.parse(sessionStorage.getItem("userToken"));

  // This is global state to add from random to community
  const { postaddapi, setPostAddApi } = usePostaddapi();

  const userName = JSON.parse(sessionStorage.getItem("userName"));
  console.log(userName);

  async function fetchRandom(x) {


    try {
      let sortedData;
      console.log(x);
      console.log(backGroundf);
      console.log("hello");
      console.log(token);
      const response = await axios.get(
        `https://academics.newtonschool.co/api/v1/reddit/post?limit=20`,
        {
          headers: {
            projectID: "g4hvu8o4jh5h",
          },
        },
      );
      console.log("this is the response of post", response.data.data);
      setLoading(false);

      if (backGroundf === 1) {
        sortedData = response.data.data.sort(
          (a, b) => b.likeCount - a.likeCount,
        );
        setPostApiRandom(sortedData);
      } else if (backGroundf === 2) {
        sortedData = response.data.data.sort(
          (a, b) => b.commentCount - a.commentCount,
        );
        setPostApiRandom(sortedData);
      } else {
        setPostApiRandom(response.data.data);
      }
      pushBackCommunity(response.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  //userEffects
  useEffect(() => {
    fetchRandom();
    setMenuButtonText("Home");
    sessionStorage.setItem("menuButton", "Home");
  }, [backGroundf]);

  // This is putting things in the community very very important

  async function pushBackCommunity(result) {
    try {
      const answer = await result;
      console.log(answer);

      const filterd = answer.filter((details) => {
        if (details.author.name === userName && details.channel) {
          return details.channel;
        }
      });

      setPostAddApi(filterd);
      console.log(postaddapi);
    } catch (error) { }
  }

  return (
    <PageContent>
      <>
        <CreatePostLink />
        <Filters backGroundf={backGroundf} setBackGround={setBackGround} />
        {postApiRandom === null ? (
          <PageLoader />
        ) : (
          <Stack>
            {postApiRandom?.map((details) => (
              <PostItems
                key={details._id}
                post={details}
                getPostRandom={fetchRandom}

              // handlePost={handlePost}
              />
            ))}
          </Stack>
        )}
      </>

      <Stack spacing={5}>
        <Recommendations />
        <Premium />
        <PersonalHome />
      </Stack>
    </PageContent>
  );
}

export default HomePage;
