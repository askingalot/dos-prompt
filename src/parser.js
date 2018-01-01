function log(thing) {
  console.log(thing);
  return thing;
}

const TOKEN_TYPES = {
  '$A': {
    type: 'AMP', lexeme: '$A',
    description: '& (Ampersand)'
  },
  '$B': {
    type: 'PIPE', lexeme: '$B',
    description: '| (pipe)'
  },
  '$C': {
    type: 'LEFT_PAREN', lexeme: '$C',
    description: '( (Left parenthesis)'
  },
  '$D': {
    type: 'DATE', lexeme: '$D',
    description: 'Current date'
  },
  '$E': {
    type: 'ESCAPE', lexeme: '$E',
    description: 'Escape code (ASCII code 27)'
  },
  '$F': {
    type: 'RIGHT_PAREN', lexeme: '$F',
    description: ') (Right parenthesis)'
  },
  '$G': {
    type: 'GREATER_THAN', lexeme: '$G',
    description: '> (greater-than sign)'
  },
  '$H': {
    type: 'BACKSPACE', lexeme: '$H',
    description: 'Backspace (erases previous character)'
  },
  '$L': {
    type: 'LESS_THAN', lexeme: '$L',
    description: '< (less-than sign)'
  },
  '$N': {
    type: 'DRIVE', lexeme: '$N',
    description: 'Current drive'
  },
  '$P': {
    type: 'DRIVE_AND_PATH', lexeme: '$P',
    description: 'Current drive and path'
  },
  '$Q': {
    type: 'EQUAL', lexeme: '$Q',
    description: '= (equal sign)'
  },
  '$S': {
    type: 'SPACE', lexeme: '$S',
    description: '(space)'
  },
  '$T': {
    type: 'TIME', lexeme: '$T',
    description: 'Current time'
  },
  '$V': {
    type: 'VERSION', lexeme: '$V',
    description: 'Windows version number'
  },
  '$_': {
    type: 'NEW_LINE', lexeme: '$_',
    description: 'Carriage return and linefeed'
  },
  '$$': {
    type: 'DOLLAR', lexeme: '$$',
    description: '$ (dollar sign)'
  },
  '$+': {
    type: 'PUSHD_DEPTH', lexeme: '$+',
    description: 'zero or more plus sign (+) characters depending upon the depth of the PUSHD directory stack, one character for each level pushed.'
  },
  '$M': {
    type: 'REMOTE_NAME', lexeme: '$M',
    description: 'Displays the remote name associated with the current drive letter or the empty string if current drive is not a network drive.'
  },
};

function literalToken(lexeme) {
  return {
    type: 'LITERAL', lexeme: lexeme,
    description: 'A literal value.'
  };
}


function tokenize(input) {
  const chars = input.split('');
  const tokens = [];

  for (let i=0; i<chars.length; i++) {
    let lexeme = chars[i];
    if (chars[i] === '$') {
      lexeme += chars[++i];
    } else {
      while (i+1 < chars.length && chars[i+1] !== '$') {
        lexeme += chars[++i];
      }
    }

    tokens.push(TOKEN_TYPES[lexeme.toUpperCase()] || literalToken(lexeme));
  }

  return tokens;
}

export function parse(input) {
  if (!input) {
    throw new Error("Invalid input");
  }
  log(input);

  const tokens = tokenize(input);
  for(let tok of tokens) {
    log(tok);
  }
}
