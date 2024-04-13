const API_KEY = 'af14abb176424142bb630dc1c687887b';

const getAddressFromCoordinates = async (latitude, longitude) => {
    console.log(latitude, longitude);
//   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`;
  const apiUrl = `https://api.opencagedata.com/geocode/v1/json?key=${API_KEY}&q=${latitude}+${longitude}&pretty=1`;


  const response = await fetch(apiUrl);
  const data = await response.json();

  return data.results[0].formatted;
};

export { getAddressFromCoordinates };