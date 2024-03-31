// This is zustand for isLogin state
//const {isLoggedIn, setIsLoggedIn} = useIsLoggedInStore();

import { create } from "zustand";

const useIsLoggedInStore = create((set) => {
    // crunch and important logic

    let isUserLoggedIn;
    const token = sessionStorage.getItem("userToken");
    if (token) {
        isUserLoggedIn = true;
    } else {
        isUserLoggedIn = false;
    }
    return {
        isLoggedIn: isUserLoggedIn,
        setIsLoggedIn: (newValue) => set({
            isLoggedIn: newValue
        })
    }
})
export default useIsLoggedInStore;