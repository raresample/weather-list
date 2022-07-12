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
      <div class="time">
        {{ localTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }}
      </div>
      <!-- <div class="time">
        {{ localTime.toLocaleDateString() }}
      </div> -->
    </div>

    <div class="right">
      <div class="humidity">Humidity: {{ weather.main.humidity }}%</div>
      <div class="wind">Wind: {{ Math.round(weather.wind.speed) }}mph</div>
      <div class="feels">Feels like: {{ Math.round(weather.main.feels_like) }}°</div>
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
    const timezone = ref(null)
    const localTime = ref(null)

    const adjustTime = (timezone, date = new Date()) => {
      const currentZone = date.getTimezoneOffset() / 60
      date.setHours(date.getHours() + timezone + currentZone)

      return date
    }

    onMounted( async () => {
      weather.value = await openWeather(props.city)
      // console.log('WeatherCard onMounted', weather.value)
      timezone.value = weather.value.timezone / 3600
      // console.log('timezone:', timezone.value)
      localTime.value = adjustTime(timezone.value)

    })

    return { weather, localTime }
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

.left h2 {
  margin-top: 0;
  margin-bottom: 0;
}
.left h2:hover {
  cursor: pointer;
  text-decoration: line-through;
}

h3 {
  margin-top: 0;
  margin-bottom: 0;
}

.right {
  text-align: right;
}

@media (min-width: 480px) {
  .weather {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>