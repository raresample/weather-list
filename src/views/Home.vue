<template>
  <div class="home">
    <!-- <Toggle /> -->
    <WeatherCard
      v-for="city in cities"
      :key="city.id"
      :city="city.city"
    >
      <div class="city" @click="handleDelete(city)"> 
        {{ capitalizeCity(city.city) }}
      </div>
    </WeatherCard>
    <!-- <ul>
      <li v-for="city in cities" :key="city.id">
        <div class="details">
          <h3 @click="handleDelete(city)">{{ city.city }}</h3>
        </div>
      </li>
    </ul> -->

    <!-- <div>{{ cities }}</div> -->




    <AddCityForm />
  </div>
</template>

<script>
import AddCityForm from '@/components/AddCityForm'
import WeatherCard from '../components/WeatherCard.vue'
import getCollection from '@/composables/getCollection'
import { db } from '../firebase/config'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore'
import getUser from '../composables/getUser'

// import Toggle from '../components/Toggle.vue'

export default {
  name: 'Home',
  components: { AddCityForm, WeatherCard },
  setup() {
    const { user } = getUser()

    const { documents: cities } = getCollection(
      'cities',
      ['userUid', '==', user.value.uid]
      )

    const handleDelete = (city) => {
      const docRef = doc(db, 'cities', city.id)

      deleteDoc(docRef)
    }

    const handleUpdate = (city) => {
      const docRef = doc(db, 'cities', city.id)

      updateDoc(docRef, {
        isFav: !city.isFav
      })
    }

    const capitalizeCity = (str) => {
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }


    return { cities, handleDelete, handleUpdate, capitalizeCity }
  }
}
</script>

<style>
.icon {
  color: #bbbbbb;
  cursor: pointer;
}

.icon.fav {
  color: #f83f5e;
}
</style>