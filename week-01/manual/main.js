
const input = ["88", "47", "-5", "101", "abc", "73", "50", "", "100"];

const validMarks = input
  .map(x => (typeof x === 'string' && x.trim() === '' ? NaN : Number(x)))
  .filter(x => !isNaN(x) && Number.isInteger(x) && x >= 0 && x <= 100);

if (validMarks.length === 0) {
  console.log("No valid marks found.");
} else {
  const count = validMarks.length;
  const sum = validMarks.reduce((a, b) => a + b, 0);
  const average = (sum / count).toFixed(2);
  const highest = Math.max(...validMarks);
  const lowest = Math.min(...validMarks);
  
  const passCount = validMarks.filter(x => x >= 50).length;
  const passRate = ((passCount / count) * 100).toFixed(1);

  console.log(`Valid marks: ${count}`);
  console.log(`Average: ${average}`);
  console.log(`Highest: ${highest}`);
  console.log(`Lowest: ${lowest}`);
  console.log(`Pass rate: ${passRate}%`);
}