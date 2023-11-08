// Utilities
import API from '@/Api'
import { User } from '@/models/User'
import { defineStore } from 'pinia'

export class SnackMessage {
  declare message: string
  declare type: 'success' | 'error' | 'info' | 'warning'
  declare timeout?: number
  declare onClick?: () => void
  declare _timer?: null | ReturnType<typeof setTimeout>
}

export const useSnackbarStore = defineStore('SnackbarStore', {
  state: () => ({
    snacks: [] as SnackMessage[],
  }),
  actions: {
    create(payload: SnackMessage) {
      payload._timer = setTimeout(() => {
        this.snacks.shift()
      }, (payload.timeout || 2) * 1000);

      this.snacks.push(payload)
    },
    createSimple(message: string, type: 'success' | 'error' | 'info' | 'warning') {
      this.create({ message, type, timeout: 7, onClick: () => { } })
    }
  }
})
