<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New City</h3>

    <label for="city">City:</label>
    <input type="text" name="city" v-model="city" required>

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

    const handleSubmit = async () => {
      const colRef = collection(db, 'cities')
      
      await addDoc(colRef, {
        city: city.value,
        isFav: false,
        userUid: user.value.uid
      })

      // reset the form
      city.value = ''
    }

    return { handleSubmit, city }
  }
}
</script>

<style>
form {
  padding: 10px;
  margin-top: 10px;
  border: 1px dashed #c3c8ce;
}
</style>