import React, { Component } from 'react';
import logo from './logo.svg'
import background_image from './beautiful-color-gradients.png'
import './App.css';
import './SearchBar';
import SearchBar from "./SearchBar";
import {Button} from "@material-ui/core";
import MiniDrawer from "./Drawer";

const logoStyle = {
    padding: 50,
    height: 300,
    width: 600
};

const background = {
        backgroundImage: `url(${background_image})`,
        backgroundRepeat  : 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
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
            <MiniDrawer/>
            <div className="Primary-Container">
                <img
                    className ="App-logo"
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
