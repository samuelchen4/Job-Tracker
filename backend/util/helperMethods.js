// returns todays date in string format
const todaysDateToString = () => {
  const currentDate = new Date();
  const stringDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return stringDate;
};

module.exports = { todaysDateToString };
