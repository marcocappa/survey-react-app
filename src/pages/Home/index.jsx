import React from "react";
import { Link } from "react-router-dom"

import QAIcon from "../../components/Icons/QAIcon.jsx"

const Home = () => (
    <div className="app home">
        <main className="container">
            <QAIcon />
            <h1>Welcome to the Survey React App</h1>
            <h3>You can start our multiple choice survey, are you ready?</h3>
            <Link
                to="/survey"
                className="btn"
                title="Get started with our survey"
            >Get Started</Link>
        </main>
    </div>
)

export default Home;