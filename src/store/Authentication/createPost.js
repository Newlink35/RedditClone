// This is zustand for login 

import { create } from "zustand";



const useCreatePost = create((set) => {
    return {
        createPostBtn: null,
        setCreatePostBtn: (param) => set({
            createPostBtn: param
        }),
    }
});






export default useCreatePost;