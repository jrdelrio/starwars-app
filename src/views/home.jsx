import React, { useEffect, useState, useContext } from "react";
import Card from "../components/Card.jsx";
import { AppContext } from "../store/appContext.js";

export const Home = () => {
    const { store, actions } = useContext(AppContext);
    const globalFavorites = store.favorites;

    const [masterCharacters, setMasterCharacters] = useState([]);
    const [masterPlanets, setMasterPlanets] = useState([]);
    const [masterVehicles, setMasterVehicles] = useState([]);
    const [masterFilms, setMasterFilms] = useState([]);
    const [masterSpecies, setMasterSpecies] = useState([]);
    const [masterStarships, setMasterStarships] = useState([]);

    const fetchItems = ['people', 'planets', 'vehicles', 'films', 'species', 'starships'];

    useEffect(() => {
        const errorPlanets = [
            1, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
            33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45,
            46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
            59, 60
        ];

        const errorVehicles = [
            44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 60, 62, 67,
            69, 70, 71, 72, 73, 76
        ];

        const errorStarships = [
            2, 3, 17, 32, 49, 52, 58, 59, 61, 63, 64, 65, 66,
            68, 74, 75
        ];

        const getUpdatedData = (items, path, errorArray = []) => 
            items
                .filter(item => !errorArray.includes(Number(item.uid)))
                .map(item => ({
                    ...item,
                    image: `https://starwars-visualguide.com/assets/img/${path}/${item.uid}.jpg`
                }));

        Promise.all(fetchItems.map(item => fetch(`https://www.swapi.tech/api/${item}?limit=0&page=0`)))
            .then(responses => Promise.all(responses.map(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })))
            .then(data => {
                setMasterCharacters(getUpdatedData(data[0].results, 'characters'));
                setMasterPlanets(getUpdatedData(data[1].results, 'planets', errorPlanets));
                setMasterVehicles(getUpdatedData(data[2].results, 'vehicles', errorVehicles));
                setMasterFilms(getUpdatedData(data[3].result, 'films')); // Note: 'result' is used here. Make sure it's correct.
                setMasterSpecies(getUpdatedData(data[4].results, 'species'));
                setMasterStarships(getUpdatedData(data[5].results, 'starships', errorStarships));
            })
            .catch(error => {
                console.error("There was a problem with the fetch operation:", error.message);
            });
    }, []);



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
						{masterPlanets.filter(planet => planet.uid !== 4 && planet.uid !== 5).length > 0 && (
							<>
								<h2 className="sectionTitle">Planets</h2>
								<div className="row flex-row flex-nowrap rowSection">
									{masterPlanets
										.filter(planet => planet.uid !== 4 && planet.uid !== 5)
										.map((planet, index) => (
											<div className="col-3" key={index}>
												<Card className="CardPlanet" name={planet.name} url={planet.url} image={planet.image} uid={planet.uid} type="planet" />
											</div>
										))
									}
								</div>
							</>
						)}
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