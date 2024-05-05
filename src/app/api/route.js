function makeWeatherRequestURL(location, date1) {
  let url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline"
  url = url + '/' + location;
  url = url + '/' + date1;
  url = url + '?key=VKC3G5F2AEAV3XV6TWPAGVZUW'
  console.log(url);
  return url;
}

export async function POST(req, res) {
  const json = await req.json();
  const response = await fetch(makeWeatherRequestURL(json.locationString, json.day));
  const responseJson = await response.json();
  console.log(responseJson)
  return new Response(JSON.stringify(responseJson));
}