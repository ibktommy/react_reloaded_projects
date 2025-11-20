// netlify/functions/apiHandler.js
export const handler = async (event) => {
  const { city } = event.queryStringParameters;

  const API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

  if (!city) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "City is required!" }),
    };
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=Metric`
    );

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch weather data" }),
    };
  }
};
