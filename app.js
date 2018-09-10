import speech from './speech.js';
import domels from './domels.js';

domels.textSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    let textVal = domels.textInput.value;
    if (textVal) {
        let dataLang = domels.voiceType.options[domels.voiceType.selectedIndex].getAttribute('data-lang');
        let voicePitch = domels.voicePitch.value;
        let voiceRate = domels.voiceRate.value;
        speech.speak(textVal, dataLang, voicePitch, voiceRate);
    } else {
        speech.speak('I\'m sorry, but you\'ve not entered any text');
    }
});