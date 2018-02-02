import './style.css';
import { compile } from './prompt-compiler';

function textInput() {
  const input = document.createElement('input');
  input.id = 'text-input';
  input.type = 'text';
  input.setAttribute('autofocus', true);
  return input;
}

function promptOutput() {
  const output = document.createElement('div');
  output.id = 'prompt-output';
  return output;
}

function setPromptButton(clickHandler) {
  const button = document.createElement('button');
  button.id = 'set-prompt';
  button.innerHTML = 'Set Prompt';
  button.onclick = clickHandler;
  return button;
}

function app() {
  const input = textInput();
  const output = promptOutput();
  const button = setPromptButton(() => {
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }

    const elements = compile(input.value);
    for (let el of elements) {
      output.appendChild(el);
    }
  });

  const app = document.createElement('div');
  app.appendChild(input);
  app.appendChild(button);
  app.appendChild(output);
  return app;
}

document.getElementsByTagName('body')[0].appendChild(app());
