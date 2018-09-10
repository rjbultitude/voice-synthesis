import domels from './domels.js';

let synth;
let voice;
let voices;
let vLang = 'en-GB';

function getVoice(newLang) {
  voice = voices.find((_voice) => {
    if (_voice.lang === newLang) {
      return true;
    }
    return false;
  });
}

let attempts = 0;
function loadVoices() {
  attempts++;
  voices = synth.getVoices();
  if (voices.length) {
    getVoice(vLang);
    populateAndChange();
    console.log('voices', voices);
  }
  if (!voice) {
    if (attempts < 10) {
      setTimeout(() => {
        loadVoices();
      }, 250);
    } else {
      console.error(`${vLang} voice not found.`);
    }
  }
}

function populateVoiceList() {
  for(let i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
    
    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    domels.voiceType.appendChild(option);
  }
}

function populateAndChange() {
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
}

if ('speechSynthesis' in window) {
  synth = window.speechSynthesis;
  loadVoices();
}

function speak(text, theLang, thePitch, theRate) {
  console.log('theLang', theLang);
  let newVoice = getVoice(theLang);
  if (!synth || synth.speaking) {
    return;
  }
  // …,..., ___
  const output = text.replace(/(…|[._]{2,})/, '');
  const utterance = new SpeechSynthesisUtterance(output);
  utterance.addEventListener('error', error => console.error(error));
  utterance.lang = theLang || vLang;
  utterance.pitch = thePitch || 1;
  utterance.rate = theRate || 1;
  utterance.voice = newVoice || voice;
  utterance.volume = 1;
  synth.speak(utterance);
}

export default {
  speak,
};