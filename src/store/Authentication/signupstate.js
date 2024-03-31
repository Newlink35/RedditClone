import { create } from "zustand";



const useSignUpStore = create((set) => {
    return {
        signInButton: false,
        setSigninButton: (newSign) => set({
            signInButton: newSign
        }),
    }
});




export default useSignUpStore;