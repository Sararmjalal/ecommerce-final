

global.print = console.log;
global.printError = (...args) => {
  console.log("\x1b[41m", ...args);
  console.log("\x1b[0m");
};
global.deepClone = (obj) => JSON.parse(JSON.stringify(obj));


global.errs = {
  badInputErr: new Error('bad request: bad input'),
  
}