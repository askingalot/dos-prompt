import './style.css';
import { parse, compile } from './parser';

function app() {
  const app = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'text';

  input.value = '$a$b';
  const output = document.createElement('div');

  const button = document.createElement('button');
  button.innerHTML = 'Compile';
  button.onclick = () => {
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }

    const elements = compile(parse(input.value));
    for (let el of elements) {
      output.appendChild(el);
    }
  };

  app.appendChild(input);
  app.appendChild(button);
  app.appendChild(output);
  return app;
}

document.getElementById('app').appendChild(app());
