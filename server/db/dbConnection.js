const log = require("./logging");
const dbConfigs = require("./knexfile");
const db = require("knex")(dbConfigs.development);

db.raw("SELECT 1")
.then((result) => {
        log.info("Successfully connected to the database.")
    })
    .catch((err) => {
        log.error("Failed to connect to the database.")
    })

module.exports = {
  db: db
};
