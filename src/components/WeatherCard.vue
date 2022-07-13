<template>
  <div class="weather" v-if="weather && weather.coord">
    <!-- Lon : {{ weather.coord.lon }},
    Lat : {{ weather.coord.lat }} -->
    
    <div class="left">
      <!-- is this slot better than emitting an event? -->
      <div class="local">
        <!-- <h2><slot></slot></h2> -->
        <h2>{{ weather.name }}</h2>
        <div class="time">
          {{ localTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) }}
        </div>
      </div>
      <div class="temp">
        <h3>{{ Math.round(weather.main.temp) }}°F</h3>  
      </div>

    </div>

    <div class="right">
      <div class="details">
        <div class="humidity">Humidity: {{ weather.main.humidity }}%</div>
        <div class="wind">Wind: {{ Math.round(weather.wind.speed) }}mph</div>
        <div class="feels">Feels like: {{ Math.round(weather.main.feels_like) }}°</div>
      </div>
      <div class="delete">
        <div class="trash" @click="$emit('delete')">
          <span class="material-icons">delete</span>
        </div>
      </div>
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
  /* color: #2c3e50; */
  /* border-radius: 5px; */
  /* box-shadow: 0 0 3px rgba(0,0,0,0.25); */
  margin: 1rem 0;
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 7.5rem;
  align-items: stretch;
  box-shadow: 0 2px 2px 0 rgb(0 0 0 / 14%), 0 3px 1px -2px rgb(0 0 0 / 20%), 0 1px 5px 0 rgb(0 0 0 / 12%);
}

.left {
  display: grid;
}

.left h2 {
  margin-top: 0;
  margin-bottom: 0;
}
/* .left h2:hover {
  cursor: pointer;
  text-decoration: line-through;
} */

h3 {
  margin-top: 0;
  margin-bottom: 0;
}

.weather h3 {
  font-size: 3rem;
}

.temp {
  display: grid;
  align-content: end;
}

.right {
  text-align: right;
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
}

.delete {
  display: grid;
  align-content: end;
}

.material-icons {
  cursor: pointer;
}

.material-icons::hover {
  cursor: pointer;
  color: red;
}

@media (min-width: 480px) {
  .weather {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>