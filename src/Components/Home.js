import React from 'react';
import {BroswerRouter, Link, Route} from 'react-router-dom';

function Home() {
    return(
        <div className='homepage'>
            <h1>Loso's Pizza</h1>
            <h2>Customize your own pizza</h2>
            <Link to={"/Form"}>
                <button className='orderHere'>Start Order</button>
            </Link>
        </div>
    );
}

export default Home;