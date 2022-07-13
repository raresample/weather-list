<template>
  <div class="home">
    <div class="order-select">
      <select name='orderby' v-model="order">
        <option disabled value="">Sort By:</option>
        <option value="asc">Newest</option>
        <option value='desc'>Oldest</option>
    </select>
    </div>
    <!-- <div class="order">
      order ref value: {{ order }}
    </div> -->
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
import { ref } from '@vue/reactivity'

export default {
  name: 'Home',
  components: { AddCityForm, WeatherCard },
  setup() {
    const { user } = getUser()
    const order = ref('asc')

    const { documents: cities } = getCollection(
      'cities',
      ['userUid', '==', user.value.uid],
      order.value
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


    return { cities, handleDelete, handleUpdate, capitalizeCity, order }
  }
}
</script>

<style>
.order-select {
  display: flex;
  justify-content: end;
}

.order-select {
  margin: 2rem 0;
}
.icon {
  color: #bbbbbb;
  cursor: pointer;
}

.icon.fav {
  color: #f83f5e;
}
</style>