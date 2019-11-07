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
    const greetings = Greetings()

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from products;");
        await pool.query("delete from categories;");
    });

    it('should pass the db test', async function () {
        

        // the Factory Function is called CategoryService
        let categoryService = CategoryService(pool);
        await categoryService.add({
            description: "Diary"
        });

        let categories = await categoryService.all();
        assert.equal(1, categories.length);

    });

    after(function () {
        pool.end();
    })
});