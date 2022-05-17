export default function voteIndex(vote) {
  if (vote == 'No') {
    return 0;
  } else if (vote == 'Yes') {
    return 1;
  } else if (vote == 'Abstain') {
    return 2;
  } 
}