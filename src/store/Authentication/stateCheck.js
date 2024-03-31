import { create } from "zustand";

const useStateCheck = create((set) => {
    let stateCheckMenu = localStorage.getItem("stateCheck");
    console.log("this is log", stateCheckMenu);
    let boolflag;

    if (stateCheckMenu !== null) {
        boolflag = stateCheckMenu === "true";
    }

    return {
        stateCheck: boolflag,
        setStateCheck: (params) => {
            set({
                stateCheck: params,
            });
            localStorage.setItem("stateCheck", params.toString());
        },
    };
});

export default useStateCheck;
