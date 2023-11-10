import exp from "constants";
import { Challenge } from "./models/Challenge";
import { ChallengeInput } from "./models/ChallengeInput";
import { Image } from "./models/Image";
import { User } from "./models/User";
import { ChallengeSearchResults } from "./models/ChallengeSearchResults";
import { Branch } from "./models/Branch";
import { Tag } from "./models/Tag";

async function postRequest(url: string, bodyObject: {}) {
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
    return await res.json();
}

async function putRequest(url: string, bodyObject: {}) {
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
    return await res.json();
}

async function uploadFile(url: string, keyName: string, file: File) {
    const formData = new FormData();
    formData.append(keyName, file);
    const res = await fetch(API.BASEURL + url, {
        method: "POST",
        body: formData,
    });
    return await res.json();
}

async function getRequest(url: string) {
    const res = await fetch(API.BASEURL + url, {
        method: "GET",
        headers: API.headers,
        mode: "cors",
        // credentials: "include"
    });
    return await res.json();
}

namespace API {
    export const BASEURL = "http://localhost:8080/api/v1/";

    export const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
    };

    export async function createChallenge(ch: {}) {
        const data = await postRequest("challenge", ch);
        return new Challenge(data);
    }

    /**
     * Get the current logged in user
     */
    export async function getCurrentUser() {
        const data = await getRequest("auth/user");
        return new User(data);
    }
    export async function getImagesByChallengeId(id: number) {
        const data = await getRequest(`image/challenge/${id}`);
        return data.map((d: any) => new Image(d));
    }
    export async function getChallengeById(id: number) {
        const data = await getRequest(`challenge/${id}`);
        return new Challenge(data);
    }
    export async function getChallengeInputs(id: number) {
        const data = await getRequest(`reaction/challenge/${id}`);
        return data.map((d: any) => new ChallengeInput(d));
    }
    export async function getBranches() {
        const data = await getRequest(`branch/all`);
        return data.map((d: any) => new Branch(d));
    }

    export async function pingServer() {
        return getRequest("ping");
    }

    /**
     * This function calls to API to get all challenges that match the given filters
     * @param query - words to search for in the challenge title, description and tags
     * @param company - campany names to filter for
     * @param branche - branche names to filter for
     * @param sort - sort by newest_first, deadline_closest_first
     * @param page - page number
     * @returns
     */
    export async function getChallengesBySearch(
        query?: string,
        company?: string[],
        branche?: string[],
        sort?: string,
        page?: number,
    ) {
        let urlstring = "challenge/search?";
        if (query) urlstring += `query=${query}&`;
        if (company) urlstring += `company=${company}&`;
        if (branche) urlstring += `branche=${branche}&`;
        if (sort) urlstring += `sort=${sort}&`;
        if (page) urlstring += `page=${page}&`;

        const data = await getRequest(urlstring);
        return new ChallengeSearchResults(data);
    }

    export async function updateChallenge(ch: Challenge | {}) {
        const data = await putRequest("challenge/update", ch);
        return new Challenge(data);
    }

    export async function uploadImage(img: File) {
        const data = uploadFile("image/upload", "image", img);
        return new Image(data);
    }
    export async function uploadImageForChallenge(
        img: File,
        challengeId: number,
    ) {
        const data = uploadFile(
            `image/upload/challenge/${challengeId}`,
            "image",
            img,
        );
        return new Image(data);
    }
    export async function markReactionAsChosen(reactionId: number) {
        const data = await putRequest(
            `/reaction/${reactionId}/markreaction`,
            {},
        );
        return new ChallengeInput(data);
    }

    export async function getTags() {
        const data = await getRequest(`tags`);
        return data.map((d: any) => new Tag(d));
    }
}

export default API;
