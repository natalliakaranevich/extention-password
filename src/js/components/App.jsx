import React, { Component } from 'react';

import Loader from './core/loader.jsx';
import '../../styles/app.scss';
import SavedPasswords from './savedPasswords.jsx';
import BlackList from './blackList.jsx';

class App extends Component {
    constructor() {
        super();

        this.state = {
            loading: false
        };
    }

    render() {
        const { loading } = this.state;

        return !loading ? (
                <div className="app-wrapper">
                    <h2>Saved passwords</h2>
                    <SavedPasswords/>
                    <br/>
                    <h2>Black List</h2>
                    <BlackList/>
                </div>
        ) : <Loader />;
    }
}

export default App;
