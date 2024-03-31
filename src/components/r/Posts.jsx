import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PostItems from '../Posts/PostItems';
import PageLoader from '../Posts/PageLoader/PageLoader';
import usePostaddapi from '../../store/Authentication/postaddapi';
import useFetchRandomPosts from '../CustomHook/useFetchRandomPosts';
import PostItemsB from '../Posts/PostItemsB';
import useCommunityCreation from '../../store/Authentication/communityCreation';
import { useColorMode } from '@chakra-ui/react';

function Posts({ communityData, findPostsfn }) {
    const [loading, setLoading] = useState();
    const [communityPost, setCommunityPost] = useState(null);
    const { userId } = useParams();
    console.log(userId);
    const { postaddapi, setPostAddApi } = usePostaddapi();
    const data_id = useLocation();
    console.log(data_id);
    const userName = JSON.parse(sessionStorage.getItem('userName'));

    const { communityGlobal, setCommunityGlobal } = useCommunityCreation();

    const { colorMode } = useColorMode();


    const { postApiRandom, error, fetchRandomPosts, refetch } = useFetchRandomPosts();

    let apiadded;

    if (postaddapi !== null) {
        apiadded = postaddapi.filter((details) => details.channel._id === userId);
    } else if (postaddapi === null) {
        const fetchData = async () => {
            try {
                const answer = await refetch();
                apiadded = answer.filter((details) => details.channel && details.channel._id === userId && userName === details.author.name);
                if (apiadded) {
                    setPostAddApi(apiadded);
                    fetchAllPosts();
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }

    async function getPosts() {
        try {
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/reddit/channel/${userId}/posts`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'g4hvu8o4jh5h',
                    },
                }
            );
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchAllPosts() {
        try {
            console.log("hellos");
            const response = await getPosts();
            const newArr = response.map((details) => details._id);

            // Check if any post IDs are already in the localStorage cache
            const cachedPosts = newArr.reduce((accumulator, postId) => {
                const cachedPost = localStorage.getItem(postId);
                console.log(JSON.parse(cachedPost))
                if (cachedPost) {
                    accumulator[postId] = JSON.parse(cachedPost);
                }
                return accumulator;
            }, {});


            // Fetch details for posts not in the cache
            const newResponses = await Promise.all(
                newArr.map(async (details) => {
                    try {
                        if (!cachedPosts[details]) {
                            const response = await axios.get(
                                `https://academics.newtonschool.co/api/v1/reddit/post/${details}`,
                                {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'projectID': 'g4hvu8o4jh5h',
                                    },
                                }
                            );
                            const fetchedPost = response.data.data;
                            // Cache the fetched post in localStorage
                            localStorage.setItem(details, JSON.stringify(fetchedPost));
                            return fetchedPost;
                        } else {
                            return cachedPosts[details];
                        }
                    } catch (error) {
                        console.error('Error fetching details:', error);
                        throw error;
                    }
                })
            );

            // I am combining cache with newly done post 
            let combinedResponses;
            if (apiadded !== undefined) {
                combinedResponses = apiadded.concat(newResponses);
            } else {
                console.log(apiadded);
                combinedResponses = newResponses;
            }

            setCommunityPost(combinedResponses);
            findPostsfn(combinedResponses.length)
            return combinedResponses;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    console.log("this is tcommunti", communityPost);

    useEffect(() => {
        fetchAllPosts();
        setCommunityGlobal(userId)
    }, [userId]);

    return (
        <>
            {communityPost === null ? (
                <PageLoader />
            ) : (
                communityPost.length === 0 ? "No Post Found" : communityPost?.map((details) => (
                    <PostItemsB
                        key={details._id}
                        post={details}
                        fetchAllPosts={fetchAllPosts}


                    />
                ))
            )}
        </>
    );
}

export default Posts;