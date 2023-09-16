import React, {useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../store/appContext"; // trsaigo todos los datos y funciones definidas en appContext.js

export const Navbar = () => {

    const { store, actions } = useContext(AppContext);

	if (store.favorites != undefined){
	return (
		<nav className="navbar navbar-light bg-light mb-3">
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
								{item.name} <i className="fa-regular fa-trash-can" onClick={() => actions.deleteFavorite(item)}></i>
								</li>) 
						})}
					</ul>
				</div>
			</div>
		</nav>
	)} else {
		return (
			<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<img className='main-logo' src='https://www.freepnglogos.com/uploads/star-wars-logo-31.png' />
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
				<div className="dropdown">
					<button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						Loading...
					</button>
					</div>
				</Link>
			</div>
		</nav>
		)
	}
};