import { Challenge } from "./models/Challenge"
import { ChallengeInput } from "./models/ChallengeInput"
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

    export function getFakeChallenge(){
        const ch = {
            id: 1,
            authorId: 2,
            departmentId: 3,
            companyId: 4,
            summary: "Ik ben Eline, de eigenaar van Kapperszaak Eline, en ik zoek hulp van ICT-experts om de klantretentie te verbeteren. Ik geloof sterk in technologie om de klantbeleving te verbeteren en heb enkele vragen over loyaliteitsprogramma's, online boekingssystemen, klantcommunicatie, feedbackverzameling en personalisatie. Ik nodig experts uit om hun ideeën en suggesties te delen, en het beste idee wordt beloond met €45,- en een kans om betrokken te zijn bij de ontwikkelingsfase. Bedankt voor jullie betrokkenheid en expertise.",
            title: 'Sample Challenge',
            description: `Ik ben Eline, de trotse eigenaar van Kapperszaak Eline, een bloeiende kapsalon waar we met liefde en passie werken om onze klanten er op hun best uit te laten zien en zich geweldig te laten voelen. Sinds de opening van mijn salon heb ik het voorrecht gehad om vele geweldige mensen te ontmoeten en hun haarwensen te vervullen. Echter, in de altijd veranderende wereld van vandaag staan we voor de uitdaging om onze klanten vaker terug te laten komen en hun tevredenheid te vergroten.
        
        Om deze uitdaging aan te gaan, ben ik op zoek naar de hulp en ideeën van experts op het gebied van informatietechnologie (ICT). Ik geloof sterk in de kracht van technologie om ons bedrijf te verbeteren en de klantbeleving te verrijken. Daarom roep ik jullie op om met innovatieve ideeën te komen die ons kunnen helpen klanten vaker terug te laten komen en de band met onze salon te versterken.
        Enkele van de vragen waar ik graag jullie inzicht over zou willen:
        
        Loyaliteitsprogramma's: Hoe kunnen we effectieve loyaliteitsprogramma's opzetten die klanten aanmoedigen om regelmatig terug te komen voor onze diensten?
        Online boekingssystemen: Welke geavanceerde online boekingssystemen kunnen we implementeren om het boekingsproces voor klanten te verbeteren en hun ervaring te vereenvoudigen?
        Klantcommunicatie: Wat zijn de beste manieren om met onze klanten in contact te blijven via digitale kanalen, zoals e-mailmarketing, sociale media en sms-herinneringen?
        Feedbackverzameling: Hoe kunnen we gestructureerd feedback verzamelen van klanten om onze diensten continu te verbeteren?
        Personalisatie: Op welke manieren kunnen we personalisatie gebruiken om de klanttevredenheid te verhogen?
        Als expert op het gebied van informatietechnologie of als iemand met waardevolle inzichten over klantretentie, nodig ik jullie uit om jullie ideeën, suggesties en ervaringen te delen. Samen kunnen we de toekomst van Kapperszaak Eline vormgeven en onze klanten de best mogelijke ervaring bieden.
        Ik kijk uit naar jullie bijdragen en ben enthousiast om te zien welke innovatieve oplossingen we kunnen bedenken om ons bedrijf te laten groeien.
        Hartelijk dank voor jullie betrokkenheid en expertise.
        
        Het beste idee zal ik belonen met 45,-
        en een mogelijkheid om betrokken te zijn bij ontwikkelingsfase`,
            bannerId: 5,
            concludingRemarks: 'These are the concluding remarks for the sample challenge',
            contactInformation: `Mocht je contact op willen nemen buiten het platform, stuur mij een email op Eline@mail.com`,
            status: 'active',
            createdAt: new Date(),
            endDate: new Date(),
            tags: ['sample', 'challenge'],
            isPublicViewable: true,
            isPublicReactable: true
        } as Challenge;

        return ch as Challenge
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

}


export default API