export function pickOne(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

export function pickOneAndInterp(arr, pName) {
  return pickOne(arr).replace("{{name}}", `"${pName}"`);

}

export function randomRange(min, max) {
  return min + Math.random()*(max-min);
}
