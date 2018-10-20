const vm = require('vm');
const MY_MIND = true;

const sandbox = {MY_MIND: false};
vm.createContext(sandbox); // Contextify the sandbox.

console.log(MY_MIND); //true

with (sandbox) {
  console.log(MY_MIND); //false
}
