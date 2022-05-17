export default function addHoursToDate(objDate, intMinutes) {
  var numberOfMlSeconds = objDate.getTime();
  var addMlSeconds = intMinutes * 60000;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);

  return newDateObj;
}