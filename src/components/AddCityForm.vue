<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New City</h3>

    <label for="city">City:</label>
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

// firebase imports
import { db } from '../firebase/config'
import { addDoc, collection } from 'firebase/firestore'

export default {
  setup() {
    const { user } = getUser()
    const city = ref('')
    const apiError = ref('')


    const apiKey =  'f41ec13a2657bc185cdffa04442de35f'
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='

    const openWeather = async (city) => {
      const apiUrl = `${urlBase}${city}&APPID=${apiKey}&units=imperial`
      console.log('openWeather apiUrl:', apiUrl)
      try {
        let apiCall = await fetch(apiUrl)
        let data = await apiCall.json()
        // weather.value = data
        return data
        //   .then(response => response.json())
        //   .then(data => weather.value = data)
        // return apiCall

      } catch(err) {
        console.log('try error:', err)
        return err
      }
    }

    const handleSubmit = async () => {
      const colRef = collection(db, 'cities')
      const checked = await openWeather(city.value)
      console.log('checked again', checked)

      if (checked.name) {
        await addDoc(colRef, {
        city: city.value,
        isFav: false,
        userUid: user.value.uid
        })
      } else {
        apiError.value = checked.message
      }
      

      // reset the form
      city.value = ''
    } 

    const clearError = () => {
      apiError.value = null
    }

    return { handleSubmit, city, openWeather, apiError,clearError }
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
</style>