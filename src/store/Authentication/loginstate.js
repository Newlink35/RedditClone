// This is zustand for login 

import { create } from "zustand";



const useLoginStore = create((set) => {
    return {
        loginButton: false,
        setLoginButton: (newSign) => set({
            loginButton: newSign
        }),
    }
});






export default useLoginStore;