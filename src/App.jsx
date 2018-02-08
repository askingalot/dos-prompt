import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { PromptForm } from './components/PromptForm';

import { compile } from './services/prompt-compiler';

import logo from './logo.svg';
import './App.css';

class App extends Component {
    hello = () => {
        alert("hello");
    }

    render() {
        return (
        <div className="App">
            <PromptForm/>
        </div>
        );
    }
}

export default App;
