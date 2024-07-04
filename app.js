let textareaInput = document.querySelector("#textarea-input");
let textareaOutputContainer = document.querySelector("#textarea-output-container");
let textareaOutput = document.querySelector(".container__output__textarea");
let textWarning = document.querySelector(".container__warning__text");
let imgOutput = document.querySelector("#doll");

const map = new Map();
map.set("a", "ai");
map.set("e", "enter");
map.set("i", "imes");
map.set("o", "ober");
map.set("u", "ufat");

const encryptWords = (words) => {
    if (!words) {
        return '';
    }
    let encryptedWords = '';
    for (let i = 0; i < words.length; i++) {
        let letter = words[i];
        encryptedWords += map.has(letter) ? map.get(letter) : letter;
    }
    return encryptedWords;
}

const decryptWords = (words) => {
    if (!words) {
        return '';
    }
    words = words.replace(/ai/gi, "a");
    words = words.replace(/enter/gi, "e");
    words = words.replace(/imes/gi, "i");
    words = words.replace(/ober/gi, "o");
    words = words.replace(/ufat/gi, "u");
    return words;
}

const hideElement = (element) => {
    element.style.display = "none";
};

const showElement = (element) => {
    element.style.display = "block";

}

const showMessage = (element, message) => {
    element.value = message;
}

const showWarning = (element, message) => {

    const originalText = "Solo letras minúsculas y sin acentos";
    const originalColor = '#495057';

    element.textContent = message;
    element.style.color = "red";


    setTimeout(() => {
        element.textContent = originalText;
        element.style.color = originalColor;
    }, 2000);
};

const isLowercaseWithoutSpecials = (text) => {
    var pattern = /^[a-z0-9\s]+$/;
    return pattern.test(text);
}

const copyToClipboard = () => {

    const copyContent = async () => {
        try {
            await navigator.clipboard.writeText(textareaOutput.value);
            alert('Contenido copiado al portapapeles');
        } catch (err) {
            alert('Error al copiar: ', err);
        }
    }

    copyContent();
}

const processText = (action) => {
    let words = textareaInput.value;

    if (!words) {
        showWarning(textWarning, "¡Por favor ingresa texto antes de encriptar!");
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    } else if (!isLowercaseWithoutSpecials(words)) {
        showWarning(textWarning, "Solo letras minúsculas y sin acentos");
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    }
    else if (action == "encrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, encryptWords(words));
    } else if (action == "decrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, decryptWords(words));
    }

}

