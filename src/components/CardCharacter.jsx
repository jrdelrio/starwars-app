import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../store/appContext.js';
import { Link } from "react-router-dom";

const CardCharacter = (props) => {
  // const { state /* Access state values here */, /* Access functions here */ } = useAppContext();
  const [url, setUrl] = useState(props.url);
  const [char, setChar] = useState({});
  const [uid, setUid] = useState();
  const [favorite, setFavorite] = useState(false);
  const { store, actions } = useContext(AppContext);
  const globalFavorites = store.favorites

  // el objeto personaje de esta card se llama char
  // useEffect(() => {
  //   fetch(url)
  //     .then(res => res.json())
  //     .then(data => {
  //       setChar(data.result.properties);
  //       setUid(data.result.uid)
  //     })
  //     .catch(err => console.error(err));
  // }, [url]);

  // console.log(props)

  // if (char !== {}) {
  return (
    <div className="card">
      <img src={props.image} className="card-img-top" alt="alt" />
      <div className="card-body">
        <h4>{props.name}</h4>
        {/* <p className="card-text"><b>Gender:</b> {char.gender}</p>
        <p className="card-text"><b>Eyes-color:</b> {char.eye_color}</p>
        <p className="card-text"><b>Hair-clor:</b> {char.hair_color}</p> */}
        <div>
          <Link className='btn btn-outline-primary learnMoreButton' to={`/single/people/${uid}`} >Learn more!</Link>
          <button
            className={`btn btn-outline-primary likeButton ${globalFavorites.includes(char) ? "selected" : null}`}
            onClick={(ev) => {
              if (favorite === false) {
                actions.addFavorite(char);
                setFavorite(true);
              } else if (favorite === true) {
                actions.deleteFavorite(char);
                setFavorite(false);
              }
            }
            }><i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  )
  //   } else {
  //     return (<p>loading...</p>)
  //   }
};

export default CardCharacter;