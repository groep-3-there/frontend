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
      if(!API.hasAuthToken()) {
        console.log("Can't force update for logged in user, no auth token")
        return;
      };
      console.log("Forcing update for logged in user")
      this.loggedInUser = await API.getCurrentUser()
    },
    async logOut(){
      throw new Error("Not implemented yet")
    },
    async logIn(username: string, password: string){
      const success = await API.firebaseLoginAndUseToken(username, password);
      if(success){
        try{
          await this.forceUpdate()
        }
        catch(e){
          console.warn(e)
        }
      }
      return success;

    }
   
  }
})
