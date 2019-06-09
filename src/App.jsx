import React, { Component } from 'react';
import { PromptForm } from './components/PromptForm';
import { PromptDisplay } from './components/PromptDisplay';
import './App.css';

class App extends Component {
    state = {
        promptInput: ""
    };

    onInputChange = (promptInput) => this.setState({promptInput});

    render() {
        return (
        <div className="App">
            <PromptForm onChange={this.onInputChange} />
            <PromptDisplay input={this.state.promptInput} />
        </div>
        );
    }
}

export default App;
