import React, { useEffect, useState } from 'react'
import PageContent from '../../Layout/PageContent'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Comments from '../../Posts/Comments/Comments';
import useFetchRandomPosts from '../../CustomHook/useFetchRandomPosts';
import PostItemsComment from './PostItemsComment';
import About from '../About';
import axios from 'axios';
import useOnDelete from '../../../store/Authentication/onDelete';
import useCreatePost from '../../../store/Authentication/createPost';
import { useColorMode } from '@chakra-ui/react';


function HomeComment() {

    const { postId } = useParams();
    const navigate = useNavigate();






    const { colorMode } = useColorMode();

    console.log(postId);
    const { refetch } = useFetchRandomPosts();

    const [post, setPost] = useState();
    const { postDelete, setPostDelete } = useOnDelete();

    const [comment, setGetComments] = useState();


    let result;

    const fetchData = async (x) => {
        try {
            console.log(x);
            const token = JSON.parse(sessionStorage.getItem("userToken"))
            let response = await axios.get(`https://academics.newtonschool.co/api/v1/reddit/post?limit=1200`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h'
                    }
                }
            )
            console.log(response);
            response = response.data.data.find((details) => {
                return details._id === x;
            })
            console.log(response);
            if (!response) {
                getPostSingle(x);
            } else {
                setPost(response);
            }
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    };




    useEffect(() => {
        fetchData(postId);
        setPostDelete(null)
    }, [postDelete])


    //This is for handle upvote
    async function getPostSingle(details) {
        try {
            console.log(details);
            const response = await axios.get(
                `https://academics.newtonschool.co/api/v1/reddit/post/${details}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'g4hvu8o4jh5h',
                    },
                }
            );
            setPost(response.data.data)
            console.log(response);

        } catch (error) {

            console.log(error);

        }
    }




    console.log(post);




    return (
        <PageContent>
            <>
                <PostItemsComment
                    post={post}
                    fetchData={fetchData} />
                {/* SelectedPosts */}
                <Comments
                    fetchData={fetchData}
                    postId={post?._id}
                />
            </>
            <>
                <About />
            </>
        </PageContent>
    )
}

export default HomeComment;
