import { atom } from "recoil";

export const jwtToken = atom({
    key: "logintoken",
    default: "",
});
export const userId = atom({
    key: "userIdToken",
    default: -1,
})