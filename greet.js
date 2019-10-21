module.exports = function Greetings() {
    let storedNames = {};
    var greetMessage = '';

    function greetMe(name, language) {

        // if (!name) {
        //     return "What's your name? Enter your name";
        // }
        // if (!language) {
        //     return "Select a language";
        // }
        name = name.replace(/\s/g, '')
        name = name.replace(/[0-9]/g, '');
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);

        if (storedNames[name] === undefined) {
            storedNames[name] = 0;
        }

        if (language === "English") {

            greetMessage = "Hello, " + name;
        }
        if (language === "Xhosa") {

            greetMessage = "Molo, " + name;
        } else if (language === "Afrikaans") {

            greetMessage = "Hallo, " + name;
        }

    }

    function returnGreetMsg() {
        return greetMessage;
    }

    function convertToLowerCase() {
        return name.convertToLowerCase();
    }

    function totalNumberOfNamesGreeted() {

        return Object.keys(storedNames).length
    }

    function getNames() {
        console.log(storedNames)
        return storedNames;
    }

    return {
        greetMsg: returnGreetMsg,
        greet: greetMe,
        nameList: getNames,
        numberOfGreetedNames: totalNumberOfNamesGreeted,
        lowerCase: convertToLowerCase

    }

}