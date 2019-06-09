import React from 'react';
import { compile } from '../services/prompt-compiler';

export const PromptDisplay = (props) => {
    const output = props.input ? compile(props.input) : [] ;
    return (
        <div className="display">
            {output.map((o, i) =>
                <span key={i} dangerouslySetInnerHTML={{__html: o}}/>
            )}_
        </div>
    );
}
