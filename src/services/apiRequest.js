async function getStarWarsApi() {
  const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const request = await fetch(url);
  const data = await request.json();
  const { results } = data;
  return results;
}

export default getStarWarsApi;
