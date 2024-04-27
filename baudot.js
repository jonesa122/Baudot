function crypt(message, key){
    var result = [];
    for(let i = 0 ; i < message.length; i++){
        let keyIndex = i % key.length;
        let messageNumber = message[i];
        let keyNumber = key[keyIndex];
        let tempResult = messageNumber ^ keyNumber;
        result.push(tempResult);
    }
    console.log(result);
    return result;
}
    
function decode(encoded){
    var decoded = [];
    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","shiftF"];
    const binary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17, 27]; 
    const figures = ["-","?",":","who are you?","3","%","@","$","8","ring bell","(",")",".",",","9","0","1","4","'","5","7","=","2","/","6","+","shiftL"];
    const finary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17,  31];
    const specialCharacter = ["/", " ", "\n", "line feed"];
    const special = [0, 4, 2, 8];

    var isLetter = true;
    for(let i = 0; i < encoded.length; i++){
        var found = false;
        var encodedNumber = encoded[i];
        for (let j = 0; j<special.length && !found; j++){
            if(encodedNumber == special[j]){
                found = true;
                decoded.push(specialCharacter[j]);
            }
        }
        if(!found){
            if(isLetter){
                for(let j=0; j < binary.length && !found; j++){
                    if(encodedNumber == binary[j]){
                        console.log(letters[j]);
                        found = true;
                        decoded.push(letters[j]);
                        if(j == 26){
                            isLetter = false;
                        }
                    }
                }
            } else{
                for(let j=0; j < finary.length && !found; j++){
                    if(encodedNumber ==finary[j]){
                        found = true;
                        decoded.push(figures[j]);
                        if(j == 26){
                            isLetter = true;
                        }
                    }
                }
            }
        }
    }
    return decoded;
}

function encode(message){
    var encoded = [];
    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q"
        ,"r","s","t","u","v","w","x","y","z","shiftF"];
    const binary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17, 27]; 
    const figures = ["-","?",":","who are you?","3","%","@","$","8","ring bell"
        ,"(",")",".",",","9","0","1","4","'","5","7","=","2","/","6","+","shiftL"];
    const finary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17,  31];
    const specialCharacter = ["/", " ", "\n", "line feed"];
    const special = [0, 4, 2, 8];

    var firstCharacter="";
    var firstSix="";
    var firstNine ="";
    var firstTwelve ="";

    if(message.length >= 1){
        firstCharacter = message.substring(0,1);
    }
    if(message.length >= 6)
        firstSix = message.substring(0,6);
    
    if(message.length >= 9){
        firstNine = message.substring(0,9);
    }
    if(message.length>=12){
        firstTwelve = message.substring(0,12);
    }

    var isLetters = false;
    var isFigures = false;

    if(firstSix === (letters[26])){
        isLetters = true;
    }
    if(firstSix === (figures[26])||firstNine === (figures[9])||firstTwelve === (figures[3])){
        isFigures = true;
    }

    for(i=0; i<letters.length && !isLetters && !isFigures; i++){
        if(firstCharacter === (letters[i])){
            isLetters=true;
        }
    }

    for(i=0; i<figures.length && !isLetters && !isFigures; i++){
        if(firstCharacter === (figures[i])){
            isFigures=true;
        }
    }
    
    if(isLetters){
        encodeLetters(encoded, message, 0);
    } else if(isFigures){
        encodeFigures(encoded, message, 0);
    } else{
        encodeSpecial(encoded, message, 0);
    }

    console.log(encoded);

    return encoded;
}

function encodeLetters(encoded, message, index){
    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","shiftF"];
    const binary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17, 27]; 
    var i;
    for(i = index; i < message.length; i++){
        var charInMessage = message.substring(i, i+1);
        console.log(charInMessage);
        var nextSix = "";
        if(message.length > i+5){
            nextSix = message.substring(i, i+6);
        }
        var match = false;
        if(nextSix === (letters[26])){
            console.log(nextSix);
            match = true;
            encoded.push(binary[26]);
            i = encodeFigures(encoded, message, i+6);
        }
        for(let j = 0; j < letters.length && !match; j++){
            if(charInMessage === (letters[j])){
                encoded.push(binary[j]);
                match=true;
            }
        }
        if(!match){
            i = encodeSpecial(encoded, message, i);
        }
    }
    return i;
}

