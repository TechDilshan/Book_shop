import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from "react-router-dom";

const Rathi_Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const intervalTime = 4000;
    let slideInterval;

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    useEffect(() => {
        startSlide();
        return () => {
            clearInterval(slideInterval);
        };
    }, []);

    const startSlide = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    const manualNavigation = (index) => {
        setCurrentIndex(index);
        clearInterval(slideInterval);
        startSlide();
    };

    const slides = [
        "images/h3.png",
        "images/h1.png",
        "images/5.jpg",
        "images/h2.png",
        "images/1.jpg"
    ];
    

    const contents = [
        {
            title: "Welcome to our online shop!",
            subtitle: "Welcome to our online shop!",
            description: "Explore the world from the comfort of your screen! Our website is updated daily with weekly offers and promotions making your purchase a valuable one. We want to make your onboarding experience free of worry",
            link: "#"
        },
        {
            title: "Stationery that inspires you to work",
            subtitle: "Stationery that inspires you to work",
            description: "Shop office supplies for business, schools and homeWe offer a wide variety of notebooks, pens, pencils, inks, fine papers and etc for all the stationery lover. Buy stationery items and office supplies in srilanka at cheaper price. We have made our way into thousands of schools, offices and homes all over the globe.",
            link: "#"
        },
        {
            title: "Unleash your creativity with our prints Prints so good, you cant look away",
            subtitle: "Prints so good, you cant look away",
            description: "We provide a comprehensive range of printing services to cater to both your business and personal requirements.Fast and reliable service Professional printing services.On your Mark, Get set, Print!",
            link: "#"
        },
        {
            title: "Your phone's new best friend",
            subtitle: "Your phone's new best friend",
            description: "We sell the best genuine phone accessories like chargers, head phones, speakers, screen protectors and etc around Sri Lanka. Some of the brands we do sell are samsung, nokia, oppo, JBL and etc. Make your phone stand out from the crowd",
            link: "#"
        },
        {
            title: "Your parcel, Our priority",
            subtitle: "Your parcel, Our priority",
            description: "We have dooe step delivery, return and exchange policies making it easier for customers to purchase our products On-Time delivery, Every time Your trusted delivery partner",
            link: "#"
        }
    ];

    return (
        <div>
            <section className="home">
                {slides.map((slide, index) => (
                    <img key={index} className={`img-slide ${index === currentIndex ? 'active' : ''}`} src={process.env.PUBLIC_URL + slide} alt={`Slide ${index + 1}`} />
                ))}
                {contents.map((content, index) => (
                    <div key={index} className={`content ${index === currentIndex ? 'active' : ''}`}>
                        <h1>{content.title}<br /><span>{content.subtitle}</span></h1>
                        <p>{content.description}</p>
                                    <Link to="/UserHome_C" className="register-link">
             GET START
            </Link>
                    </div>
                ))}
                <div className="media-icons">
                    <a href="https://www.facebook.com/p/Dehiwala-Curtain-Centre-100065649723019/"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                </div>
                <div className="slider-navigation">
                    {slides.map((slide, index) => (
                        <div key={index} className={`nav-btn ${index === currentIndex ? 'active' : ''}`} onClick={() => manualNavigation(index)}></div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Rathi_Home;
