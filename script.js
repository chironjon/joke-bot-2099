const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
// api
var token = process.env.API_KEY;
// VoiceRSS Javascript SDK

// disable/enable joke button
function toggleButton() {
  button.disabled = !button.disabled;
}

// Passing joke to voicerss API
function tellMe(joke) {
  console.log(joke)
  VoiceRSS.speech({
    key: token,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes from api
async function getJokes() {
  // disable button
  toggleButton();
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming,Miscellaneous,Dark,Pun?blacklistFlags=nsfw,religious,political,racist,sexist';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // text to speech
    tellMe(joke);
  } catch (error) {
    console.log('whoops', error)
  }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);