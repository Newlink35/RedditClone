import { create } from "zustand";


const random = create((set) => {
    return ({
        isValue: 96,
        setIsValue: (params) => set({
            isValue: params,
        })
    })


})

export default random;