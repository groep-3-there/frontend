<template>
  <v-card>
    <v-app>
      <!--                 expand on hover, use hover
                                      |            |            show permanent(dont hide on mobile)
                                      \/           \/              \/               width of drawer       Do not make the sidebar scrollable -->
      <v-navigation-drawer expand-on-hover :rail="mdAndDown" :permanent="true" :width="drawerWidth"
        style="position:fixed">
        <v-list>
          <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" :title="user?.name"
            :subtitle="user?.id"></v-list-item>
        </v-list>

        <v-divider></v-divider>
              <v-list density="compact" nav>
                  <v-list-item @click="$router.push('/')" prepend-icon="mdi-home" title="Home" value="home"></v-list-item>
                  <v-list-item @click="$router.push('/vue-tutorial')" prepend-icon="mdi-folder" title="Data Pagina" value="data"></v-list-item>
                  <v-list-item @click="$router.push('/challenge/1')" prepend-icon="mdi-folder" title="Challenge" value="challenge"></v-list-item>
                  <v-list-item @click="$router.push('/challenges')" prepend-icon="mdi-folder" title="Zoeken" value="zoeken"></v-list-item>
                  <v-list-item @click="$router.push('/create-challenge')" prepend-icon="mdi-folder" title="Create Challenge" value="create-challenge"></v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list density="compact" nav>
                  <v-list-item @click="logOut()" prepend-icon="mdi-account-multiple" title="Log uit" value="shared"></v-list-item>
              </v-list>

      </v-navigation-drawer>

      <v-main :class="{ 'sideBarSpacing': lgAndUp }">
        <router-view></router-view>
      </v-main>
    </v-app>
  </v-card>
</template>
<style scoped>
.sideBarSpacing {
  margin-left: v-bind(widthPx);
  margin-right: v-bind(widthPx);
}
</style>

<script setup lang="ts">

import HelloWorld from '@/components/HelloWorld.vue'
import { Ref, computed } from 'vue';
import { ref } from 'vue';
import { useDisplay } from "vuetify"
import router from '@/router';
import { watch } from 'vue';
import { User } from '@/models/User';
import { onMounted } from 'vue';
import API from '@/Api';
const { mobile, lgAndDown, lgAndUp, mdAndDown, lg, name } = useDisplay()

const user = ref({}) as Ref<User | null>

onMounted(async () => {
  user.value = await API.getCurrentUser()
})

//Drawer size
const drawerWidth = ref(256)
const widthPx = computed(() => {
  return `${drawerWidth.value/2}px`
})

function logOut() {
  console.log("Not implemented yet")
}

const bigScreen = ref(true)
</script>
