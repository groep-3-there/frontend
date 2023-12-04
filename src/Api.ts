import { Challenge } from "./models/Challenge";
import { ChallengeInput } from "./models/ChallengeInput";
import { Image } from "./models/Image";
import { User } from "./models/User";
import { ChallengeSearchResults } from "./models/ChallengeSearchResults";
import { Branch } from "./models/Branch";
import { Tag } from "./models/Tag";
import { CompanyRequests } from "./models/CompanyRequests";
import { Company } from "./models/Company";
import { useSessionStore } from "@/store/sessionStore";
import { CompanyRequestsResults } from "./models/CompanyRequestsResults";
import { Department } from "./models/Department";
import { DepartmentCode } from "./models/DepartmentCode";
import { Role } from "./models/Role";
import { Country } from "./models/Country";

async function postRequest(url: string, bodyObject: {}) {
    const res = await fetch(API.BASEURL + url, {
        method: "POST",
        headers: API.getHeaders(),
        mode: "cors",
        // credentials: "include",
        body: JSON.stringify(bodyObject),
    });
    return await res.json();
}

async function putRequest(url: string, bodyObject: {}) {
    const res = await fetch(API.BASEURL + url, {
        method: "PUT",
        headers: API.getHeaders(),
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
        headers: {
            Authorization: API.getHeaders()["Authorization"],
        },
        body: formData,
    });

    return await res.json();
}

async function getRequest(url: string) {
    const res = await fetch(API.BASEURL + url, {
        method: "GET",
        headers: API.getHeaders(),
        mode: "cors",
        // credentials: "include"
    });
    return await res.json();
}

namespace API {
    export const BACKEND_URL = import.meta.env.PROD
        ? "http://matchmakergroep3.nl:8080"
        : "http://localhost:8080";
    export const BASEURL = `${BACKEND_URL}/api/v1/`;

    export const FIREBASE_PUBLIC_API_KEY =
        "AIzaSyCo7z9UVlNrdKMqtvfA-cEWWPqua3wDOkU";

    let authToken = localStorage.getItem("authToken") || "";

    export function hasAuthToken() {
        return authToken != "";
    }
    export function removeAuthToken() {
        localStorage.setItem("authToken", "");
        authToken = "";
    }
    export function getHeaders() {
        const headers: any = {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": BACKEND_URL,
        };
        if (authToken) {
            headers["Authorization"] = `Bearer ${authToken}`;
        }
        return headers;
    }

    export async function createChallenge(ch: {}) {
        const data = await postRequest("challenge", ch);
        return new Challenge(data);
    }
    export async function registerCompany(company: {}) {
        const data = await postRequest("company/request", company);
        return new Company(data);
    }

    /**
     * Get the current logged in user
     */
    export async function getCurrentUser() {
        try{
            const data = await getRequest("auth/user");
            return new User(data);
        }
        catch{
            return null;
        }
    }
    export async function getUserById(id: number) {
        const data = await getRequest(`user/${id}`);
        return new User(data);
    }
    export async function isEmailRegistered(email: string) {
        const data = await getRequest(`user/exist/${email}`);
        return data;
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
    export async function getCountries(){
        const data = await getRequest(`country/all`);
        return data.map((d: any) => new Country(d));
    }
    export async function getCompanyNames() {
        const data = await getRequest(`company/names`);
        return data;
    }
    export async function getCompanyMembersByCompanyId(id: number) {
        const data = await getRequest(`company/${id}/members`);
        return data.map((d: any) => new User(d));
    }

    export async function pingServer() {
        return getRequest("ping");
    }

    export async function getCompany(id: number) {
        const data = await getRequest(`company/${id}`);
        return new Company(data);
    }

    export async function getDepartmentsForCompany(id: number) {
        const data = await getRequest(`department/company/${id}`);
        return data.map((d: any) => new Department(d));
    }
    export async function getDepartmentByCode(code: string) {
        const data = await getRequest(`department/code/${code}`);
        return new Department(data);
    }
    export async function departmentExists(companyId: number, name: string) {
        const data = await postRequest(`department/exists`, {
            parentCompanyId: companyId,
            name: name,
        });
        return data;
    }
    export async function joinDepartment(code: string) {
        const data = await postRequest(`department/join/${code}`, {});
        return data;
    }

    export async function getOrGenerateDepartmentCode(departmentId: number) {
        const data = await getRequest(`departmentcode/${departmentId}`);
        return new DepartmentCode(data);
    }

    export async function createDepartment(
        name: string,
        targetAdminId: number,
    ) {
        const data = await postRequest(`department/create`, {
            name: name,
            adminId: targetAdminId,
        });
        return data;
    }

    export async function getAllChallengesForCompany(id: number) {
        const data = await getRequest(`challenge/company/${id}`);
        return data.map((d: any) => new Challenge(d));
    }

    /**
     * This function calls to API to get all challenges that match the given filters
     * @param query - words to search for in the challenge title, description and tags
     * @param company - campany names to filter for
     * @param branche - branche names to filter for
     * @param sort - sort by newest_first, deadline_closest_first
     * @param page - page number
     * @returns a list of challenges + pagination info
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

    export async function updateUser(us: User | { id: number }) {
        const data = await putRequest(`user/${us.id}`, us);
        return new User(data);
    }

    export async function uploadImage(img: File) {
        const data = await uploadFile("image/upload", "image", img);
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
            `reaction/${reactionId}/markreaction`,
            {},
        );
        return new ChallengeInput(data);
    }
    export async function postReaction(input: {}, challengeId: number) {
        const data = await postRequest(`reaction/create/${challengeId}`, input);
        return new ChallengeInput(data);
    }

    export async function getTags() {
        const data = await getRequest(`tags`);
        return data.map((d: any) => new Tag(d));
    }

    export async function getCompanyRequests(): Promise<CompanyRequestsResults> {
        const data = await getRequest(`company/request`);
        return new CompanyRequestsResults(data);
    }
    export async function acceptCompanyRequest(id: number) {
        try {
            const data = await postRequest(`company/request/${id}/accept`, {});
        } catch (e) {}
        return;
    }
    export async function rejectCompanyRequest(id: number) {
        try {
            const data = await postRequest(`company/request/${id}/reject`, {});
        } catch (e) {}
        return;
    }
    /**
     * Create a new user
     * @returns a new user
     */
    export async function postCreateUser(userData: {
        email: string;
        password: string;
        name: string;
        companyCode: string;
    }) {
        const data = await postRequest(`auth/create`, userData);
        return new User(data);
    }

    export async function whoami() {
        return await getRequest("whoami");
    }
    //Login and save the token for furthur requests
    export async function firebaseLoginAndUseToken(
        email: string,
        password: string,
    ) {
        try {
            const res = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
                    FIREBASE_PUBLIC_API_KEY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }),
                },
            );
            if (res.status == 400) {
                return false;
            }
            const json = await res.json();
            authToken = json.idToken;
            localStorage.setItem("authToken", authToken);
            if (authToken) {
                return true;
            }
            return false;
        } catch (e) {
            console.warn(e);
            return false;
        }
    }
    export async function LoadUsersFromDepartment(departmentId: number) {
        const data = await getRequest(`department/${departmentId}/members`);
        return data.map((d: any) => new User(d));
    }
    export async function LoadAssignableRoles() {
        const data = await getRequest(`role/assignable`);
        return data.map((d: any) => new Role(d));
    }
    export async function updateRoles(departmentId: number, updates: { userId: number, roleId: number }[]) {
        const data = await putRequest(`department/${departmentId}/updateroles`, { updates });
        return data;
    }
}

export default API;
