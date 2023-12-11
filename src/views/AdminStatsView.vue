<template>
    <template v-if="!sessionStore.loggedInUser">
        U bent niet ingelogd
    </template>
    <template v-else>
        <Banner
            :banner-src="
                sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()
            "
            :logo-src="
                sessionStore.loggedInUser?.department?.parentCompany?.getProfileOrDefaultImageUrl()
            "
            :title="'Statistieken'"
            :subtitle="'Admin paneel'"
        >
        </Banner>
        <div :class="{'bg-aliceblue' : !isDarkmode, 'transparent': isDarkmode}"  style="padding: 1%">
            <v-row>
                <v-col cols="12" sm="4">
                    <v-card>
                        <apexchart
                            :options="ChallengeChartOptions"
                            :series="ChallengeChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card>
                        <apexchart
                            :options="UserChartOptions"
                            :series="UserChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="4">
                    <v-card>
                        <apexchart
                            :options="CompanyChartOptions"
                            :series="CompanyChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-card>
                        <apexchart
                            :options="ChallengeTimeChartOptions"
                            :series="ChallengeTimeChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card>
                        <apexchart
                            :options="ChallengeStatusChartOptions"
                            :series="ChallengeStatusChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <v-card>
                        <apexchart
                            :options="CompanyBranchChartOptions"
                            :series="CompanyBranchChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6">
                    <v-card>
                        <apexchart
                            :options="ChallengeInputChartOptions"
                            :series="ChallengeInputChartSeries"
                        ></apexchart>
                    </v-card>
                </v-col>
            </v-row>
        </div>
    </template>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import Banner from "@/components/Banner.vue";
import { Ref, computed, onMounted } from "vue";
import Api from "@/Api";
import { ref } from "vue";

const sessionStore = useSessionStore();
const totalChallenges = ref(0);
const totalUsers = ref(0);
const totalCompanies = ref(0);
const challengesTotalWithMonth: Ref<any> = ref({});
const usersTotalWithMonth: Ref<any> = ref({});
const companiesTotalWithMonth: Ref<any> = ref({});
const challengesWithMonth: Ref<any> = ref({});
const challengesWithStatus: Ref<any> = ref({});
const companiesWithBranches: Ref<any> = ref({});
const companiesWithBranchesFiltered: Ref<any> = ref({});
const challengesInputsWithMonth: Ref<any> = ref({});
const today = new Date().toISOString().split("T")[0];
const colorPalette = ["#00D8B6", "#008FFB", "#FEB019", "#FF4560", "#775DD0"];
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDarkmode = computed(()=>{
    return theme.global.name.value === 'dark'
})
onMounted(async () => {
    totalChallenges.value = await Api.getGraphChallenges();
    challengesTotalWithMonth.value = await Api.getGraphChallengesTotalWithMonth(
        "2023-01-01",
        today.toString(),
    );
    totalUsers.value = await Api.getGraphUsers();
    usersTotalWithMonth.value = await Api.getGraphUsersTotalWithMonth(
        "2019-01-01",
        today.toString(),
    );
    totalCompanies.value = await Api.getGraphCompanies();
    companiesTotalWithMonth.value = await Api.getGraphCompaniesTotalWithMonth(
        "2019-01-01",
        today.toString(),
    );

    challengesWithMonth.value = await Api.getGraphChallengesWithMonth(
        "2022-01-01",
        today.toString(),
    );

    challengesWithStatus.value = await Api.getGraphChallengesWithStatus();

    companiesWithBranches.value = await Api.getGraphCompaniesWithBranches();
    companiesWithBranchesFiltered.value = filterAndSortByValue(
        companiesWithBranches.value,
    );

    challengesInputsWithMonth.value =
        await Api.getGraphChallengesInputsWithMonth(
            "2023-01-01",
            today.toString(),
        );
});

const ChallengeChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            id: "challengechart",
            type: "area",
            width: "100%",
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: "straight",
        },
        fill: {
            opacity: 1,
        },
        labels: Object.entries(challengesTotalWithMonth.value).map(
            ([month, value]) => month.toLowerCase(),
        ),
        yaxis: {
            min: 0,
            show: false,
            labels: {
                formatter: function (val: any) {
                    return Math.floor(val);
                },
            },
        },
        xaxis: {},
        colors: ["#DCE6EC"],
        title: {
            text: totalChallenges.value,
            offsetX: 30,
            offsetY: 5,
            style: {
                fontSize: "24px",
            },
        },
        subtitle: {
            text: "Challenges",
            offsetX: 30,
            style: {
                fontSize: "14px",
            },
        },
    };
});
const ChallengeChartSeries = computed(() => {
    return [
        {
            name: "Aantal",
            data: Object.entries(challengesTotalWithMonth.value).map(
                ([month, value]) => value,
            ),
        },
    ];
});

const UserChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            id: "userchart",
            type: "area",
            width: "100%",
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: "straight",
        },
        fill: {
            opacity: 1,
        },
        labels: Object.entries(usersTotalWithMonth.value).map(
            ([month, value]) => month.toLowerCase(),
        ),
        yaxis: {
            min: 0,
            show: false,
            labels: {
                formatter: function (val: any) {
                    return Math.floor(val);
                },
            },
        },
        xaxis: {},
        colors: ["#DCE6EC"],
        title: {
            text: totalUsers.value,
            offsetX: 30,
            offsetY: 5,
            style: {
                fontSize: "24px",
            },
        },
        subtitle: {
            text: "Gebruikers",
            offsetX: 30,
            style: {
                fontSize: "14px",
            },
        },
    };
});

const UserChartSeries = computed(() => {
    return [
        {
            name: "Aantal",
            data: Object.entries(usersTotalWithMonth.value).map(
                ([month, value]) => value,
            ),
        },
    ];
});

const CompanyChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            id: "companychart",
            type: "area",
            width: "100%",
            sparkline: {
                enabled: true,
            },
        },
        stroke: {
            curve: "straight",
        },
        fill: {
            opacity: 1,
        },
        labels: Object.entries(companiesTotalWithMonth.value).map(
            ([month, value]) => month.toLowerCase(),
        ),
        yaxis: {
            show: false,
            labels: {
                formatter: function (val: any) {
                    return Math.floor(val);
                },
            },
        },
        xaxis: {},
        colors: ["#DCE6EC"],
        title: {
            text: totalCompanies.value,
            offsetX: 30,
            offsetY: 5,
            style: {
                fontSize: "24px",
            },
        },
        subtitle: {
            text: "Bedrijven",
            offsetX: 30,
            style: {
                fontSize: "14px",
            },
        },
    };
});

const CompanyChartSeries = computed(() => {
    return [
        {
            name: "Aantal",
            data: Object.entries(companiesTotalWithMonth.value).map(
                ([month, value]) => value,
            ),
        },
    ];
});

const ChallengeTimeChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            id: "challengeTimeChart",
            type: "line",
            width: "100%",
            zoom: {
                enabled: true,
            },
        },
        plotOptions: {
            stroke: {
                width: 4,
                curve: "smooth",
            },
        },
        colors: colorPalette,
        title: {
            floating: false,
            text: "Challenges",
            align: "left",
            style: {
                fontSize: "18px",
            },
        },
        markers: {
            size: 0,
        },
        labels: Object.entries(challengesWithMonth.value).map(
            ([month, value]) =>
                month.toLowerCase().slice(0, 3) +
                "-" +
                month.toLowerCase().slice(-2),
        ),
        grid: {},
        xaxis: {
            range: 18,
            labels: {
                show: true,
            },
            axisTicks: {
                show: false,
            },
            tooltip: {
                enabled: true,
            },
        },
        yaxis: {
            labels: {
                show: false,
                formatter: function (val: any) {
                    return Math.floor(val);
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            min: 0,
        },
        legend: {
            position: "top",
            horizontalAlign: "left",
            offsetY: -20,
            offsetX: -30,
        },
        tooltip: {
            x: {
                show: false,
            }
        },
    };
});

