import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
});

test('get a challenge', async ({ page }) => {
    await page.route('*/**/api/v1/challenge/search?', async (route) => {
        const json = {
            "content": [
              {
                "id": 1,
                "author": {
                  "id": 2,
                  "firebaseId": "9gJQuvQ2h8PxIvVPae8oTN9ukMW2",
                  "name": "Eline de Groot",
                  "info": "Hoiii ik ben Eline, enthousiaste kapster.",
                  "tags": "kapper,technologie,innovatie",
                  "createdAt": "2020-01-01",
                  "lastSeen": null,
                  "avatarImageId": null,
                  "isEmailPublic": true,
                  "isPhoneNumberPublic": true,
                  "acceptedTosDate": "2020-01-01",
                  "email": "challenger@kapper.nl",
                  "phoneNumber": "0630384453",
                  "role": {
                    "id": 2,
                    "name": "Challenger",
                    "createdAt": "2020-01-01",
                    "isMatchmaker": false,
                    "isDepartmentAdmin": false,
                    "isAssignable": true,
                    "permissions": [
                      {
                        "id": 1,
                        "codeName": "CHALLENGE_READ",
                        "description": "Het bekijken van een challenge en reacties achterlaten",
                        "fancyName": "Challenge bekijken"
                      },
                      {
                        "id": 3,
                        "codeName": "CHALLENGE_MANAGE",
                        "description": "Het beheren van een challenge & kiezen van reacties",
                        "fancyName": "Beheer challenge"
                      }
                    ],
                    "assignable": true,
                    "departmentAdmin": false,
                    "matchmaker": false
                  },
                  "department": {
                    "id": 1,
                    "name": "Management",
                    "parentCompany": {
                      "id": 1,
                      "name": "Kapper Eline",
                      "info": "Kapper Eline is een kapper die niet stilstaat, ik sta voorop in de technologische ontwikkelingen",
                      "profileImageId": null,
                      "bannerImageId": null,
                      "tags": "kapper,innovatie",
                      "branch": {
                        "id": 7,
                        "name": "Gezondheidszorg en maatschappelijke dienstverlening"
                      },
                      "createdAt": "2020-01-01",
                      "ownerId": 1,
                      "country": {
                        "code": "NL",
                        "name": "Netherlands"
                      }
                    },
                    "createdAt": "2020-01-01"
                  },
                  "phoneNumberPublic": true,
                  "emailPublic": true,
                  "inCompany": true
                },
                "department": {
                  "id": 2,
                  "name": "Logistiek",
                  "parentCompany": {
                    "id": 2,
                    "name": "LogiTech Solutions BV",
                    "info": "LogiTech BV informatie...",
                    "profileImageId": null,
                    "bannerImageId": null,
                    "tags": "logistiek,proces",
                    "branch": {
                      "id": 11,
                      "name": "Industrie"
                    },
                    "createdAt": "2022-01-02",
                    "ownerId": 1,
                    "country": {
                      "code": "NL",
                      "name": "Netherlands"
                    }
                  },
                  "createdAt": "2020-01-01"
                },
                "contactInformation": "Mocht je contact op willen nemen buiten het platform, stuur mij een email op Eline@mail.com",
                "title": "Optimalisatie van Logistieke Processen met Machine Learning",
                "description": "LogiTech Solutions BV staat voor een uitdagend vraagstuk en zoekt naar innovatieve oplossingen om onze logistieke processen te optimaliseren. In een voortdurend veranderende markt streven we ernaar om de doorlooptijd te verkorten, kosten te verlagen en duurzaamheid te bevorderen. Wij geloven dat de integratie van machine learning-technologieën een cruciale rol kan spelen in het realiseren van deze doelstellingen.\r\n\r\nWe zijn geïnteresseerd in voorstellen die niet alleen gebruikmaken van geavanceerde technologieën zoals IoT, machine learning en automatisering, maar die ook gericht zijn op het begrijpen en aanpakken van specifieke uitdagingen binnen onze logistieke keten. Hoe kunnen we machine learning inzetten om de efficiëntie van onze voorraadbeheerprocessen te verbeteren? Welke mogelijkheden zijn er om voorspellende analyses toe te passen op orderverwerking en verzending?\r\n\r\nWe nodigen bedrijven en professionals uit om met creatieve en praktische oplossingen te komen die ons kunnen helpen een concurrentievoordeel te behalen, terwijl we tegelijkertijd duurzame bedrijfspraktijken omarmen. Samen streven we naar een toekomst van geoptimaliseerde logistieke processen die niet alleen kostenbesparend zijn, maar ook milieuvriendelijk.",
                "bannerImageId": null,
                "concludingRemarks": "",
                "summary": "LogiTech Solutions BV zoekt naar innovatieve oplossingen voor de optimalisatie van logistieke processen. De uitdaging omvat het verkorten van doorlooptijden, kostenverlaging en het bevorderen van duurzaamheid, met specifieke interesse in het benutten van machine learning-technologieën. Bedrijven en professionals worden uitgenodigd om creatieve voorstellen in te dienen die gericht zijn op specifieke uitdagingen binnen de logistieke keten.",
                "status": "OPEN_VOOR_IDEEEN",
                "createdAt": "2023-01-01",
                "endDate": "2024-02-02",
                "tags": "logistiek,optimalisatie,AI,Machine Learning",
                "imageAttachmentsIds": [],
                "visibility": "PUBLIC"
              },
            ],
            "pageable": {
              "pageNumber": 0,
              "pageSize": 10,
              "sort": {
                "empty": false,
                "unsorted": false,
                "sorted": true
              },
              "offset": 0,
              "paged": true,
              "unpaged": false
            },
            "last": true,
            "totalPages": 1,
            "totalElements": 2,
            "size": 10,
            "number": 0,
            "sort": {
              "empty": false,
              "unsorted": false,
              "sorted": true
            },
            "first": true,
            "numberOfElements": 2,
            "empty": false
          };
        await route.fulfill({ json });
    });

    await page.route('*/**/api/v1/reaction/challenge/1', async (route) => {
      const json = {
        "id": 1,
        "author": {
          "id": 2,
          "firebaseId": "9gJQuvQ2h8PxIvVPae8oTN9ukMW2",
          "name": "Eline de Groot",
          "info": "Hoiii ik ben Eline, enthousiaste kapster.",
          "tags": "kapper,technologie,innovatie",
          "createdAt": "2020-01-01",
          "lastSeen": null,
          "avatarImageId": null,
          "isEmailPublic": true,
          "isPhoneNumberPublic": true,
          "acceptedTosDate": "2020-01-01",
          "email": "challenger@kapper.nl",
          "phoneNumber": "0630384453",
          "role": {
            "id": 2,
            "name": "Challenger",
            "createdAt": "2020-01-01",
            "isMatchmaker": false,
            "isDepartmentAdmin": false,
            "isAssignable": true,
            "permissions": [
              {
                "id": 1,
                "codeName": "CHALLENGE_READ",
                "description": "Het bekijken van een challenge en reacties achterlaten",
                "fancyName": "Challenge bekijken"
              },
              {
                "id": 3,
                "codeName": "CHALLENGE_MANAGE",
                "description": "Het beheren van een challenge & kiezen van reacties",
                "fancyName": "Beheer challenge"
              }
            ],
            "assignable": true,
            "departmentAdmin": false,
            "matchmaker": false
          },
          "department": {
            "id": 1,
            "name": "Management",
            "parentCompany": {
              "id": 1,
              "name": "Kapper Eline",
              "info": "Kapper Eline is een kapper die niet stilstaat, ik sta voorop in de technologische ontwikkelingen",
              "profileImageId": null,
              "bannerImageId": null,
              "tags": "kapper,innovatie",
              "branch": {
                "id": 7,
                "name": "Gezondheidszorg en maatschappelijke dienstverlening"
              },
              "createdAt": "2020-01-01",
              "ownerId": 1,
              "country": {
                "code": "NL",
                "name": "Netherlands"
              }
            },
            "createdAt": "2020-01-01"
          },
          "phoneNumberPublic": true,
          "emailPublic": true,
          "inCompany": true
        },
        "department": {
          "id": 2,
          "name": "Logistiek",
          "parentCompany": {
            "id": 2,
            "name": "LogiTech Solutions BV",
            "info": "LogiTech BV informatie...",
            "profileImageId": null,
            "bannerImageId": null,
            "tags": "logistiek,proces",
            "branch": {
              "id": 11,
              "name": "Industrie"
            },
            "createdAt": "2022-01-02",
            "ownerId": 1,
            "country": {
              "code": "NL",
              "name": "Netherlands"
            }
          },
          "createdAt": "2020-01-01"
        },
        "contactInformation": "Mocht je contact op willen nemen buiten het platform, stuur mij een email op Eline@mail.com",
        "title": "Optimalisatie van Logistieke Processen met Machine Learning",
        "description": "LogiTech Solutions BV staat voor een uitdagend vraagstuk en zoekt naar innovatieve oplossingen om onze logistieke processen te optimaliseren. In een voortdurend veranderende markt streven we ernaar om de doorlooptijd te verkorten, kosten te verlagen en duurzaamheid te bevorderen. Wij geloven dat de integratie van machine learning-technologieën een cruciale rol kan spelen in het realiseren van deze doelstellingen.\r\n\r\nWe zijn geïnteresseerd in voorstellen die niet alleen gebruikmaken van geavanceerde technologieën zoals IoT, machine learning en automatisering, maar die ook gericht zijn op het begrijpen en aanpakken van specifieke uitdagingen binnen onze logistieke keten. Hoe kunnen we machine learning inzetten om de efficiëntie van onze voorraadbeheerprocessen te verbeteren? Welke mogelijkheden zijn er om voorspellende analyses toe te passen op orderverwerking en verzending?\r\n\r\nWe nodigen bedrijven en professionals uit om met creatieve en praktische oplossingen te komen die ons kunnen helpen een concurrentievoordeel te behalen, terwijl we tegelijkertijd duurzame bedrijfspraktijken omarmen. Samen streven we naar een toekomst van geoptimaliseerde logistieke processen die niet alleen kostenbesparend zijn, maar ook milieuvriendelijk.",
        "bannerImageId": null,
        "concludingRemarks": "",
        "summary": "LogiTech Solutions BV zoekt naar innovatieve oplossingen voor de optimalisatie van logistieke processen. De uitdaging omvat het verkorten van doorlooptijden, kostenverlaging en het bevorderen van duurzaamheid, met specifieke interesse in het benutten van machine learning-technologieën. Bedrijven en professionals worden uitgenodigd om creatieve voorstellen in te dienen die gericht zijn op specifieke uitdagingen binnen de logistieke keten.",
        "status": "OPEN_VOOR_IDEEEN",
        "createdAt": "2023-01-01",
        "endDate": "2024-02-02",
        "tags": "logistiek,optimalisatie,AI,Machine Learning",
        "imageAttachmentsIds": [],
        "visibility": "PUBLIC"
      };
      await route.fulfill({ json });
    });

         

    await page.goto('http://localhost:3000/');
    await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
    await page.locator('div').filter({ hasText: /^Zoeken$/ }).first().click();
    await page.getByText('LogiTech Solutions BV zoekt').click();
    await page.getByText('LogiTech Solutions BV zoekt').click();
    await expect(page.getByRole('heading', { name: 'Optimalisatie van Logistieke' })).toBeVisible();
});