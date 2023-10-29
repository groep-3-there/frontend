import { User } from "./models/User"


function postRequest(url: string, bodyObject: {}) {
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        mode: "cors",
        credentials: "include",
        body: JSON.stringify(bodyObject)
    })
}

function getRequest(url: string) {
    return fetch(url, {
        method: "GET",
        headers: API.headers,
        mode: "cors",
        credentials: "include"
    })
}


namespace API {

    const BASEURL = "http://localhost:3001/"

    export const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    }

    export function example() {
        return getRequest(BASEURL + "example")
    }

    export function getFakeUser(){
        return {name: "John", email: "john@email.com"} as User
    }



}


export default API