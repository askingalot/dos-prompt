function log(thing) {
  console.log(thing);
  return thing;
}
const TYPE = {
    AMP: 'AMP',
    PIPE: 'PIPE',
    LEFT_PAREN: 'LEFT_PAREN',
    DATE: 'DATE',
    ESCAPE: 'ESCAPE',
    RIGHT_PAREN: 'RIGHT_PAREN',
    GREATER_THAN: 'GREATER_THAN',
    BACKSPACE: 'BACKSPACE',
    LESS_THAN: 'LESS_THAN',
    DRIVE: 'DRIVE',
    DRIVE_AND_PATH: 'DRIVE_AND_PATH',
    EQUAL: 'EQUAL',
    SPACE: 'SPACE',
    TIME: 'TIME',
    VERSION: 'VERSION',
    NEW_LINE : 'NEW_LINE',
    DOLLAR: 'DOLLAR',
    PUSHD_DEPTH: 'PUSHD_DEPTH',
    REMOTE_NAME: 'REMOTE_NAME',
    LITERAL: 'LITERAL',
  };

const TOKEN_TEMPLATES = {
  '$A': {
    type: TYPE.AMP, lexeme: '$A',
    description: '& (Ampersand)'
  },
  '$B': {
    type: TYPE.PIPE, lexeme: '$B',
    description: '| (pipe)'
  },
  '$C': {
    type: TYPE.LEFT_PAREN, lexeme: '$C',
    description: '( (Left parenthesis)'
  },
  '$D': {
    type: TYPE.DATE, lexeme: '$D',
    description: 'Current date'
  },
  '$E': {
    type: TYPE.ESCAPE, lexeme: '$E',
    description: 'Escape code (ASCII code 27)'
  },
  '$F': {
    type: TYPE.RIGHT_PAREN, lexeme: '$F',
    description: ') (Right parenthesis)'
  },
  '$G': {
    type: TYPE.GREATER_THAN, lexeme: '$G',
    description: '> (greater-than sign)'
  },
  '$H': {
    type: TYPE.BACKSPACE, lexeme: '$H',
    description: 'Backspace (erases previous character)'
  },
  '$L': {
    type: TYPE.LESS_THAN, lexeme: '$L',
    description: '< (less-than sign)'
  },
  '$N': {
    type: TYPE.DRIVE, lexeme: '$N',
    description: 'Current drive'
  },
  '$P': {
    type: TYPE.DRIVE_AND_PATH, lexeme: '$P',
    description: 'Current drive and path'
  },
  '$Q': {
    type: TYPE.EQUAL, lexeme: '$Q',
    description: '= (equal sign)'
  },
  '$S': {
    type: TYPE.SPACE, lexeme: '$S',
    description: '(space)'
  },
  '$T': {
    type: TYPE.TIME, lexeme: '$T',
    description: 'Current time'
  },
  '$V': {
    type: TYPE.VERSION, lexeme: '$V',
    description: 'Windows version number'
  },
  '$_': {
    type: TYPE.NEW_LINE, lexeme: '$_',
    description: 'Carriage return and linefeed'
  },
  '$$': {
    type: TYPE.DOLLAR, lexeme: '$$',
    description: '$ (dollar sign)'
  },
  '$+': {
    type: TYPE.PUSHD_DEPTH, lexeme: '$+',
    description: 'zero or more plus sign (+) characters depending upon the depth of the PUSHD directory stack, one character for each level pushed.'
  }, '$M': {
    type: TYPE.REMOTE_NAME, lexeme: '$M',
    description: 'Displays the remote name associated with the current drive letter or the empty string if current drive is not a network drive.'
  },
};

function token(lexeme, position) {
  const nonLiteral = TOKEN_TEMPLATES[lexeme.toUpperCase()];
  return nonLiteral
    ? Object.assign({}, nonLiteral, { position })
    : { type: TYPE.LITERAL, description: 'A literal value.', lexeme, position };
}

