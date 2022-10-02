const Sequelize = require("sequelize-cockroachdb");

// Connect to CockroachDB through Sequelize.
const connectionString =
  "postgresql://bishwo:WEvPiTvnutVoNudBPg9l4Q@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&options=--cluster%3Dfeared-hisser-6484";
const sequelize = new Sequelize(connectionString, {
  dialectOptions: {
    application_name: "docs_simplecrud_node-sequelize",
  },
});

// Define the Account model for the "accounts" table.
const agents = sequelize.define("agents", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: Sequelize.TEXT,
  },
});

// Create the "accounts" table.
agents.sync({
  force: true,
});

// Define the Account model for the "accounts" table.
const Message = sequelize.define("message", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
  email: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
  type: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
  age: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
  other_info: {
    type: Sequelize.TEXT,
    defaultValue: "bruno",
  },
});

Message.sync({
  force: true,
});

module.exports = {
  Emails: agents,
  Message,
};
