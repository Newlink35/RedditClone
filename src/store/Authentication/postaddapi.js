import { create } from "zustand";



const usePostaddapi = create((set) => {
    return {
        postaddapi: null,
        setPostAddApi: (oldstate) => set({
            postaddapi: oldstate
        }),
    }
});




export default usePostaddapi;