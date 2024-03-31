import { Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PageContent from '../Layout/PageContent'
import UserProfile from './UserProfile'
import { useParams } from 'react-router-dom';
import UserDetails from './UserDetails';
import axios from 'axios';
import PageLoader from '../Posts/PageLoader/PageLoader';

function Profile() {

    const [userPosts, setUserPosts] = useState();
    const [userDetails, setUserDetails] = useState(false);

    const { profileId } = useParams();

    console.log(profileId);


    const fetchPosts = async () => {
        console.log('hi');

        const token = JSON.parse(sessionStorage.getItem("userToken"))
        try {
            const response = await axios.get('https://academics.newtonschool.co/api/v1/reddit/post?limit=1000'
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h',
                    }
                });
            // console.log("Home page posts", response.data.data);
            let allPosts = response.data.data;

            const userCreatedPosts = allPosts.filter((item) => item.author._id === profileId);
            console.log("user posts", userCreatedPosts);

            setUserPosts(userCreatedPosts);
            console.log(userPosts);
        }
        catch (error) {
            console.log('error');
        }
    }

    async function fetchUserDetails() {
        try {
            const token = JSON.parse(sessionStorage.getItem("userToken"))

            const response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/user/${profileId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h',
                    }
                }
            );
            console.log('user Details', response.data.data);
            setUserDetails(response.data.data)

        }
        catch (error) {
            console.log("error fetching user Details", error);
            setUserDetails('User Not Found');
        }
    }

    useEffect(() => {
        fetchUserDetails(profileId);
        fetchPosts(profileId);
    }, [profileId])




    return (
        <PageContent>
            <>
                {userPosts?.length > 0 ? <UserProfile userPosts={userPosts} getPostRandom={fetchPosts} /> : "No Post Found"}
            </>

            <>
                <UserDetails userDetails={userDetails} />
            </>
        </PageContent>
    )
}

export default Profile
