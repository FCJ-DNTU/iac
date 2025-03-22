const NUMBER = 12;

module.exports.handler = async function (event, context) {
  const { number } = event.queryStringParameters;
  let message = "";

  if (parseInt(number) > NUMBER) {
    message = `You chose a number which is greater than ${NUMBER} (${number} > ${NUMBER})`;
  } else if (parseInt(number) === NUMBER) {
    message = `You chose a number which is equal to ${NUMBER} (${number} = ${NUMBER})`;
  } else if (parseInt(number) < NUMBER) {
    message = `You chose a number which is less than ${NUMBER} (${number} < ${NUMBER})`;
  }

  return {
    statusCode: 300,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
    }),
  };
};
