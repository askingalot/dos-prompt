import React from 'react';


export const PromptForm = (props) => {
    return (
        <fieldset id="prompt-form">
            <label id="prompt-label" 
                   htmlFor="prompt-input">Prompt&gt; </label>
            <input autoFocus
                   id="prompt-input" 
                   onChange={(evt) => props.onChange(evt.target.value)}/>
        </fieldset>
    );
}
