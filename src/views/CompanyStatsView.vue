<template>
    <template v-if="!sessionStore.loggedInUser">
        U bent niet ingelogd
    </template>
    <template v-else>
        <Banner :banner-src="sessionStore.loggedInUser?.department?.parentCompany.getBannerForCompany()
            " :logo-src="sessionStore.loggedInUser?.department?.parentCompany?.getProfileOrDefaultImageUrl()
        " :title="'Statistieken'" :subtitle="'Dashboard'">
        </Banner>
        <div style="padding: 1%" :class="{'bg-aliceblue' : !isDarkmode, 'transparent': isDarkmode}">
            <v-row>
                <v-col cols="12" sm="6">
                    <apexchart :options="ChallengeStatusChartOptions" :series="ChallengeStatusChartSeries"></apexchart>
                </v-col>
                <v-col cols="12" sm="6">
                    <apexchart :options="DepartmentChartOptions" :series="DepartmentChartSeries"></apexchart>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6">
                    <apexchart :options="ChallengeInputChartOptions" :series="ChallengeInputChartSeries"></apexchart>
                </v-col>
                <v-col cols="12" sm="6">
                    <apexchart :options="ChallengeTimeChartOptions" :series="ChallengeTimeChartSeries"></apexchart>
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
import { Company } from "@/models/Company";
import { useRoute } from "vue-router";

const sessionStore = useSessionStore();
const company: Ref<Company | null> = ref(null);

const idParam = useRoute().params.id;
let id = Number(Array.isArray(idParam) ? idParam[0] : idParam);

const challengesWithStatus: Ref<any> = ref({})
const challengesWithMonth: Ref<any> = ref({});
const challengesInputsWithMonth: Ref<any> = ref({});
const departmentsWithStaff: Ref<any> = ref({});
const today = new Date().toISOString().split("T")[0];
const colorPalette = ["#00D8B6", "#008FFB", "#FEB019", "#FF4560", "#775DD0"];
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDarkmode = computed(()=>{
    return theme.global.name.value === 'dark'
})

onMounted(async () => {
    if (id) {
        company.value = await Api.getCompany(id);
    }

    if (company.value) {
        challengesWithMonth.value = await Api.getGraphCompanyChallengesWithMonth(
            "2022-01-01",
            today.toString(),
            company.value.id,
        );

        challengesWithStatus.value = await Api.getGraphCompanyChallengesWithStatus(
            company.value.id,
        );

        challengesInputsWithMonth.value = await Api.getGraphCompanyChallengesInputsWithMonth(
            "2023-01-01",
            today.toString(),
            company.value.id,
        );

        departmentsWithStaff.value = await Api.getGraphCompanyDepartments(
            company.value.id,
        );
    }
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

const DepartmentChartOptions = computed(() => {
    return {
        theme:{
            mode: isDarkmode.value ? 'dark' : 'light'
        },
        chart: {
            type: 'polarArea',
            width: "100%",
        },
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 1
        },
        labels: Object.entries(departmentsWithStaff.value).map(
            ([department, value]) => department),
        yaxis: {
            show: false
        },
        title: {
            text: "Afdelingen",
            style: {
                fontSize: "18px",
            },
        }

    }
});

const DepartmentChartSeries = computed(() => {
    return Object.entries(departmentsWithStaff.value).map(
                ([month, value]) => value,)  
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
</script>
