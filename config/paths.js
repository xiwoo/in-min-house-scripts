

const path = require('path');
const fs = require('fs');
const url = require('url');


const appDir = fs.realpathSync(process.cwd());
console.log('appDir::' + appDir);

const resolveApp = p => path.resolve(appDir, p);
const resolveOwn = p => path.resolve(__dirname, '..', p);

const nodeEnv = process.env.NODE_ENV;


const devPropPath = resolveApp('config/dev.properties.js');
const prodPropPath = resolveApp('config/prod.properties.js');

let propPath;

if(nodeEnv === 'development') {
  propPath = devPropPath;
} else if(nodeEnv === 'production') {
  propPath = prodPropPath;
}

const envProp = require(propPath);
const index = envProp.index;
const venders = envProp.vendors || [];

module.exports = {
  appPath: resolveApp('.'),
  appBuild: resolveOwn('../../build'),
  appIndexJs: resolveApp(index || 'src/index.js'),
  appVendorJsList: venders.map(vendor => resolveApp(vendor)),
};