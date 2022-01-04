import { atom } from "recoil";

export const jwtToken = atom({
    key: "logintoken",
    default: "",
})