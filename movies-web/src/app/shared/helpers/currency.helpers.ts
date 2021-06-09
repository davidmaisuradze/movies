// NOTE: I've statically used 0.84 to convert dollars to euro here.
// If I had had more time, I would have to fetch euros real time exchange rates
export const dollarsToEuro = dollars => {
  return (dollars * 0.84).toFixed(2);
};
