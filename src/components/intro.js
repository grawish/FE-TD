import React from 'react';
import './styles/intro.scss';
import {Link} from "react-router-dom";

const Intro = () => (
    <div className='intro'>
        <div className='center-box'>
            <h1>Sprint To Do</h1>

            <Link to="/board">
                <button>Get Started!</button>
            </Link>
        </div>
    </div>
);

export default Intro;