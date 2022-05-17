export default function stateName(indexName) {
  if (indexName == 0) {
    return 'Pending';
  } else if (indexName == 1) {
    return 'Active';
  } else if (indexName == 2) {
    return 'Canceled';
  } else if (indexName == 3) {
    return 'Defeated';
  } else if (indexName == 4) {
    return 'Succeeded';
  } else if (indexName == 5) {
    return 'Queued';
  } else if (indexName == 6) {
    return 'Expired';
  } else if (indexName == 7) {
    return 'Executed';
  } else if (indexName == 8) {
    return 'Execution Failed';
  }


}