import { useState, useEffect, useContext } from 'react';
import { AppContext } from '../store/appContext.js';
import { Link } from "react-router-dom";

const Card = (props) => {
    // const { state /* Access state values here */, /* Access functions here */ } = useAppContext();

    const [url, setUrl] = useState(props.url);
    const [name, setName] = useState(props.name);
    const [uid, setUid] = useState(props.uid);
    const [image, setImage] = useState(props.image);
    const [type, setType] = useState(props.type);
    const [favorite, setFavorite] = useState(false);
    const { store, actions } = useContext(AppContext);
    const globalFavorites = store.favorites

    console.log(`Type: ${props.type} - Name: ${props.name}`)


    // if (char !== {}) {
    return (
        <div className="card">
            <img src={image} className="card-img-top" alt="alt" />
            <div className="card-body">
                <h4>{props.name}</h4>
                <div>
                    <Link className='btn btn-outline-primary learnMoreButton' to={`/single/people/${uid}`} >Learn more!</Link>
                    <button
                        className={`btn btn-outline-primary likeButton ${globalFavorites.includes(name) ? "selected" : null}`}
                        onClick={(ev) => {
                            if (favorite === false) {
                                actions.addFavorite(name);
                                setFavorite(true);
                            } else if (favorite === true) {
                                actions.deleteFavorite(name);
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

export default Card;