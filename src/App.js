
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
//import { debounce } from 'lodash'

function App() {
  const [country, setCountry] = useState()
  function searchCountry(event) {
    setCountry(event.target.value)
  }
  const [regionInput, setRegionInput] = useState('')
  function inputRegion(event) {
    setRegionInput(event.target.value)
  }

  //const debounced = debounce(submit, 1000)

  function submit() {
    const urlMain = 'https://restcountries.com/v3.1'
    const url = country ? `${urlMain}/name/${country}` : `${urlMain}/all`
    axios({
      method: 'get',
      url: url
    })
      .then(function (response) {
        changeCountriesList(response)
        console.log(response)
      })
  }
  useEffect(() => {
    //debounced
    submit()
  }, [country, regionInput])

  function sortCountry(i, j) {
    if (i.name.common < j.name.common) {
      return -1
    }
    if (i.name.common > j.name.common) {
      return 1
    }
    return 0
  }

  const [countriesData, setCountriesData] = useState([])
  function changeCountriesList(response) {

    const country = response.data.filter(item => {
      if (regionInput === '') {
        return true
      }
      if (regionInput === item.region)
        return true
    })
    setCountriesData(country.sort(sortCountry))
  }

  const [theme, setTheme] = useState()
  function changeTheme() {
    setTheme(prevState => !prevState)
  }

  return (<div className={theme ? 'dark' : 'light'}>
    <div className='container' >
      <div className='header'>
        <h2 className='title'>Where in the world?</h2>
        <button className='btn' onClick={changeTheme}><i className='fa-solid fa-circle-half-stroke'></i>dark</button>
      </div>
      <form className='form'>
        <div>
          <i className='fa-solid fa-magnifying-glass icon-search'></i>
          <input type='text' className='search' placeholder='Search of country ...' value={country} onChange={searchCountry}></input>
        </div>
        <select className='selectRegion' value={regionInput} onChange={inputRegion}>
          <option value=''>All regions</option>
          <option value='Africa'>Africa</option>
          <option value='Americas'>Americas</option>
          <option value='Asia'>Asia</option>
          <option value='Europe'>Europe</option>
          <option value='Oceania'>Oceania</option>
        </select>
      </form>
      <div className='listCountry'>
        {countriesData.map(e => {
          return (
            <div className='card' key={e.cca3}>
              <img className='flag' alt='flag' src={e.flags.svg} />
              <div className='country'>
                <p className='nameCountry'>{e.name.common}</p>
                <p className='infoInCountry'>Population: <span>{e.population.toLocaleString()}</span> </p>
                <p className='infoInCountry'>Region: <span>{e.region}</span></p>
                <p className='infoInCountry'>Capital: <span>{e.capital}</span></p>
              </div>
            </div>)
        }
        )}
      </div>
    </div >
  </div>
  )
}
export default App;
