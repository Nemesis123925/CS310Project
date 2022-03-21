// credit to https://blog.ragingflame.co.za/2014/7/21/using-nodejs-with-mysql

// turn to the knex part, which establishes all the table according to schema.js
// knex is a convenient database management lib, Please visit https://knexjs.org/ for details
let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: '310Project',
        charset: 'utf8',
        port:'3306'
    }
}); // set up the connection connecting to the database we just created,
var Schema = require('./schema');
var sequence = require('when/sequence');
var _ = require('lodash');
function createTable(tableName) {
    return knex.schema.createTable(tableName, function (table) {
        var column;
        var columnKeys = _.keys(Schema[tableName]);
        _.each(columnKeys, function (key) {
            if (Schema[tableName][key].type === 'text' && Schema[tableName][key].hasOwnProperty('fieldtype')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].fieldtype);
            }
            else if (Schema[tableName][key].type === 'string' && Schema[tableName][key].hasOwnProperty('maxlength')) {
                column = table[Schema[tableName][key].type](key, Schema[tableName][key].maxlength);
            }
            else {
                column = table[Schema[tableName][key].type](key);
            }
            if (Schema[tableName][key].hasOwnProperty('nullable') && Schema[tableName][key].nullable === true) {
                column.nullable();
            }
            else {
                column.notNullable();
            }
            if (Schema[tableName][key].hasOwnProperty('primary') && Schema[tableName][key].primary === true) {
                column.primary();
            }
            if (Schema[tableName][key].hasOwnProperty('unique') && Schema[tableName][key].unique) {
                column.unique();
            }
            if (Schema[tableName][key].hasOwnProperty('unsigned') && Schema[tableName][key].unsigned) {
                column.unsigned();
            }
            if (Schema[tableName][key].hasOwnProperty('references')) {
                column.references(Schema[tableName][key].references);
            }
            if (Schema[tableName][key].hasOwnProperty('defaultTo')) {
                column.defaultTo(Schema[tableName][key].defaultTo);
            }
        });
    });
}
async function createTables() {

    let tables;
    const tableNames = _.keys(Schema);

    const promises = []
    const uncreatedTables = []

    tableNames.forEach((potentialName) => {
        let newPromise = knex.schema.hasTable(potentialName).then((exists) => {
            if (!exists) {
                uncreatedTables.push(potentialName)
            }
        })
        promises.push(newPromise)
    })

    await Promise.all(promises)

    tables = _.map(uncreatedTables, function (tableName) {
        return function () {
            return createTable(tableName);
        };
    });
    return sequence(tables);
}
createTables()
    .then(function () {
        console.log('Tables created!!');
        process.exit(0);
    })
    .catch(function (error) {
        throw error;
    });