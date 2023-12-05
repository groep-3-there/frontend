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
        <div style="background-color:aliceblue;">
        <v-row>
            <v-col>
                <apexchart :options="ChallengeChartoptions" :series="ChallengeChartSeries"></apexchart>
            </v-col>
            <v-col>
                <apexchart :options="UserChartoptions" :series="UserChartSeries"></apexchart>
            </v-col>
            <v-col>
                <apexchart :options="CompanyChartoptions" :series="CompanyChartSeries"></apexchart>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <apexchart :options="ChallengeTimeChartOptions" :series="ChallengeTimeChartSeries"></apexchart>
            </v-col>
            <v-col>
                <apexchart :options="ChallengeStatusChartOptions" :series="ChallengeStatusChartSeries"></apexchart>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
              <apexchart :options="ChallengeInputChartOptions" :series="ChallengeInputChartSeries"></apexchart>
            </v-col>
            <v-col>
                <div>{{ totalChallenges }}</div>
                <div>{{ challengesWithMonth }}</div>
            </v-col>
        </v-row>
    </div>
</template>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import Banner from "@/components/Banner.vue";
import { onMounted } from "vue";
import Api from "@/Api";
import { ref } from "vue";

const sessionStore = useSessionStore();
const totalChallenges = ref(0);
const challengesWithMonth= ref([])
const today = new Date().toISOString().split('T')[0] 
console.log(today)
let colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

onMounted(async () => {
    totalChallenges.value = await Api.getGraphChallenges()
    challengesWithMonth.value = await Api.getGraphChallengesWithMonth("2000-01-01", today.toString())
})

let ChallengeChartoptions = {
    chart: {
    id: 'challengechart',
    type: 'area',
    width: '100%',
    background: '#fff',
    sparkline: {
      enabled: true
    },
  },
  methods:{
      updateChart(){
        ChallengeChartoptions = {
          ...ChallengeChartoptions, ...{
          title: {
            text: totalChallenges.value,
            offsetX: 30,
            offsetY: 5,
            style: {
              fontSize: '24px',
            }
          },
        }
      }
        }
  },
  stroke: {
    curve: 'straight'
  },
  fill: {
    opacity: 1,
  },
  yaxis: {
    min: 0
  },
  xaxis: {
    type: 'month',
  },
  colors: ['#DCE6EC'],
  title: {
    text: totalChallenges.value,
    offsetX: 30,
    offsetY: 5,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Challenges',
    offsetX: 30,
    style: {
      fontSize: '14px',
      
    }
  }
}
let ChallengeChartSeries = [{
          data: ["JANUARY":30, 40, 45, 50, 49, 60, 70, 81]
        }];

challengesWithMonth.value.forEach((challenge: any) => {
  ChallengeChartSeries.push({
    data: [challenge.count],
  })
})

let UserChartoptions = {
    chart: {
    id: 'userchart',
    type: 'area',
    width: '100%',
    background: '#fff',
    sparkline: {
      enabled: true
    },
  },
  stroke: {
    curve: 'straight'
  },
  fill: {
    opacity: 1,
  },
  labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
  yaxis: {
    min: 0
  },
  xaxis: {
    type: 'datetime',
  },
  colors: ['#DCE6EC'],
  title: {
    text: '74324',
    offsetX: 30,
    offsetY: 5,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Gebruikers',
    offsetX: 30,
    style: {
      fontSize: '14px',
      
    }
  }
}

let UserChartSeries = [{
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }];

let CompanyChartoptions = {
    chart: {
    id: 'companychart',
    type: 'area',
    width: '100%',
    background: '#fff',
    sparkline: {
      enabled: true
    },
  },
  stroke: {
    curve: 'straight'
  },
  fill: {
    opacity: 1,
  },
  labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
  yaxis: {
    min: 0
  },
  xaxis: {
    type: 'datetime',
  },
  colors: ['#DCE6EC'],
  title: {
    text: '3542',
    offsetX: 30,
    offsetY: 5,
    style: {
      fontSize: '24px',
    }
  },
  subtitle: {
    text: 'Bedrijven',
    offsetX: 30,
    style: {
      fontSize: '14px',
      
    }
  }
}

let CompanyChartSeries = [{
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }];

let ChallengeTimeChartOptions = {
  chart: {
    id: 'challengeTimeChart',
    type: 'line',
    width: '100%',
    background: '#fff',
    zoom: {
      enabled: true
    }
  },
  plotOptions: {
    stroke: {
      width: 4,
      curve: 'smooth'
    },
  },
  colors: colorPalette,
  title: {
    floating: false,
    text: 'Challenges',
    align: 'left',
    style: {
      fontSize: '18px'
    }
  },
  subtitle: {
    text: '4269',
    align: 'center',
    margin: 30,
    offsetY: 40,
    style: {
      color: '#222',
      fontSize: '24px',
    }
  },
  markers: {
    size: 0
  },

  grid: {

  },
  xaxis: {
    labels: {
      show: true
    },
    axisTicks: {
      show: false
    },
    tooltip: {
      enabled: true
    }
  },
  yaxis: {
    tickAmount: 2,
    labels: {
      show: false
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false
    },
    min: 0,
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    offsetY: -20,
    offsetX: -30
  }
}

let ChallengeTimeChartSeries = [
    
    {
      name: "Day Time",
      data: trigoSeries(21, 20)
    },
    {
      name: "Night Time",
      data: trigoSeries(21, 27)
    }
    
];

let ChallengeStatusChartOptions = {
  chart: {
      id: 'challengeStatusChart',
      type: 'donut',
      width: '100%',
      background: '#fff'
  },
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      customScale: 0.8,
      donut: {
        size: '75%',
      },
      
    },
    stroke: {
      colors: undefined
    }
  },
  colors: colorPalette,
  title: {
    text: 'Challenge status',
    style: {
      fontSize: '18px'
    }
  },
  labels: ['Open voor ideeën', 'In uitvoering', 'Afgerond', 'Gearchiveerd'],
  legend: {
    position: 'left',
    offsetY: 80
  },
};

let ChallengeStatusChartSeries = [21, 23, 19, 14]; 

var ChallengeInputChartOptions = {
  chart: {
    type: 'bar',
    width: '100%',
    background: '#fff',
    stacked: true,
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
    }
  },
  colors: colorPalette,
  labels: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Aug','Sep','Okt','Nov','Dec'],
  xaxis: {
    labels: {
      show: true
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
  },
  yaxis: {
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    },
    labels: {
      style: {
        colors: '#78909c'
      }
    }
  },
  title: {
    text: 'Reacties op challenges',
    align: 'left',
    style: {
      fontSize: '18px'
    }
  }

}

let ChallengeInputChartSeries = [{
  name: "Reacties",
    data: [42, 52, 16, 55, 59, 51, 45, 32, 26, 33, 44, 51],
}]

// async function updateChart() {
//    const max = 90;
//    const min = 20;
//    const newData = series[0].data.map(() => {
//      return Math.floor(Math.random() * (max - min + 1)) + min
//    })
//    // In the same way, update the series option
//    series = [{
//     data: newData
//    }]
// }


function trigoSeries(cnt: number, strength: number) {
  var data = [];
  for (var i = 0; i < cnt; i++) {
      data.push((Math.sin(i / strength) * (i / strength) + i / strength+1) * (strength*2));
  }

  return data;
}

</script>