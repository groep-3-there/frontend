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
    },
    async logIn(username: string, password: string){
      const success = await API.firebaseLoginAndUseToken(username, password);
      if(success){
        await this.forceUpdate()
      }
      return success;

    }
   
  }
})
