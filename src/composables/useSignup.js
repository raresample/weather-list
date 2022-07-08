import { ref } from 'vue'
// firebase imports
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

// initialize state values
const error = ref(null)
const isPending = ref(false)

const signup = async (email, password) => {
  // state reset for each signup attempt
  error.value = null
  isPending.value = true
  // create new user
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    if (!res) {
      // define catch block error
      throw new Error('Could not complete signup')
    }
    // completed state change
    error.value = null
    isPending.value = false
  } catch(err) {
    // print Error defined above
    console.log(err.message)
    // failure state change
    error.value = err.message
    isPending.value = false
  }
}

// function returns ref values, signup()
const useSignup = () => {
  return { error, isPending, signup }
}
// exporting that function
export default useSignup