import acronym from '@stdlib/string-acronym';

export default function getAcronym(name) {
  let acronym_name = acronym(name);
  return acronym_name;
}
  