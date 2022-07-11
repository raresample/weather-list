<template>
  <div class="weather" v-if="weather && weather.coord">
    <!-- Lon : {{ weather.coord.lon }},
    Lat : {{ weather.coord.lat }} -->
    
    <div class="left">
      <!-- is this slot better than emitting an event? -->
      <h2><slot></slot></h2>
      <!-- <h2>{{ weather.name }}</h2> -->
      <div class="temp">
        <h3>{{ Math.round(weather.main.temp) }}°F</h3>  
      </div>
    </div>

    <div class="right">
      <div class="humidity">Humidity: {{ weather.main.humidity }}%</div>
      <div class="wind">Wind: {{ weather.wind.speed }}mph</div>
      <div class="feels">Feels like: {{ weather.main.feels_like }}°F</div>
    </div>
  </div>

  <!-- {{ weather }} -->
  
</template>

<script>
import { onMounted, ref } from '@vue/runtime-core'
import openWeather from '../composables/openWeather'

export default {
  props: {
    city: String
  },
  setup(props) {
    const weather = ref(openWeather(props.city))

    onMounted( async () => {
      weather.value = await openWeather(props.city)
      // console.log('WeatherCard onMounted', weather.value)
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
  height: 10rem;
  align-items: center;
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