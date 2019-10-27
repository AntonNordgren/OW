import React from 'react';
import "./App.css";

import SearchComponent from "./components/SearchComponent";

class App extends React.Component {

    render() {
        return (
            <div className="App">
                <div className="App-header">
                </div>
                <SearchComponent />
            </div>
        );
    }

}

export default App;