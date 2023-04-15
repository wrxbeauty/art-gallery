import { useState, useEffect } from 'react'
import { useSelector, useDispatch, connect} from 'react-redux'
import './App.css';
import Gallery from './components/Gallery'
import ButtonBar from './components/ButtonBar'

const mapStateToProps = (state) => ({
  objectId: state.data.objectId
})

useEffect(() => {
  dispatch(fetchData())
}, [props.objectId, dispatch])


function App() {
  let [artDetails, setArtDetails] = useState({})
  let [artId, setArtId] = useState(12720)

  useEffect(() => {
    document.title = 'Welcome to Artworld'
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${artId}`)
      .then(response => response.json())
      .then(resData => setArtDetails(resData))
  }, [artId])

  const displayImage = () => {
    if (!artDetails.primaryImage) {
      return (
        <h2>No Image!</h2>
      )
    }
    return (
      <Gallery objectImg={artDetails.primaryImage} artist={artDetails.artistDisplayName} title={artDetails.title} />
    )
  }

  const handleIterate = (e) => {
    setArtId(artId + Number(e.target.value))
  }

return (
  <div className="App">
    <h1>{artDetails.title}</h1>
    <div style={{ 'width': '100' }}>
      {displayImage()}
    </div>
    <ButtonBar handleIterate={handleIterate} />
  </div>
)
}
export default connect(mapStateToProps)(App)
