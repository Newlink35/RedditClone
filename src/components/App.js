import {
  CSSReset,
  ChakraProvider,
  ColorModeProvider,
  useColorMode,
} from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { Layout } from "./Layout/Layout";
import MainComp from "./MainComp/MainComp";
import CommunityName from "./r/CommunityName";
import { Route, Routes } from "react-router-dom";
import SubmitPostPage from "./r/SubmitPostPage";
import HomePage from "./HomePage/HomePage";
import Comments from "./Posts/Comments/Comments";
import HomeComment from "./r/HomeComment.jsx/HomeComment";
import useIsLoggedInStore from "../store/Authentication/authenticationstore";
import SearchItem from "../SearchItem/SearchItem";
import PremiumPage from "./HomePage/PremiumPage";
import useStateCheck from "../store/Authentication/stateCheck";
import Profile from "./Profile/Profile";
import random from "../store/Authentication/random";
import { useEffect } from "react";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedInStore();

  const { isValue, setIsValue } = random();

  const { stateCheck, setStateCheck } = useStateCheck();

  console.log("This is persisting ", stateCheck);

  console.log(isLoggedIn);
  if (isLoggedIn === false) {
    localStorage.removeItem("Comid");
  }

  const { colorMode, toggleColorMode } = useColorMode();
  console.log(colorMode);

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="communitypage/:userId" element={<CommunityName />} />
          <Route path="community/submit" element={<SubmitPostPage />} />
          <Route path="comment/:postId" element={<HomeComment />} />
          <Route path="searchCommunity/searchItem" element={<SearchItem />} />
          <Route path="premiumcontent" element={<PremiumPage />} />
          <Route path="profile/:profileId" element={<Profile />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