const ChallengeTimeChartSeries = computed(() => {
    return [
        {   
            name: "Aantal",
            data: Object.entries(challengesWithMonth.value).map(
                ([month, value]) => value,
            ),
        },
    ];
});

const ChallengeStatusChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            id: "challengeStatusChart",
            type: "donut",
            width: "100%",
        },
        dataLabels: {
            enabled: true,
        },
        plotOptions: {
            pie: {
                customScale: 0.8,
                donut: {
                    size: "75%",
                },
            },
            stroke: {
                colors: undefined,
            },
        },
        colors: colorPalette,
        title: {
            text: "Challenge status",
            style: {
                fontSize: "18px",
            },
        },
        labels: Object.entries(challengesWithStatus.value).map(
            ([status, value]) =>
                status.charAt(0).toUpperCase() +
                status
                    .slice(1)
                    .toLowerCase()
                    .replaceAll("_", " ")
                    .replace("ideeen", "ideeën"),
        ),
        legend: {
            position: "left",
            offsetY: 80,
        },
    };
});

const ChallengeStatusChartSeries = computed(() => {
    return Object.entries(challengesWithStatus.value).map(
        ([status, value]) => value,
    );
});

const CompanyBranchChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            type: "bar",
        },
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                barHeight: "80%",
                isFunnel: true,
            },
        },
        colors: colorPalette,
        dataLabels: {
            enabled: true,
            dropShadow: {
                enabled: true,
            },
            formatter: function (val: any, opt: any) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
            },
        },
        title: {
            text: "Branches",
            style: {
                fontSize: "18px",
            },
        },
        xaxis: {
            show: false,
            categories: Object.entries(companiesWithBranchesFiltered.value).map(
                ([branch, value]) =>
                    branch.charAt(0).toUpperCase() +
                    branch.slice(1).toLowerCase(),
            ),
        },
        yaxis: {
            show: false,
            labels: {
                formatter: function (val: any) {
                    return Math.floor(val);
                },
            },
        },
        legend: {
            show: false,
        },
        tooltip: {
            x: {
                show: false,
            }
        },
    };
});

const CompanyBranchChartSeries = computed(() => {
    return [
        {
            name: "Aantal",
            data: Object.entries(companiesWithBranchesFiltered.value).map(
                ([branch, value]) => (value ? value : null),
            ),
        },
    ];
});

const ChallengeInputChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            type: "bar",
            width: "100%",
            stacked: true,
        },
        plotOptions: {
            bar: {
                columnWidth: "45%",
            },
        },
        colors: colorPalette,
        labels: Object.entries(challengesInputsWithMonth.value).map(
            ([month, value]) => month.toLowerCase().slice(5, 8),
        ),
        xaxis: {
            labels: {
                show: true,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            labels: {
                style: {
                    colors: "#78909c",
                },
                formatter: function (val: any) {
                    return val.toFixed(0);
                },
            },
        },
        title: {
            text: "Reacties op challenges",
            align: "left",
            style: {
                fontSize: "18px",
            },
        },
    };
});

const ChallengeInputChartSeries = computed(() => {
    return [
        {
            name: "Reacties",
            data: Object.entries(challengesInputsWithMonth.value).map(
                ([month, value]) => value,
            ),
        },
    ];
});

interface InputObject {
    [key: string]: number;
}

function filterAndSortByValue(obj: InputObject): InputObject {
    const filteredArray = Object.entries(obj)
        .filter(([, value]) => value !== 0)
        .sort(([, valueA], [__, valueB]) => valueB - valueA);

    const sortedObj: InputObject = Object.fromEntries(filteredArray);
    return sortedObj;
}
</script>
