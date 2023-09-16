import React, { useEffect, useState , useContext} from "react";
import { Link } from "react-router-dom";
import CardCharacter from "../components/CardCharacter.jsx";
import CardPlanet from "../components/CardPlanet.jsx";
import CardVehicle from "../components/CardVehicle.jsx";
import { AppContext } from "../store/appContext.js";

export const Home = () => {

	const { store, actions } = useContext(AppContext);
	const globalFavorites = store.favorites

	// fetch de la data de personajes
	let [masterList, setMasterList] = useState([]);
	useEffect(()=>{
		fetch("https://www.swapi.tech/api/people/")
		.then(res => res.json())
		.then(data => setMasterList(data.results))
		.catch(err => console.error(err));
	},[]);

	// fetch de la data de planetas
	let [masterPlanet, setMasterPlanet] = useState([]);
	useEffect(()=>{
		fetch("https://www.swapi.tech/api/planets/")
		.then(res => res.json())
		.then(data => setMasterPlanet(data.results))
		.catch(err => console.error(err));
	},[]);

	// fetch de la data de vahicles
	let [masterVehicle, setMasterVehicle] = useState([]);
	useEffect(()=>{
		fetch("https://www.swapi.tech/api/vehicles/")
		.then(res => res.json())
		.then(data => setMasterVehicle(data.results))
		.catch(err => console.error(err));
	},[]);

	function handleClick(item) {
		actions.deleteFavorite(item);
		globalFavorites.pop(item);

	}

	if (store.favorites != undefined){
	return (
		<>
		{/* <nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img className='main-logo' src='https://www.freepnglogos.com/uploads/star-wars-logo-31.png' />
			</Link>
			<div className="ml-auto">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true">
						Favorites {store.favorites.length}
					</button>
					<ul className="dropdown-menu">
						{store.favorites.map((item, index)=>{
							return(<li className="dropdown-item" key={index}>
								{item.name} <i className="fa-regular fa-trash-can" onClick={(ev) => {handleClick(item)}}></i>
								</li>) 
						})}
					</ul>
				</div>
			</div>
		</nav> */}

		<div className="text-center mt-5">
			{/*characters section*/}
			<section className="charactersSection">
				<h2 className="sectionTitle">Characters</h2>
				<div className="row flex-row flex-nowrap rowSection">
					{masterList.map((charUrl, index) => {
						return(
								<div className="col-3" key={index}>
									<CardCharacter className="CardCharacter" url={charUrl.url}/>
								</div>
							)
					})}
            	</div>
        	</section>

			{/*planets section*/}
			<section className="planetsSection">
				<h2 className="sectionTitle">Planets</h2>
				<div className="row flex-row flex-nowrap rowSection">
					{masterPlanet.map((planetUrl, index) => {
						return(
							<div className="col-3" key={index}>
								<CardPlanet className="CardPlanet" url={planetUrl.url}/>
							</div>)
					})}
				</div>
			</section>

			{/*vehicles section*/}
			<section className="vehiclesSection">
			<h2 className="sectionTitle">Vehicles</h2>
			<div className="row flex-row flex-nowrap rowSection">
				{masterVehicle.map((vehicleUrl, index) => {
					return(

						<div className="col-3" key={index}>
							<CardVehicle className="CardVehicle" url={vehicleUrl.url}/>
						</div>)
				})}
			</div>
			</section>
		</div>
		</>
	)}
};