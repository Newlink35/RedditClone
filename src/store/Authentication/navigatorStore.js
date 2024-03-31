import { create } from "zustand";



const useNavigator = create((set) => {
    let menuglobal = sessionStorage.getItem("menuButton");
    let btnText;

    if (menuglobal) {
        btnText = menuglobal;
    } else {
        btnText = "Home";
    }
    return {
        menuButtonText: btnText,
        setMenuButtonText: (params) => set({
            menuButtonText: params
        }),
    }
});




export default useNavigator;