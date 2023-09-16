import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext"; // trsaigo todos los datos y funciones definidas en appContext.js

const CardVehicle = (props) => {

    const [url, setUrl] = useState(props.url);
    const [vehicle, setVehicle] = useState({});
    const [uid, setUid] = useState();
    const [favorite, setFavorite] = useState(false);
    const { store, actions } = useContext(AppContext);
    const globalFavorites = store.favorites

    // el objeto planet se llama planet
    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => {setVehicle(data.result.properties);
                        setUid(data.result.uid)})
        .catch(err => console.error(err));
    },[url]);
    
    // if (vehicle !== {}){
        return (
            <div className="card">
                <img src="https://cdna.artstation.com/p/assets/images/images/015/790/190/large/tim-murray-flsp-41.jpg?1549753601" className="card-img-top" alt="alt"/>
                <div className="card-body">
                    <h4>{vehicle.name}</h4>
                    <p className="card-text"><b>Vehicle class:</b> {vehicle.vehicle_class}</p>
                    <p className="card-text"><b>Passengers:</b> {vehicle.passengers}</p>
                    <p className='card-text'><b>Manufacturer:</b> {vehicle.manufacturer}</p>
                    <div>
                        <Link className='btn btn-outline-primary learnMoreButton' to={`/single/starships/${uid}`}>Learn more!</Link>
                        <button  
                               className={`btn btn-outline-primary likeButton ${globalFavorites.includes(vehicle) ? "selected" : null}`}
                               onClick={(ev) => {
                                                if (favorite === false){
                                                        actions.addFavorite(vehicle);
                                                        setFavorite(true);
                                                }else if (favorite === true){
                                                    actions.deleteFavorite(vehicle);
                                                    setFavorite(false)
                                                }}
                                        }><i className="fa-regular fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    // }else{
    //     return(<p>loading...</p>)
    // }
};

export default CardVehicle;