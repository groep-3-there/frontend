// Utilities
import API from '@/Api'
import { User } from '@/models/User'
import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => ({
    loggedInUser : null as User | null
  }),
  actions:{
    async forceUpdate(){
      this.loggedInUser = await API.getCurrentUser()
    },
    async logOut(){
      throw new Error("Not implemented yet")
    }
  }
})
