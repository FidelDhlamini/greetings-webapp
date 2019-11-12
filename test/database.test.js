const assert = require('assert');
const Greetings = require('../greet');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/testdb';
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}


const pool = new Pool({
    connectionString
});

describe('Greetings-web-app', function () {
    const greetings = Greetings(pool)

    // beforeEach(async function () {
    //     // clean the tables before each test run
    //     await pool.query("delete from products;");
    //     await pool.query("delete from categories;");
    // });

    it('should greet the name entered in Xhosa', async function () {

        await greetings.greet("Fidel", "Xhosa")
        assert.equal("Molo, Fidel", await greetings.greetMsg());

    });

    it('should greet the name entered in English', async function () {

        await greetings.greet("Sino", "English")
        assert.equal("Hello, Sino", await greetings.greetMsg());

    });

    it('should greet the name entered in Afrikaans', async function () {

        await greetings.greet("Iviwe", "Afrikaans")
        assert.equal("Hallo, Iviwe", await greetings.greetMsg());

    });

    it('should how many names were greeted ', async function () {
        await greetings.greet("Iviwe", "Afrikaans")
        await greetings.greet("Fidel", "Afrikaans")
        await greetings.greet("Sbu", "Afrikaans")
        await greetings.greet("Sino", "Afrikaans")

        assert.equal(4, await greetings.numberOfGreetedNames());

    });

    it('should count a name once if it is greeted repeatedly ', async function () {
        await pool.query('delete from greetings;')
        await greetings.greet("Iviwe")
        await greetings.greet("Iviwe")
        await greetings.greet("Iviwe")
        await greetings.greet("Iviwe")

        assert.equal(1, await greetings.numberOfGreetedNames());

    });
    it('should return how many times a specific name was greeted', async function () {
        await pool.query('delete from greetings;')
        await greetings.greet("Sino")
        await greetings.greet("Sino")
        await greetings.greet("Sino")
        await greetings.greet("Iviwe")


        assert.equal(3, await greetings.perName("Sino"));
        assert.equal(1, await greetings.perName("Iviwe"));

    });
it('should return how many times a specific name was greeted', async function () {
    await pool.query('delete from greetings;')
    await greetings.greet("Sino")
    await greetings.greet("Sino")
    await greetings.greet("Sino")
    await greetings.greet("Iviwe")


    assert.equal(3, await greetings.perName("Sino"));
    assert.equal(1, await greetings.perName("Iviwe"));

});

    after(function () {
        pool.end();
    })
});