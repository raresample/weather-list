import { ref, watchEffect } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where } from 'firebase/firestore'

// const api_key = 'f41ec13a2657bc185cdffa04442de35f'
// const url_base = 'https://api.openweathermap.org/data/2.5/'

// const weather = ref(null)

// const apiCall = async (city) => {
//   console.log('apiCall:', `${url_base}weather?q=${city}&units=metric&APPID=${api_key}`)
//   const res = await fetch(
//     `${url_base}weather?q=${city}&units=metric&APPID=${api_key}`
//   )
//   weather.value = await res.json()
//   console.log(city, 'temperature', weather.value.main.temp)
// }


const getCollection = (c, q) => {
  const documents = ref(null)

  // collection reference
  let colRef = collection(db, c)

  if (q) {
    console.log('getCollection composable query:', ...q)
    colRef = query(colRef, where(...q))
  }

  const unsub = onSnapshot(colRef, snapshot => {
    let results = []
    snapshot.docs.forEach(doc => {
      results.push({ ...doc.data(), id: doc.id })
    })
    // console.log('pushed results:', results)
    
    // update values
    documents.value = results
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { documents }
}

export default getCollection