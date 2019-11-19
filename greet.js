module.exports = function Greetings(pool) {
    let storedNames = {};
    var greetMessage = '';
    var check;
    var errorMsg;

    async function greetMe(name, language) {

        name = name.replace(/\s/g, '')
        name = name.replace(/[0-9]/g, '');
        name = name.toLowerCase();
        name = name.charAt(0).toUpperCase() + name.slice(1);

        check = await pool.query('SELECT DISTINCT greet_name, greet_count from greetings')

        if (storedNames[name] === undefined) {
            storedNames[name] = 0;
        }

        var storeNames = await pool.query('SELECT * from greetings WHERE greet_name = $1', [name])

        if (storeNames.rowCount === 1) {
            await pool.query('UPDATE greetings SET greet_count = greet_count + 1 WHERE greet_name = $1', [name])
            errorMsg = "Name already exists"

        } else {
            await pool.query('insert into greetings (greet_name, greet_count) values ($1, $2)', [name, 1])
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
    async function checkExistence(name) {
        checkName = await pool.query('select ')
    }
    async function finalTable() {
        check = await pool.query('SELECT DISTINCT greet_name, greet_count from greetings')
        return await check.rows

    }
    async function perName(id) {
        var getCount = await pool.query('SELECT * from greetings where greet_name = $1', [id])
        var userName = getCount.rows

        var nameD = userName[0].greet_name
        var countD = userName[0].greet_count
        console.log('user:', userName);
        return nameD, countD

    }

    function errorMSG() {
        return errorMsg;
    }


    async function returnGreetMsg() {
        return greetMessage;
    }

    function convertToLowerCase() {
        return name.convertToLowerCase();
    }

    async function totalNumberOfNamesGreeted() {
        var countNames = await pool.query('select count(*) from greetings')
        for (var i = 0; i < countNames.rows.length; i++) {

            var counter = countNames.rows[i]

        }
        console.log(counter.count);


        return counter.count

        //return Object.keys(storedNames).length
    }
    async function resetData() {
        greetMessage = '';
        await pool.query('DELETE from greetings')

    }

    async function getNames() {
        console.log(storedNames)
        return storedNames;
    }

    return {
        greetMsg: returnGreetMsg,
        greet: greetMe,
        nameList: getNames,
        numberOfGreetedNames: totalNumberOfNamesGreeted,
        lowerCase: convertToLowerCase,
        resetData,
        finalTable,
        perName,
        errorMSG

    }

}