import './style.css';
import { parse } from './parser';

function app() {
  const app = document.createElement('div');
  const input = document.createElement('input');
  input.type = 'text';

  input.value = '$a$b';

  const button = document.createElement('button');
  button.innerHTML = 'Parse';
  button.onclick = () => parse(input.value);

  app.appendChild(input);
  app.appendChild(button);
  return app;
}

document.getElementById('app').appendChild(app());
