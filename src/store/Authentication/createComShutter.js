// This is zustand for login 

import { create } from "zustand";



const useCreateCom = create((set) => {
    return {
        createComOpen: false,
        setCreateComOpen: (param) => set({
            createComOpen: param
        }),
    }
});



export default useCreateCom;