import { Challenge } from "./models/Challenge";
import { User } from "./models/User";

function postRequest(url: string, bodyObject: {}) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://localhost:3000",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(bodyObject),
  });
}

function getRequest(url: string) {
  return fetch(url, {
    method: "GET",
    headers: API.headers,
    mode: "cors",
    credentials: "include",
  });
}

namespace API {
  const BASEURL = "http://localhost:3001/";

  export const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  };

  export function example() {
    return getRequest(BASEURL + "example");
  }

  export function getFakeUser() {
    return { name: "John", email: "john@email.com" } as User;
  }

  export function getFakeChallenges() {
    const challenges = [
      {
        id: 1,
        authorId: 1,
        departmentId: 1,
        companyId: 1,
        title: "Website voor de bakker",
        description: `Ik ben op zoek naar een getalenteerde webdesigner/ontwikkelaar die
                mijn kleine bakkerij naar het digitale tijdperk kan brengen. Mijn
                doel is om een gebruiksvriendelijke website te creëren waarmee
                klanten eenvoudig ons uitgebreide assortiment kunnen..............`,
        bannerId: 1,
        concludingRemarks: "Concluding Remarks 1",
        status: "openvoorideeen",
        createdAt: new Date(),
        endDate: new Date(),
        tags: ["AI", "website"],
        isPublicViewable: true,
        isPublicReactable: true,
      } as Challenge,
      {
        id: 2,
        authorId: 2,
        departmentId: 1,
        companyId: 2,
        title: "Innovatie kapperszaak",
        description: `Ik ben op zoek naar een getalenteerde webdesigner/ontwikkelaar die een nieuwe website maakt voor mijn kapperszaak. Mijn doel is om een gebruiksvriendelijke website te creëren waarmee klanten eenvoudig ons uitgebreide assortiment kunnen..............`,
        bannerId: 2,
        concludingRemarks: "Concluding Remarks 1",
        status: "openvoorideeen",
        createdAt: new Date(),
        endDate: new Date(),
        tags: ["Systeem", "website"],
        isPublicViewable: true,
        isPublicReactable: true,
      } as Challenge,
    ];
    return challenges;
  }
}

export default API;
