<template>
  <div class="weather" v-if="weather && weather.coord">
    <!-- Lon : {{ weather.coord.lon }},
    Lat : {{ weather.coord.lat }} -->
    
    <div class="left">
      <h2><slot></slot></h2>
      <!-- <h2>{{ weather.name }}</h2> -->
      <div class="temp">
        <h3>{{ weather.main.temp }}°F</h3>  
      </div>
    </div>

    <div class="right">
      <div class="humidity">Humidity: {{ weather.main.humidity }}%</div>
      <div class="wind">Wind: {{ weather.wind.speed }}mph</div>
      <div class="feels">Feels like: {{ weather.main.feels_like }}°F</div>
    </div>
    <!-- <div class="city">{{ city }}</div> -->
  </div>

  <!-- {{ weather }} -->
  
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'

export default {
  props: {
    city: String
  },
  setup(props) {
    const apiKey = 'f41ec13a2657bc185cdffa04442de35f'
    const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='
    const apiUrl = `${urlBase}${props.city}&APPID=${apiKey}&units=imperial`
    const weather = ref(null)
  
    const openWeather = async (apiUrl) => {
      // console.log('apiUrl:', apiUrl)
      try {
        let apiCall = await fetch(apiUrl)
        let data = await apiCall.json()
        weather.value = data
        return data
        //   .then(response => response.json())
        //   .then(data => weather.value = data)
        // return apiCall

      } catch(err) {
        console.log('try error:', err)
        return err
      }
    }

    onMounted(() => {
      weather.value = openWeather(apiUrl)
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

h2 {
  margin-top: 0;
  margin-bottom: 0;
}
h2:hover {
  cursor: pointer;
  text-decoration: line-through;
}

h3 {
  margin-top: 0;
}

.right {
  text-align: right;
}
</style>