import { create } from "zustand";



const useOnDelete = create((set) => {
    return {
        postDelete: null,
        setPostDelete: (oldstate) => set({
            postDelete: oldstate
        }),
    }
});




export default useOnDelete;