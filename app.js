let textareaInput = document.querySelector("#textarea-input");
let textareaOutputContainer = document.querySelector("#textarea-output-container");
let textareaOutput = document.querySelector(".container__output__textarea");
let textWarning = document.querySelector(".container__warning__text");
let buttonTextCopy = document.querySelector(".text__button");
let buttonImgCopy = document.querySelector(".img__copy");
let buttonImgCopied = document.querySelector(".img__copied");
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

const showWarning = (element, initialMessage, initialColor, temporaryMessage, temporaryColor) => {
    const originalColor = initialColor;

    element.textContent = temporaryMessage;
    element.style.color = temporaryColor;


    setTimeout(() => {
        element.textContent = initialMessage;
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
            showWarning(buttonTextCopy, 'Copiar texto', '#0A3871' ,"¡Texto copiado!", '#0A3871');

            hideElement(buttonImgCopy);
            showElement(buttonImgCopied);

            setTimeout(() => {
                hideElement(buttonImgCopied);
                showElement(buttonImgCopy);
            }, 2000);
        } catch (err) {
            console.err('Error al copiar: ', err);
        }
    }
    copyContent();
}

const processText = (action) => {
    let words = textareaInput.value;

    if (!words) {
        showWarning(textWarning, "Solo letras minúsculas y sin acentos", '#495057',"¡Por favor ingresa texto antes de encriptar!",'red');
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    } else if (!isLowercaseWithoutSpecials(words)) {
        showWarning(textWarning, "Solo letras minúsculas y sin acentos", '#495057',"Solo letras minúsculas y sin acentos",'red');
        hideElement(textareaOutputContainer);
        showElement(imgOutput);
    }
    else if (action == "encrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, encryptWords(words));
        showMessage(textareaInput, "");
    } else if (action == "decrypt") {
        hideElement(imgOutput);
        showElement(textareaOutputContainer);
        showMessage(textareaOutput, decryptWords(words));
        showMessage(textareaInput, "");
    }
}

