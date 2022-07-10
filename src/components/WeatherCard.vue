<template>
  <div class="weather">
    <div class="city">{{ city }}</div>
  </div>

  <InnerCard :weather="weather" />

</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
// import { computed } from '@vue/reactivity'

import InnerCard from './InnerCard.vue'

export default {
  components: {
    InnerCard
  },
  props: {
    city: String
  },
  setup(props) {
    const apiKey =  'f41ec13a2657bc185cdffa04442de35f'
    // const apiKey =  process.env.VUE_APP_API_KEY
    console.log('env:', process.env.VUE_APP_API_KEY)
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
    const apiUrl = `${urlBase}${props.city}&APPID=${apiKey}&units=imperial`
    const weather = ref(null)
  
    const openWeather = async (apiUrl) => {
      console.log('apiUrl:', apiUrl)
      try {
        let apiCall = await fetch(apiUrl)
          .then(response => response.json())
          .then(data => weather.value = data)
        return apiCall

      } catch(err) {
        console.log('try error:', err)
        return err
      }
    }

    onMounted(() => {
      openWeather(apiUrl)
    })

    return { weather }
  }
}
</script>

<style>
.weather {
  background: white;
  margin: 1rem 0;
  padding: 0.825rem;
}
</style>