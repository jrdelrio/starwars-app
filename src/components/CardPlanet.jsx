import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext"; // trsaigo todos los datos y funciones definidas en appContext.js

const CardPlanet = (props) => {

    // const [imageLoaded, setImageLoaded] = useState(false); 
    const [planet, setPlanet] = useState({});
    const [uid, setUid] = useState();
    const [favorite, setFavorite] = useState(false);
    const { store, actions } = useContext(AppContext);
    const globalFavorites = store.favorites

    // const handleImageLoad = () => {
    //     setImageLoaded(true);
    // };

    // const handleImageError = () => {
    //     setImageLoaded(false);
    // };

    const selectPlanetImage = () => {
        if (planet.name?.toLowerCase() === "tatooine") return '../img/planets/tatooine.webp';
        if (planet.name?.toLowerCase() === "stewjon") return '../img/planets/stewjon.webp';
        return props.image
    };

    // el objeto planet se llama planet
    useEffect(() => {
        fetch(props.url)
            .then(res => res.json())
            .then(data => {
                setPlanet(data.result.properties);
                setUid(data.result.uid)
            })
            .catch(err => console.error(err));
    }, []);

    // if (planet !== {}) {
        return (
            <div className="card">
            <img 
                src={selectPlanetImage()} 
                className="card-img-top" 
                alt="planet image" 
                // onLoad={handleImageLoad}
                // onError={handleImageError}
            />
            <div className="card-body">
                <h4>{planet.name}</h4>
                <div>
                    <Link className='btn btn-outline-primary learnMoreButton' to={`/starwars-app/single/planets/${uid}`}>Learn more!</Link>
                    <button
                        className={`btn btn-outline-primary likeButton ${globalFavorites.includes(planet) ? "selected" : null}`}
                        onClick={() => {
                            if (!favorite) {
                                actions.addFavorite(planet);
                                setFavorite(true);
                            } else {
                                actions.deleteFavorite(planet);
                                setFavorite(false);
                            }
                        }}
                    >
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
        )
                        }
//     } else {
//         return (<p>loading...</p>)
//     }
// };

export default CardPlanet;