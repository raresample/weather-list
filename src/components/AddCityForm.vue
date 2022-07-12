<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New City</h3>

    <input
      :class="{ shrink: apiError }"
      type="text" 
      name="city" 
      v-model="city" 
      @keypress="clearError"
      required>
    <div class="api-error" v-if="apiError">
      Error: {{ apiError }}
    </div>

    <button>Add City</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import openWeather from '../composables/openWeather'

// firebase imports
import { db } from '../firebase/config'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

export default {
  setup() {
    const { user } = getUser()
    const city = ref('')
    const apiError = ref('')

    const handleSubmit = async () => {
      const colRef = collection(db, 'cities')
      const validCity = await openWeather(city.value)

      if (validCity.name) {
        await addDoc(colRef, {
        city: city.value,
        isFav: false,
        userUid: user.value.uid,
        created: serverTimestamp()
        })
      } else {
        apiError.value = validCity.message
      }
      

      // reset the form
      city.value = ''
    } 

    const clearError = () => {
      apiError.value = null
    }

    return { 
      handleSubmit, 
      city, 
      apiError, 
      clearError 
    }
  }
}
</script>

<style>
form {
  padding: 10px;
  margin-top: 10px;
  border: 1px dashed #c3c8ce;
}

.api-error {
  color: lightcoral;
}

.shrink {
  margin-bottom: 0;
}

@media (min-width: 480px) {
  form {
    padding-left: 1.5rem;
  }
}
</style>