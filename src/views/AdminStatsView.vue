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
        <div style="background-color:aliceblue;" class="dflex justify-space-around">
        <v-row>
            <v-col>
                <apexchart width="300" type="area" :options="ChallengeChartoptions" :series="ChallengeChartseries"></apexchart>
            </v-col>
            <v-col>
                <apexchart width="300" type="area" :options="UserChartoptions" :series="UserChartseries"></apexchart>
            </v-col>
            <v-col>
                <apexchart width="300" type="area" :options="CompanyChartoptions" :series="CompanyChartseries"></apexchart>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <apexchart width="450" type="line" :options="ChallengeTimeChartOptions" :series="ChallengeTimeChartseries"></apexchart>
            </v-col>
            <v-col>
                <apexchart width="450" type="donut" :options="ChallengeStatusChartOptions" :series="ChallengeStatusChartseries"></apexchart>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                
            </v-col>
            <v-col>
                
            </v-col>
        </v-row>
    </div>
</template>
</template>

<script lang="ts" setup>
import { useSessionStore } from "@/store/sessionStore";
import Banner from "@/components/Banner.vue";
import { onMounted } from "vue";
const sessionStore = useSessionStore();
let colorPalette = ['#00D8B6','#008FFB',  '#FEB019', '#FF4560', '#775DD0']

let ChallengeChartoptions = {
    chart: {
    id: 'challengechart',
    height: 160,
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
    text: '4269',
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

let ChallengeChartseries = [{
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }];

let UserChartoptions = {
    chart: {
    id: 'userchart',
    height: 160,
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

let UserChartseries = [{
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }];

let CompanyChartoptions = {
    chart: {
    id: 'companychart',
    height: 160,
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

let CompanyChartseries = [{
          data: [30, 40, 45, 50, 49, 60, 70, 81]
        }];

let ChallengeTimeChartOptions = {
  chart: {
    height: 340,
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
      show: false
    },
    axisTicks: {
      show: false
    },
    tooltip: {
      enabled: false
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

let ChallengeTimeChartseries = [{
    data: [
    {
      name: "Day Time",
      data: trigoSeries(52, 20)
    },
    {
      name: "Night Time",
      data: trigoSeries(52, 27)
    }]
}];

let ChallengeStatusChartOptions = {
  chart: {
      width: '100%',
      height: 400,
      background: '#fff'
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    pie: {
      customScale: 0.8,
      donut: {
        size: '75%',
      },
      offsetY: 20,
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
  }
};

let ChallengeStatusChartseries = [{
    data: 
        [21, 23, 19, 14],
}]; 

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

onMounted(async () => {
    //updateChart();
})

function trigoSeries(cnt: number, strength: number) {
  var data = [];
  for (var i = 0; i < cnt; i++) {
      data.push((Math.sin(i / strength) * (i / strength) + i / strength+1) * (strength*2));
  }

  return data;
}

</script>