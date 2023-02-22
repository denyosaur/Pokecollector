import React, { useState } from "react";

import Carousel from 'react-bootstrap/Carousel';

import CosmicEclipse from "../../assets/Cosmic-Eclipse.jpg";
import Background from "../../assets/background.jpg";
import Jolteon from "../../assets/jolteon.jpg";
import PokeballCards from "../../assets/pokeballcards.jpg";

import "../../css/homepage/homepagecarousel.css";

const HomepageCarousel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel
            className="HomepageCarousel"
            activeIndex={index}
            onSelect={handleSelect}
            fade
            interval={7000}
            pause={'hover'}
            wrap={false}
        >
            <Carousel.Item>
                <div className="HomepageCarousel-item">
                    <img src={CosmicEclipse} alt="PurplePokemonCard" id="CosmicEclipseImage" />
                </div>
                <Carousel.Caption>
                    <div className="HomepageCarousel-caption HomepageCarousel-caption1">
                        <span>Welcome to PokeCollector!</span>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="HomepageCarousel-item">
                    <img src={Jolteon} alt="JolteonCards" id="JolteonCardsImage" />
                </div>
                <Carousel.Caption>
                    <div className="HomepageCarousel-caption HomepageCarousel-caption2">
                        <p>Purchase cards at the PokeShop.</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="HomepageCarousel-item">
                    <img src={Background} alt="PokeballCards" id="PokemonCardsImage" />
                </div>
                <Carousel.Caption>
                    <div className="HomepageCarousel-caption HomepageCarousel-caption3">
                        <p>Build your own deck!</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="HomepageCarousel-item">
                    <img src={PokeballCards} alt="PokeballCards" id="PokeballCards" />
                </div>
                <Carousel.Caption>
                    <div className="HomepageCarousel-caption HomepageCarousel-caption4">
                        <p>Sign up to start collecting!</p>
                    </div>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <div className="HomepageCarousel-item">
                    <iframe src="https://www.youtube.com/embed/FDqDvvJyY2w?controls=0" id="Intro-video" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </Carousel.Item>
        </Carousel>
    );
};

export default HomepageCarousel;