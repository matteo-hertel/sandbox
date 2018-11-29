import beers from './beers.json';
import {pickAll, map} from 'ramda';
const baseProps = ['name', 'tagline'];

const beerList = map(extractBeerProps([...baseProps, 'description']), beers);

console.log(beerList);

function extractBeerProps(props) {
  return pickAll(props);
}
