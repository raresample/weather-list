<template>
  <div class="weather">
    <h1>{{ weather?.name }}</h1>
    <div class="temp">Temperature: {{ weather?.main?.temp }}°F</div>
    <div class="humidity">Humidity: {{ weather?.main?.humidity }}%</div>
    <div class="wind">Wind: {{ weather?.wind?.speed }}mph</div>
    <div class="feels">Feels like: {{ weather?.main?.feels_like }}°F</div>
  </div>
</template>

<script>
export default {
  props: {
    weather: Object,
  },
};
</script>

<style>
.weather {
  background: white;
  margin: 1rem 0;
  padding: 0.825rem;
}
</style>
