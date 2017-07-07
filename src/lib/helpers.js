export const pickRandomFact = facts => {
  return facts[Math.floor(Math.random() * facts.length)];
}
