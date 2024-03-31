import React from 'react'
import PageContent from '../Layout/PageContent'
import { Box, Flex, Text } from '@chakra-ui/react'
import NewPostForm from '../Posts/NewPostForm'
import { useLocation } from 'react-router-dom';


function SubmitPostPage() {

    //I am finding out from where its coming if its coming from community then good other wise we will redirect to some other place 
    const key = useLocation();
    console.log(key);

    let userId = undefined;

    if (key.state) {
        userId = "Community Redirecting";
    } else if (key.state === null) {
        userId = "Direct Redirecting";
    }
    console.log(userId);


    return (
        <PageContent>
            <>
                <Box
                    p="14px 0px"
                    borderBottom="1px solid"
                    borderColor="white">
                    <Text>Create Post</Text>
                </Box>
                <NewPostForm userId={userId} />
            </>

            <>
                {/* <About /> */}
            </>
        </PageContent>
    )
}

export default SubmitPostPage;
