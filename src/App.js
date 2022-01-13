import './styles/App.scss';
import {useState} from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import Intro from "./components/intro";
import Board from "./components/board";
import {Provider} from "react-redux";
import Store from "./redux/store";

function App() {
    return (
        <Provider store={Store}>
            <div className="App">
                <div className='background'>
                    <Router>
                        <Route path='/' exact component={Intro}/>
                        <Route path='/board' render={() => (<Board/>)} exact/>
                        <h1>hello World!</h1>
                    </Router>
                </div>
            </div>
        </Provider>
    );
}

export default App;
