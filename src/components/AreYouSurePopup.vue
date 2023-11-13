<template>
    <v-row justify="center">
        <v-dialog v-model="opened" persistent width="auto">
            <v-card>
                <v-card-title class="text-h5">
                    {{ title }}
                </v-card-title>
                <v-card-text>{{ subtitle }}</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="close">
                        Annuleren
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="send">
                        {{ acceptWord }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script setup lang="ts">


import API from '@/Api';
import { watch } from 'vue';
import { ref } from 'vue';

const emit = defineEmits(['onAcceptAndClose', 'onClose'])
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    subtitle:{
        type: String,
        required: false
    },
    acceptWord:{
        type: String,
        required: false,
        default: "Accepteren"
    },
    }
)
const opened = ref(true)

function close(){
    emit('onClose')
}

async function send(){
    emit('onAcceptAndClose')

}

</script>