import React, { Component } from 'react';
import logo from './logo.svg'
import background_image from './beautiful-color-gradients.png'
import './App.css';
import './SearchBar';
import SearchBar from "./SearchBar";
import {Button} from "@material-ui/core";
import Navbar from "./Navbar";

const logoStyle = {
    padding: 25,
    height: 200,
    width: 500
};

const background = {
    backgroundImage: `url(${background_image})`,
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    overflow: 'hidden',
    height: '100%',
};

const styles = ({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        width: '30%',
        height: 40
    }
});

class App extends Component {
    render() {
        return (
            <div className="App" style={background}>
            <Navbar/>
            <div className="Primary-Container">
            <img
        src={logo}
        alt="My logo"
        style={logoStyle}
        />
        <SearchBar/>
        <div className="Button-bar" style={styles.container}>
            <Button variant="contained" style={styles.button}>
            Login
            </Button>
            <Button variant="contained" style={styles.button}>
            Sign Up
        </Button>
        </div>
        </div>
        </div>
    );
    }
}


export default App;
