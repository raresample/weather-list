<template>
  <div class="home">
    <div class="order-select">
      <!-- <label for="orderby">Sort by</label> -->
      <span class="material-icons">sort</span>
      <select 
        name='orderby' 
        v-model="order" 
        v-on:change="sortCities"
        >
        <option disabled value="">Sort By:</option>
        <option value="AtoZ">A-Z</option>
        <option value='ZtoA'>Z-A</option>
        <option value="asc">Oldest First</option>
        <option value='desc'>Newest First</option>
      </select>
    </div>
    <!-- <div class="order">
      order ref value: {{ order }}
    </div> -->
    <WeatherCard
      @delete="handleDelete(city)"
      v-for="city in cities"
      :key="city.id"
      :city="city.city"
    >
      <!-- <div class="city" @click="handleDelete(city)">  -->
      <div class="city"> 
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

    function sortCities () {
      console.log('sortCities')
      console.log(this.cities)
      if (this.order == 'ZtoA') {
        this.cities.sort(sortZtoA);
      }
      if (this.order == 'AtoZ') {
        this.cities.sort(sortAtoZ);
      }
      if (this.order == 'desc') {
        this.cities.sort(sortOldest);
      }
      if (this.order == 'asc') {
        this.cities.sort(sortNewest);
      }

      
      console.log('after', this.cities)
      console.log(this.order)
    }

    function sortAtoZ (a,b) {
        if(a.city < b.city) return -1;
        if(a.city > b.city) return 1;
        
        return 0;
      }
    function sortZtoA (a,b) {
        if(a.city < b.city) return 1;
        if(a.city > b.city) return -1;
        
        return 0;
      }
    function sortOldest (a,b) {
        if(a.created < b.created) return 1;
        if(a.created > b.created) return -1;
        
        return 0;
      }
    function sortNewest (a,b) {
        if(a.created < b.created) return -1;
        if(a.created > b.created) return 1;
        
        return 0;
      }

    return { 
      cities,
      handleDelete,
      handleUpdate,
      capitalizeCity,
      order,
      sortCities,
      sortAtoZ,
      sortZtoA,
      sortNewest,
      sortOldest
    }
  }
}
</script>

<style>
.order-select {
  margin: 0 0 1rem 0;
  display: flex;
  justify-content: end;
}

.order-select span {
  padding-right: 0.5rem;
}
</style>