import axios from 'axios';
import { useEffect, useState } from 'react';

// Custom hook for fetching posts randomly
const useFetchRandomPosts = () => {


    //65903e4eb076aef40a863d69  This is no channel found id
    const [postApiRandom, setPostApiRandom] = useState([]);
    const [error, setError] = useState(null);

    const fetchRandomPosts = async () => {
        try {

            // Assuming you have the token available
            const token = JSON.parse(sessionStorage.getItem('userToken'));

            const response = await axios.get(
                'https://academics.newtonschool.co/api/v1/reddit/post?limit=100',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        projectID: 'g4hvu8o4jh5h',
                    },
                }
            );

            console.log('Response of post:', response.data.data);
            return response.data.data;

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // You might want to fetch the posts on component mount
        fetchRandomPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to run the effect only once on mount

    return { postApiRandom, error, refetch: fetchRandomPosts };
};

export default useFetchRandomPosts;
