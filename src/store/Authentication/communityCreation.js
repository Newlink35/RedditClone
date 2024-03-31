// This is zustand for login 

import { create } from "zustand";



const useCommunityCreation = create((set) => {
    return {
        communityGlobal: [],
        setCommunityGlobal: (param) => set({
            communityGlobal: param
        }),
    }
});






export default useCommunityCreation;