import './App.css'
import {fetchPlaces, PlaceForm} from './initMap'
import {SelectPlace, BuildList} from './selectPlace'
import {useState } from 'react'

function App() {
  const [places, setPlaces] = useState("")
  const [loading, setLoading] = useState(true)
  const [placeList, setPlaceList] = useState([])
  const [selecting, setSelecting] = useState(false)

  if (places === "") fetchPlaces(setPlaces, loading, setLoading);
  BuildList(places, setPlaceList, loading);

  return (
    <div>
      <div>
        {PlaceForm(setPlaces, loading, setLoading)}
        <button onClick={() =>{
          setSelecting(true)
          SelectPlace(places, setPlaceList, setSelecting);
        }}
        disabled={selecting}>
          Pick a restaurant for me
        </button>
      </div>
      <div>
        {placeList}
      </div>
    </div>
  )
}

export default App