function element(innerHTML) {
  const el = document.createElement('span');
  el.innerHTML = innerHTML;
  return el;
}

function padLeft(subject, pad) {
   return (pad + subject).slice(-pad.length);
};

export function tokenize(input) {
  const chars = input.split('');
  const tokens = [];

  for (let i=0; i<chars.length; i++) {
    const position = i;
    let lexeme = chars[i];

    if (chars[i] === '$') {
      lexeme += chars[++i];
    } else {
      while (i+1 < chars.length && chars[i+1] !== '$') {
        lexeme += chars[++i];
      }
    }

    tokens.push(token(lexeme, position));
  }

  return tokens;
}

export function parse(input) {
  if (!input) {
    throw new Error("Invalid input");
  }
  const tokens = tokenize(input);
  const output = [];

  for(let i=0; i<tokens.length; i++) {
    const tok = tokens[i];
    output.push(tok);

    if (tok.type === 'ESCAPE' && i+1 < tokens.length && tokens[i+1].type === 'LITERAL') {
      tok.arg = tokens[++i].lexeme;
    }
  }

  return output;
}

export function compile(input) {
  const tokens = parse(input);
  const output = [];

  for (let i=0; i<tokens.length; i++) {
    const tok = tokens[i];

    switch(tok.type) {
      case TYPE.AMP:
        output.push(element('&amp;'));
        break;
      case TYPE.PIPE:
        output.push(element('|'));
        break;
      case TYPE.LEFT_PAREN:
        output.push(element('('));
        break;
      case TYPE.DATE:
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const now = new Date(),
              day = days[now.getDay()],
              month = padLeft(now.getMonth() + 1, '00'),
              date = padLeft(now.getDate(), '00'),
              year = now.getFullYear();
        output.push(element(`${day} ${month}/${date}/${year}`));
        break;
      case TYPE.ESCAPE:
        // FIXME: This doesn't do anything
        output.push(element(`ESCAPE(${tok.arg})`));
        break;
      case TYPE.RIGHT_PAREN:
        output.push(element(')'));
        break;
      case TYPE.GREATER_THAN:
        output.push(element('&gt;'));
        break;
      case TYPE.BACKSPACE:
        const prev = output.pop();
        if (!prev) break;

        output.push(element(prev.innerHTML.substring(0, prev.innerHTML.length - 1)));
        break;
      case TYPE.LEFT_PAREN:
        output.push(element('&lt;'));
        break;
      case TYPE.DRIVE:
        output.push(element('C'));
        break;
      case TYPE.DRIVE_AND_PATH:
        output.push(element('C:\\some\\path'));
        break;
      case TYPE.EQUAL:
        output.push(element('='));
        break;
      case TYPE.SPACE:
        output.push(element('&nbsp;'));
        break;
      case TYPE.TIME:
        const time = new Date(),
              hours = padLeft(time.getHours(), '  '),
              minutes = padLeft(time.getMinutes(), '00'),
              seconds = padLeft(time.getSeconds(), '00'),
              hundreds = padLeft(Math.floor(time.getMilliseconds() / 10), '00');
        output.push(element(`${hours}:${minutes}:${seconds}.${hundreds}`));
        break;
      case TYPE.VERSION:
        output.push(element('Microsoft Windows [Version 10.0.16299.125]'));
        break;
      case TYPE.NEW_LINE:
        output.push(element('<br/>'));
        break;
      case TYPE.DOLLAR:
        output.push(element('$'));
        break;
      case TYPE.PUSHD_DEPTH:
        output.push(element('+++'));
        break;
      case TYPE.REMOTE_NAME:
        output.push(element('machine-name'));
        break;
      case TYPE.LITERAL:
        output.push(element(tok.lexeme));
        break;
      default:
        throw new Error("Cannot compile prompt. Unknown token type");
    }
  }

  return output;
}
