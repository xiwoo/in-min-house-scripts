process.on('unhandledRejection', err => {
  throw err;
});

const spawn = require('react-dev-utils/crossSpawn');


const args = process.argv.slice(2);

console.log('argv:: ', process.argv);
console.log('args result:: ', args);

const scriptIndex = args.findIndex(
  x => x === 'build' || x === 'build_app' || 'start'
);

console.log('scriptIndex:: ', scriptIndex);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];

console.log('input script:: ' + script);

const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch(script) {
  case 'start': {
    const result = spawn.sync(
      'node',
      nodeArgs
        .concat(require.resolve('../scripts/' + script))
        .concat(args.slice(scriptIndex + 1)),
      {stdio: 'inherit'}
    );
    
    console.log('spawn result:: ', result);

    if(result.signal) {
      if(result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
          'This probably means the system ran out of memory or someone called ' +
          '`kill -9` on the process.'
        );
      } else if(result.signal === 'SIGKILL') {
        console.log(
          'The build failed because the process exited too early. ' +
          'Someone might have called `kill` or `killall`, or the system could ' +
          'be shutting down.'
        );
      }

      process.exit(1);
    }
    
    process.exit(result.status);
    break;
  }

  default: 
    console.log('Unknown script "' + script + '".');
    console.log('Perhaps you need to update react-script?');
    console.log(
      'See: https://facebook.github.io/create-react-app/docs/updating-to-new-releases'
    );
    break;
}