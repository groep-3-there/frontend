import { Challenge } from "./models/Challenge";
import { ChallengeInput } from "./models/ChallengeInput";
import { Image } from "./models/Image";
import { User } from "./models/User";


async function postRequest<T>(url: string, bodyObject: {}) {
  const res = await fetch(API.BASEURL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    mode: "cors",
    // credentials: "include",
    body: JSON.stringify(bodyObject),
  });
  return (await res.json()) as T;
}

async function putRequest<T>(url: string, bodyObject: {}) {
  const res = await fetch(API.BASEURL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    mode: "cors",
    // credentials: "include",
    body: JSON.stringify(bodyObject),
  });
  return (await res.json()) as T;
}

async function uploadFile<T>(url: string, keyName: string, file: File) {
  const formData = new FormData();
  formData.append(keyName, file);
  const response = await fetch(API.BASEURL + url, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data as T;
}

async function getRequest<T>(url: string) {
  const res = await fetch(API.BASEURL + url, {
    method: "GET",
    headers: API.headers,
    mode: "cors",
    // credentials: "include"
  });
  return (await res.json()) as T;
}

namespace API {
  export const BASEURL = "http://localhost:8080/api/v1/";

  export const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  };

  export function createChallenge(ch: {}) {
    return postRequest<Challenge>("challenge", ch);
  }

  /**
   * Get the current logged in user
   */
  export async function getCurrentUser() {
    return getRequest<User>("auth/user");
  }

  export async function getChallengeById(id: number) {
    return getRequest<Challenge>(`challenge/${id}`);
    return getRequest<Challenge>(`challenge/${id}`);
  }

  export async function getChallengesBySearch(
    query?: string,
    company?: string[],
    branche?: string[],
    sort?: string
  ) {
    let urlstring = "challenge/search?";
    if (query) urlstring += `query=${query}&`;
    if (company) urlstring += `company=${company}&`;
    if (branche) urlstring += `branche=${branche}&`;
    if (sort) urlstring += `sort=${sort}&`;
    return getRequest<Challenge[]>(urlstring);
  }

  export async function updateChallenge(ch: Challenge) {
    return putRequest<Challenge>("challenge/update", ch);
  }

  export async function uploadImage(img: File) {
    return uploadFile<Image>("image/upload", "image", img);
  }
}

export default API;
