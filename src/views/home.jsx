import React, { useEffect, useState, useContext } from "react";
import CardCharacter from "../components/CardCharacter.jsx";
import Card from "../components/Card.jsx";
import { AppContext } from "../store/appContext.js";

export const Home = () => {

	const { store, actions } = useContext(AppContext);
	const globalFavorites = store.favorites

	// define all states
	const [masterCharacters, setMasterCharacters] = useState([]);
	const [masterPlanets, setMasterPlanets] = useState([]);
	const [masterVehicles, setMasterVehicles] = useState([]);
	const [masterFilms, setMasterFilms] = useState([]);
	const [masterSpecies, setMasterSpecies] = useState([]);
	const [masterStarships, setMasterStarships] = useState([]);

	const fetchItems = ['people', 'planets', 'vehicles', 'films', 'species', 'starships'];

	// fetch de la data de personajes
	useEffect(() => {
		Promise.all([
			fetch(`https://www.swapi.tech/api/${fetchItems[0]}?limit=0&page=0`),
			fetch(`https://www.swapi.tech/api/${fetchItems[1]}?limit=0&page=0`),
			fetch(`https://www.swapi.tech/api/${fetchItems[2]}?limit=0&page=0`),
			fetch(`https://www.swapi.tech/api/${fetchItems[3]}?limit=0&page=0`),
			fetch(`https://www.swapi.tech/api/${fetchItems[4]}?limit=0&page=0`),
			fetch(`https://www.swapi.tech/api/${fetchItems[5]}?limit=0&page=0`)
		])
			.then(responses => {
				return Promise.all(responses.map(res => {
					if (!res.ok) throw new Error('Network response was not ok');
					return res.json();
				}));
			})
			.then(data => {
				const getUpdatedData = (items, path) => items.map(item => ({
					...item,
					image: `https://starwars-visualguide.com/assets/img/${path}/${item.uid}.jpg`
				}));

				setMasterCharacters(getUpdatedData(data[0].results, 'characters'));
				setMasterPlanets(getUpdatedData(data[1].results, 'planets'));
				setMasterVehicles(getUpdatedData(data[2].results, 'vehicles'));
				setMasterFilms(getUpdatedData(data[3].result, 'films'));
				setMasterSpecies(getUpdatedData(data[4].results, 'species'));
				setMasterStarships(getUpdatedData(data[5].results, 'starships'));
			})
			.catch(error => {
				console.error("There was a problem with the fetch operation:", error.message);
			});
	}, []);

	useEffect(() => {
		// console.log(masterCharacters);
	}, [masterCharacters]);



	function handleClick(item) {
		actions.deleteFavorite(item);
		globalFavorites.pop(item);

	}

	if (store.favorites !== undefined) {
		return (
			<>

				<div className="text-center mt-5">
					{/*characters section*/}
					<section className="charactersSection">
						<h2 className="sectionTitle">Characters</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterCharacters.map((char, index) => {
								return (
									<div className="col-3" key={index}>
										<Card className="Card" name={char.name} url={char.url} image={char.image} uid={char.uid} type="people" />
									</div>
								)
							})}
						</div>
					</section>

					{/*planets section*/}
					<section className="planetsSection">
						<h2 className="sectionTitle">Planets</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterPlanets.map((planet, index) => (
								<div className="col-3" key={index}>
									<Card className="CardPlanet" name={planet.name} url={planet.url} image={planet.image} uid={planet.uid} type="planet" />
								</div>
							))}
						</div>
					</section>

					{/*vehicles section*/}
					<section className="vehiclesSection">
						<h2 className="sectionTitle">Vehicles</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterVehicles.map((vehicle, index) => (
								<div className="col-3" key={index}>
									<Card className="CardVehicle" name={vehicle.name} url={vehicle.url} image={vehicle.image} uid={vehicle.uid} type="vehicle" />
								</div>
							))}
						</div>
					</section>

					{/*starships section*/}
					<section className="vehiclesSection">
						<h2 className="sectionTitle">Starships</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterStarships.map((starship, index) => (
								<div className="col-3" key={index}>
									<Card className="CardVehicle" name={starship.name} url={starship.url} image={starship.image} uid={starship.uid} type="starship" />
								</div>
							))}
						</div>
					</section>

					{/*species section*/}
					<section className="speciesSection">
						<h2 className="sectionTitle">Species</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterSpecies.map((specie, index) => (
								<div className="col-3" key={index}>
									<Card className="CardVehicle" name={specie.name} url={specie.url} image={specie.image} uid={specie.uid} type="specie" />
								</div>
							))}
						</div>
					</section>

					{/*films section*/}
					<section className="filmsSection">
						<h2 className="sectionTitle">Films</h2>
						<div className="row flex-row flex-nowrap rowSection">
							{masterFilms.map((film, index) => (
								<div className="col-3" key={index}>
									<Card className="CardVehicle" name={film.properties.title} url={film.url} image={film.image} uid={film.uid} type="film" />
								</div>
							))}
						</div>
					</section>

				</div>
			</>
		)
	}
};