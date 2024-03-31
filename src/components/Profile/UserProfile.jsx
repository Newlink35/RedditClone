import { Stack } from '@chakra-ui/react'
import React, { useState } from 'react'
import PostItems from '../Posts/PostItems'

function UserProfile({ userPosts, getPostRandom }) {
    console.log(userPosts);

    return (
        <Stack>
            {userPosts?.length > 0
                ? userPosts.map((details) => <PostItems post={details} getPostRandom={getPostRandom} profile={"profile"} />)
                : null}
        </Stack>
    )

}

export default UserProfile;
