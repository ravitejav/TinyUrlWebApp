import { ToasterProps } from "./PropTypes";

export const BACKEND_BASE_URL = "";

export const SIGNUP_USER = `${BACKEND_BASE_URL}/signUpUser`;
export const LOGIN_USER = `${BACKEND_BASE_URL}/auth`;


export const defaultToaster: ToasterProps = {message: "", type: "info", show: false};

export const loginElements = ["userName", "password"];

export const signupElements = ["name", "userName", "password"];