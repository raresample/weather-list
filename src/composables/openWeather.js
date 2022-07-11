const apiKey =  'f41ec13a2657bc185cdffa04442de35f'
const urlBase = 'https://api.openweathermap.org/data/2.5/weather?q='


const openWeather = async (city) => {
  const apiUrl = `${urlBase}${city}&APPID=${apiKey}&units=imperial`
  console.log('openWeather apiUrl:', apiUrl)
  try {
    let apiCall = await fetch(apiUrl)
    let data = await apiCall.json()
    // weather.value = data
    return data
    //   .then(response => response.json())
    //   .then(data => weather.value = data)
    // return apiCall

  } catch(err) {
    console.log('try error:', err)
    return err
  }
}

export default openWeather