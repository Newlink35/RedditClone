import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Header from "./Header"
import PageContent from '../Layout/PageContent';
import CreatePostLink from './CreatePostLink';
import Posts from './Posts';
import axios from 'axios';
import About from './About';
import useCommunityCreation from '../../store/Authentication/communityCreation';
import useNavigator from '../../store/Authentication/navigatorStore';
function CommunityName() {
    const location = useLocation();
    console.log(location);
    const { menuButtonText, setMenuButtonText } = useNavigator();

    const token = JSON.parse(sessionStorage.getItem("userToken"))
    const { communityGlobal, setCommunityGlobal } = useCommunityCreation();



    // This is community added 
    const { userId } = useParams()
    const [findPosts, setFindPosts] = useState();








    const [communityData, setCommunityData] = useState(12)
    const [communityName, setCommunityName] = useState('');


    async function getCommunityDetails() {
        // I will be getting community details from here
        try {
            const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/channel/${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                },
            )
            console.log("this is the response", response)
            setCommunityName(response);
            setMenuButtonText(`r/${response.data.data.name}`)
            sessionStorage.setItem("menuButton", `r/${response.data.data.name}`)

        } catch (error) {
            console.log(error)
            setCommunityName(error);
        }
    }

    function findPostsfn(length) {
        console.log(length);
        setFindPosts(length);
    }

    useEffect(() => {
        getCommunityDetails();
        setCommunityGlobal(userId);
    }, [userId])

    return (
        <>
            <Header
                getCommunityDetails={getCommunityDetails}
                communityName={communityName}
            />
            <PageContent>
                <>
                    <CreatePostLink />
                    <Posts
                        communityData={communityData}
                        findPostsfn={findPostsfn}
                    />
                </>
                <>
                    <About findPosts={findPosts} />
                </>
            </PageContent>
        </>
    )
}

export default CommunityName
