import { Challenge } from "./models/Challenge";
import { ChallengeInput } from "./models/ChallengeInput";
import { Image } from "./models/Image";
import { User } from "./models/User";
import { ChallengeSearchResults } from "./models/ChallengeSearchResults";
import { Branch } from "./models/Branch";
import { Tag } from "./models/Tag";
import { Company } from "./models/Company";
import { CompanyRequestsResults } from "./models/CompanyRequestsResults";
import { Department } from "./models/Department";
import { DepartmentCode } from "./models/DepartmentCode";
import { Role } from "./models/Role";
import { Country } from "./models/Country";
import { Permission } from "./models/Permission";

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
        ? "https://matchmakergroep3.nl:8443"
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
        const data = await postRequest("company-request", company);
        return new Company(data);
    }

    /**
     * Get the current logged-in user
     */
    export async function getCurrentUser() {
        try{
            const data = await getRequest("auth/user");
            return new User(data);
        }
        catch{
            console.warn("Error while getting current user");
            return null;
        }
    }
    export async function getUserById(id: number) {
        const data = await getRequest(`user/${id}`);
        return new User(data);
    }
    export async function isEmailRegistered(email: string) {
        return await getRequest(`user/exist/${email}`);
    }
    export async function isPhoneNumberRegistered(phoneNumber: string) {
        return await getRequest(`user/exist/${phoneNumber}`);
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
        return await getRequest(`company/names`);
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
        return await postRequest(`department/exists`, {
            parentCompanyId: companyId,
            name: name,
        });
    }
    export async function joinDepartment(code: string) {
        return await postRequest(`department/join/${code}`, {});
    }

    export async function getOrGenerateDepartmentCode(departmentId: number) {
        const data = await getRequest(`departmentcode/${departmentId}`);
        return new DepartmentCode(data);
    }

    export async function createDepartment(
        name: string,
        targetAdminId: number,
    ) {
        return await postRequest(`department/create`, {
            name: name,
            adminId: targetAdminId,
        });
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
    export async function updateNotificationPreferences(user: User, preferences : {email :boolean}) {
        //wil only work on the logged in user
        const data = await putRequest(`user/${user.id}/notificationPreferences`, preferences);
        return new User(data);
    }
    export async function updateCompany(cp: Company | { id: number }) {
        const data = await putRequest(`company/${cp.id}`, cp);
        console.log(data);
        return new Company(data);
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

    export async function getCompanyRequests(page?: number): Promise<CompanyRequestsResults> {
        let urlstring = "company-request?";
        if (page) urlstring += `page=${page}&`;
        const data = await getRequest(urlstring);
        return new CompanyRequestsResults(data);
    }
    export async function acceptCompanyRequest(id: number) {
        try {
            await postRequest(`company-request/${id}/accept`, {});
        } catch (e) {
            console.warn(e);
        }
        return;
    }
    export async function rejectCompanyRequest(id: number) {
        try {
            await postRequest(`company-request/${id}/reject`, {});
        } catch (e) {
            console.warn(e);
        }
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
    export async function sendVerificationEmail() {
        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
                FIREBASE_PUBLIC_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "VERIFY_EMAIL",
                    idToken: authToken,
                }),
            },
        );
        return res.ok;
    }
    export async function recoverPassword(email : String){
        const res = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=" +
                FIREBASE_PUBLIC_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestType: "PASSWORD_RESET",
                    email: email,
                }),
            },
        );
        return res.ok
    }
    export async function changeEmail(newEmail : string){
        try {
            const res = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
                    FIREBASE_PUBLIC_API_KEY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: authToken,
                        email: newEmail,
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

    export async function changePassword(newPassword : string){
        try {
            const res = await fetch(
                "https://identitytoolkit.googleapis.com/v1/accounts:update?key=" +
                    FIREBASE_PUBLIC_API_KEY,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: authToken,
                        password: newPassword,
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
    export async function getAssignableRoles() : Promise<Role[]> {
        const data = await getRequest(`role/assignable`);
        return data.map((d: any) => new Role(d));
    }
    export async function updateRoles(departmentId: number, updates: { userId: number, roleId: number }[]) {
        return await putRequest(`department/${departmentId}/updateroles`, {updates});
    }
    export async function getAllPermissions() : Promise<Permission[]>{
        const data = await getRequest("permission")
        return data.map((i:any)=>new Permission(i));
    }
    export async function getRole(id:number){
        const data = await getRequest(`role/${id}`)
        return new Role(data);
    }
    export async function getAllRoles() : Promise<Role[]>{
        const data = await getRequest(`role`)
        return data.map((i:any)=>new Role(i));
    }
    /**Id is made in backend */
    export async function createRole(newRole : Role){
        const data = await postRequest(`role`, newRole);
        return new Role(data);
    }
    export async function updateRole(role : Role){
        const data = await putRequest(`role/${role.id}`, role);
        return new Role(data);
    }

    export async function getGraphChallenges() {
        return await getRequest(`graph-data/challenges/total`);
    }

    export async function getGraphChallengesTotalWithMonth(from : string, till : string) {
        return await getRequest(`graph-data/challenges/total-by-date?from=${from}&till=${till}`);
    }

    export async function getGraphUsers() {
        return await getRequest(`graph-data/users/total`);
    }

    export async function getGraphUsersTotalWithMonth(from : string, till : string) {
        return await getRequest(`graph-data/users/total-by-date?from=${from}&till=${till}`);
    }

    export async function getGraphCompanies() {
        return await getRequest(`graph-data/companies/total`);
    }

    export async function getGraphCompaniesTotalWithMonth(from : string, till : string) {
        return await getRequest(`graph-data/companies/total-by-date?from=${from}&till=${till}`);
    }

    export async function getGraphChallengesWithMonth(from : string, till : string) {
        return await getRequest(`graph-data/challenges/filter/date?from=${from}&till=${till}`);
    }

    export async function getGraphChallengesWithStatus() {
        return await getRequest(`graph-data/challenges/status`);
    }

    export async function getGraphCompaniesWithBranches() {
        return await getRequest(`graph-data/companies/total-by-branch`);
    }

    export async function getGraphChallengesInputsWithMonth(from : string, till : string) {
        return await getRequest(`graph-data/challenge-inputs/filter/date?from=${from}&till=${till}`);
    }

    export async function getGraphCompanyChallengesWithMonth(from : string, till : string, companyId : number) {
        return await getRequest(`graph-data/company/${companyId}/challenges/filter/date?from=${from}&till=${till}`);
    }

    export async function getGraphCompanyChallengesWithStatus(companyId : number) {
        return await getRequest(`graph-data/company/${companyId}/challenges/status`);
    }

    export async function getGraphCompanyChallengesInputsWithMonth(from : string, till : string, companyId : number) {
        return await getRequest(`graph-data/company/${companyId}/challenge-inputs/filter/date?from=${from}&till=${till}`);
    }

    export async function getGraphCompanyDepartments(companyId : number) {
        return await getRequest(`graph-data/company/${companyId}/departments/users`);
    }

    export async function setNotificationToRead(id : number){
        return await putRequest(`notifications/read/${id}`, {});
    }

    export async function followCompanyAsLoggedInUser(id : number){
        return await putRequest(`company/${id}/follow`, {});
    }

    export async function stopFollowingCompanyAsLoggedInUser(id : number){
        return await putRequest(`company/${id}/unfollow`, {});
    }
}

export default API;