function encodeFigures(encoded, message, index){
    const figures = ["-","?",":","who are you?","3","%","@","$","8","ring bell","(",")",".",",","9","0","1","4","'","5","7","=","2","/","6","+","shiftL"];
    const finary = [24, 19, 28, 18, 16, 22, 11, 5, 12, 26, 30, 9, 7, 6, 3, 13, 29, 10, 20, 1, 28, 15, 25, 23, 21, 17,  31];
    var i;
    for(i = index; i<message.length; i++){
        charInMessage = message.substring(i, i+1);
        var nextSix = "";
        var nextNine ="";
        var nextTwelve = "";
        if(message.length > i+5){
            nextSix = message.substring(i, i+6);
        }
        if(message.length > i + 8){
            nextNine = message.substring(i, i+9);
        }
        if(message.length > i + 11){
            nextTwelve = message.substring(i, i+12);
        }
        var match = false;
        if(nextSix === (figures[26])){
            match = true;
            encoded.push(finary[26]);
            i = encodeLetters(encoded, message, i+6);
        }
        if(nextNine === (figures[9])){
            match = true;
            encoded.push(finary[9]);
            i = encodeFigures(encoded, message, i + 9);
        }
        if(nextTwelve === (figures[3])){
            match = true;
            encoded.push(finary[3]);
            i = encodeFigures(encoded, message, i+12);
        }
        for(let j = 0; j < figures.length && !match; j++){
            if(charInMessage === (figures[j])){
                encoded.push(finary[j]);
                match = true;
            }
        }
        if(!match){
            i = encodeSpecial(encoded, message, i);
        }
    }
    return i;
}

function encodeSpecial(encoded, message, index){
    const specialCharacter = ["/", " ", "\n", "line feed"];
    const special = [0, 4, 2, 8];
    const letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","shiftF"];
    var isLetters = false;
    var isFigures = false;
    var nextSix = "";
    var i;
    for (i=index; i<message.length && !isLetters && !isFigures; i++){
        var charInMessage = message.substring(i, i+1);
        if(message.length > i+6){
            nextSix = message.substring(i, i+6);
        }
        var match = false;
        for(let j = 0; j< specialCharacter.length && !match; j++){
            if(charInMessage === (specialCharacter[j])){
                encoded.push(special[j]);
                match = true;
            }
        }
        if(!match){
            for(let k = 0; k<letters.length && !isLetters; k++){
                if(charInMessage === (letters[k])){
                    isLetters=true;
                }
            }
            if(isLetters){
                i = encodeLetters(encoded, message, i);
            } else {
                isFigures = true;
                i = encodeFigures(encoded, message, i);
            }
        }
    }
    return i;
}

function printBinary(encoded){
    var final = "";
    for(let i = 0; i<encoded.length; i++){
        var tempInt = encoded[i];
        var binary = tempInt.toString(2);
        binary = binary.padStart(5, '0').replace(/ /, '0');
        final = final.concat(binary);
    }
    return final;
}

function printMessage(decoded){
    var final = "";
    for(let i = 0; i < decoded.length; i++){
        final = final.concat(decoded[i]);
    }
    return final;
}

