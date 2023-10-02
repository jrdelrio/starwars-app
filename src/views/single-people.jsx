import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
// import { AppContext } from "../store/appContext.js";
import PropTypes from "prop-types";

export const SinglePeople = (props) => {
    // const { store, actions } = useContext(AppContext);
    const params = useParams();
    const [features, setFeatures] = useState({});
    const [mainImage, setMainImage] = useState('');




    useEffect(() => {
        Promise.all([
            fetch(`https://www.swapi.tech/api/people/${params.id}`).then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            }),
            fetch(`https://starwars-visualguide.com/assets/img/characters/${params.id}.jpg`).then(res => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.blob();
            })
        ])
            .then(data => {
                // `data[0]` contains the JSON response from the first fetch
                // `data[1]` contains the blob response from the second fetch

                setFeatures(data[0].result.properties); // Set the character details

                const imageUrl = URL.createObjectURL(data[1]); // Convert the blob to an object URL
                setMainImage(imageUrl); // Use this URL in an `img` tag
            })
            .catch(error => {
                console.error("There was an error fetching the data:", error);
            });

    }, [params]);

    const explicacion = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem s\
	accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis s\
	et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur s\
	aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro s\
	quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi s\
	tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum s\
	exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure.'

    console.log(features)

    return (
        <>
            <div className="wrapper single-wrapper">

                <div className="single-image">
                    <img src={mainImage} alt="" className="wb" />
                </div>
                <div className="single-description wb">
                    <h1>{features.name}</h1>
                    <div className="container single-features">
                        <div className="row">
                            <div className="col-4">Gender:</div>
                            <div className="col-8"><strong>{features.gender}</strong></div>
                        </div>
                        <div className="row">
                            <div className="col-4">Mass:</div>
                            <div className="col-8"><strong>{features.mass}</strong></div>
                        </div>
                        <div className="row">
                            <div className="col-4">Height:</div>
                            <div className="col-8"><strong>{features.height}</strong></div>
                        </div>
                        <div className="row">
                            <div className="col-4">Birth date:</div>
                            <div className="col-8"><strong>{features.birth_year}</strong></div>
                        </div>

                        <div className="row">
                            <div className="col-4">Eye color:</div>
                            <div className="col-8"><strong>{features.eye_color}</strong></div>
                        </div>

                        <div className="row">
                            <div className="col-4">Hair color:</div>
                            <div className="col-8"><strong>{features.hair_color}</strong></div>
                        </div>

                        <div className="row">
                            <div className="col-4">Skin color:</div>
                            <div className="col-8"><strong>{features.skin_color}</strong></div>
                        </div>
                    </div>
                </div>

            </div>



        </>

    )
}


SinglePeople.propTypes = {
    match: PropTypes.object
};

// birth_year
// :
// "19BBY"
// created
// :
// "2023-10-02T00:45:24.502Z"
// edited
// :
// "2023-10-02T00:45:24.502Z"
// eye_color
// :
// "blue"
// gender
// :
// "male"
// hair_color
// :
// "blond"
// height
// :
// "172"
// homeworld
// :
// "https://www.swapi.tech/api/planets/1"
// mass
// :
// "77"
// name
// :
// "Luke Skywalker"
// skin_color
// :
// "fair"
// url
// :
// "https://www.swapi.tech/api/people/1"