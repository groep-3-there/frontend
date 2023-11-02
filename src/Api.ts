import { Challenge } from "./models/Challenge"
import { ChallengeInput } from "./models/ChallengeInput"
import { User } from "./models/User"


async function postRequest<T>(url: string, bodyObject: {}) {
    const res = await fetch(API.BASEURL + url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000"
        },
        mode: "cors",
        // credentials: "include",
        body: JSON.stringify(bodyObject)
    })
    return await res.json() as T
}

async function getRequest<T>(url: string) {
    const res = await fetch(API.BASEURL + url, {
        method: "GET",
        headers: API.headers,
        mode: "cors",
        // credentials: "include"
    })
    return await res.json() as T
}

namespace API {

    export const BASEURL = "http://localhost:8080/api/v1/"

    export const headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000"
    }

    export function createChallenge(ch: {}){
        return postRequest("challenge", ch)
    }

    export function getFakeChallengeInput(){
        const dummyChallengeInput =  {
            id: 1,
            authorId: 2,
            type : 'idee',
            text : `Wat een opwindende kans om met jou samen te werken aan het verbeteren van de klantretentie bij Kapperszaak Eline! Ik ben Floris, een ervaren ontwikkelaar met een passie voor het creëren van innovatieve IT-oplossingen die bedrijven helpen groeien en klantrelaties versterken.
            Ik heb enkele gedachten die ik graag met je deel:
            Loyaliteitsapp: Laten we een op maat gemaakte loyaliteitsapp ontwikkelen waarmee klanten punten kunnen verdienen voor elke afspraak die ze maken of vrienden die ze doorverwijzen. Deze punten kunnen ze inwisselen voor kortingen op toekomstige diensten, waardoor ze gestimuleerd worden om terug te komen.
            Geautomatiseerde herinneringen: We kunnen geautomatiseerde sms- en e-mailherinneringen opzetten voor klanten om hen eraan te herinneren wanneer het tijd is voor hun volgende afspraak. Dit kan hun betrokkenheid vergroten en het aantal no-shows verminderen.
            Online afspraakoptimalisatie: Ik kan een intuïtief online boekingssysteem ontwikkelen met realtime beschikbaarheid, waardoor klanten gemakkelijk afspraken kunnen plannen op basis van hun voorkeuren.
            Feedbackplatform: Laten we een feedbackplatform implementeren waarmee klanten na elke afspraak hun ervaring kunnen beoordelen en suggesties kunnen doen. Dit geeft jou waardevolle inzichten om de dienstverlening te verbeteren.
            Klantprofielen: We kunnen ook klantprofielen maken om hun voorkeuren, stijl en geschiedenis bij te houden, waardoor je gepersonaliseerde aanbevelingen kunt doen en speciale aanbiedingen kunt aanpassen.
            Ik ben enthousiast om met jou samen te werken aan deze projecten en de Kapperszaak Eline-ervaring te verbeteren. Laten we een gesprek aangaan om de details te bespreken en een plan te maken om deze ideeën tot leven te brengen.`,
            isChosenAnswer: true,
            createdAt : new Date()
        } as ChallengeInput;
        return dummyChallengeInput as ChallengeInput
    }


    /**
     * Get the current logged in user
     */
    export async function getCurrentUser(){
        return getRequest<User>("auth/user")
    }

    export async function getChallengeById(id : number){
        return getRequest<Challenge>(`challenge/${id}`)
    }

    export async function getChallengesBySearch(){
        return getRequest("challenge/search");
    }


}


export default API