function determineInputOutput(inputIndicator, outputIndicator, input, key){
    var i;
    var j;
    var inputSelected;
    var outputSelected;
    for(i = 0; i < inputIndicator.length; i++){
        if(inputIndicator[i].checked){
            inputSelected = inputIndicator[i].value;
        }
    }
    for(j = 0; j < outputIndicator.length; j++){
        if(outputIndicator[j].checked){
            outputSelected = outputIndicator[j].value;
        }
    }
    console.log(inputSelected);
    console.log(outputSelected);
    console.log(input);
    console.log(key);

    if(inputSelected === "englishPlaintextInput"){
        if(outputSelected === "englishPlaintextOutput"){
            return input;
        } else if(outputSelected === "binaryPlaintextOutput"){
            return printBinary(encode(input));
        } else if(outputSelected === "englishCiphertextOutput"){
            return printMessage(decode(crypt(encode(input), encode(key))));
        } else{
            return printBinary(crypt(encode(input), encode(key)));
        }
    } else if(inputSelected === "binaryPlaintextInput"){
        let inputArray = [];
        let keyArray = [];
        for(let i = 0; i < input.length; i += 5){
            let firstDigit = input[i];
            let secondDigit = input[i + 1];
            let thirdDigit = input[i + 2];
            let fourthDigit = input[i + 3];
            let fifthDigit = input[i + 4];
            let number = 0;
            if(firstDigit === "1"){
                number = number + 16;
            }
            if(secondDigit === "1"){
                number = number + 8;
            }
            if(thirdDigit === "1"){
                number = number + 4;
            }
            if(fourthDigit === "1"){
                number = number + 2;
            }
            if(fifthDigit === "1"){
                number = number + 1;
            }
            inputArray.push(number);
        }

        for(let i = 0; i < key.length; i += 5){
            let firstDigit = key[i];
            let secondDigit = key[i + 1];
            let thirdDigit = key[i + 2];
            let fourthDigit = key[i + 3];
            let fifthDigit = key[i + 4];
            let number = 0;
            if(firstDigit === "1"){
                number = number + 16;
            }
            if(secondDigit === "1"){
                number = number + 8;
            }
            if(thirdDigit === "1"){
                number = number + 4;
            }
            if(fourthDigit === "1"){
                number = number + 2;
            }
            if(fifthDigit === "1"){
                number = number + 1;
            }
            keyArray.push(number);
        }

        if(outputSelected === "binaryPlaintextOutput"){
            return printBinary(inputArray);
        } else if(outputSelected === "englishPlaintextOutput"){
            return printMessage(decode(inputArray));
        } else if(outputSelected === "binaryCiphertextOutput"){
            return printBinary(crypt(inputArray, keyArray));
        } else{
            return printMessage(decode(crypt(inputArray, keyArray)));
        }

    } else if(inputSelected === "englishCiphertextInput"){
        if(outputSelected === "englishCiphertextOuput"){
            return input;
        } else if(outputSelected === "binaryCiphertextOutput"){
            return printBinary(encode(input));
        } else if(outputSelected === "englishPlaintextOuput"){
            return printMessage(decode(crypt(encode(input), encode(key))));
        } else{
            return printBinary(crypt(encode(input), encode(key)));
        }

    } else{
        let inputArray = [];
        let keyArray = [];
        for(let i = 0; i < input.length; i += 5){
            let firstDigit = input[i];
            let secondDigit = input[i + 1];
            let thirdDigit = input[i + 2];
            let fourthDigit = input[i + 3];
            let fifthDigit = input[i + 4];
            let number = 0;
            if(firstDigit === "1"){
                number = number + 16;
            }
            if(secondDigit === "1"){
                number = number + 8;
            }
            if(thirdDigit === "1"){
                number = number + 4;
            }
            if(fourthDigit === "1"){
                number = number + 2;
            }
            if(fifthDigit === "1"){
                number = number + 1;
            }
            inputArray.push(number);
        }

        for(let i = 0; i < key.length; i += 5){
            let firstDigit = key[i];
            let secondDigit = key[i + 1];
            let thirdDigit = key[i + 2];
            let fourthDigit = key[i + 3];
            let fifthDigit = key[i + 4];
            let number = 0;
            if(firstDigit === "1"){
                number = number + 16;
            }
            if(secondDigit === "1"){
                number = number + 8;
            }
            if(thirdDigit === "1"){
                number = number + 4;
            }
            if(fourthDigit === "1"){
                number = number + 2;
            }
            if(fifthDigit === "1"){
                number = number + 1;
            }
            keyArray.push(number);
        }

        if(outputSelected === "binaryCiphertextOutput"){
            return printBinary(inputArray);
        } else if(outputSelected === "englishCiphertextOutput"){
            return printMessage(decode(inputArray));
        } else if(outputSelected === "binaryPlaintextOutput"){
            return printBinary(crypt(inputArray, keyArray));
        } else{
            return printMessage(decode(crypt(inputArray, keyArray)));
        }
    }

}