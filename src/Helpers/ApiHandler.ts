import {
  CREATE_SHORT_URL,
  GET_URL_BY_ID,
  loginElements,
  LOGIN_USER,
  signupElements,
  SIGNUP_USER,
} from "../Constant/DefaultValue";

export const AuthHandler = async (formData: FormData, forLogin: boolean) => {
  const body:any = GenerateBody(formData, forLogin);
  const isValid = Object.keys(body).every((key:any) => body[key] !== "");
  if (!isValid) { 
    return { message: "Please fill all the fields", type: "error", show: true };
  }
  try {
    const results = await fetch(forLogin ? LOGIN_USER :SIGNUP_USER, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
      }
    });
    return results.json();
  } catch (error) {
    console.log(error);
    return { message: "Invalid Details", type: "error", show: true };
  }
  
};

export const createShortUrl = async (url: string, jwtToken: string, userId: number) => {

  try {
    const results = await fetch(
      CREATE_SHORT_URL,
      {
        method: "POST",
        body: JSON.stringify({
          "actualUrl": url,
          "requestedBy": userId
      }),
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${jwtToken}`,
        },
      }
    );
    return results.json();
  } catch (error) {
    return { message: "Invalid Details", type: "error", show: true };
  }
}

export const getUrlById = async (id: string) => {
  const response: any = await fetch(GET_URL_BY_ID + id, {
    method: "GET"
  });
  return await response.json();
}

const GenerateBody = (formData: FormData, forLogin: boolean) => {
  const requests = forLogin ? loginElements : signupElements;
  return requests.reduce(
    (body , element) => ({
      ...body,
      [element]: formData.get(element),
    }), {});
};
