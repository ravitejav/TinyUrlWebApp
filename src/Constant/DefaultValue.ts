import { ToasterProps } from "./PropTypes";

export const BACKEND_BASE_URL = "";

export const SIGNUP_USER = `${BACKEND_BASE_URL}/signUpUser`;
export const LOGIN_USER = `${BACKEND_BASE_URL}/auth`;
export const CREATE_SHORT_URL = `${BACKEND_BASE_URL}/shortenUrl/create`;
export const GET_URL_BY_ID = `${BACKEND_BASE_URL}/shortenUrl/getById/`;


export const defaultToaster: ToasterProps = {message: "", type: "info", show: false};

export const loginElements = ["userName", "password"];

export const signupElements = ["name", "userName", "password"];