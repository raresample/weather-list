import { ref, watchEffect } from 'vue'

// firebase imports
import { db } from '../firebase/config'
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore'


const getCollection = (c, q, o) => {
  const documents = ref(null)

  // collection reference
  let colRef = collection(db, c)

  if (q) {
    // console.log('getCollection composable query:', ...q)
    colRef = query(colRef, where(...q))
    // console.log('checking colRef', colRef)
    colRef = query(colRef, orderBy('created', o))
    // console.log('rechecking colRef', colRef)
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