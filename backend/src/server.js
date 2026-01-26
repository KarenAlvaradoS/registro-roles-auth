require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});
require("dotenv").config();
const app = require("./app");
const { sequelize, Role } = require("./models");

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Crear roles base si no existen
    const roles = ["admin", "user"];
    for (const r of roles) {
      await Role.findOrCreate({ where: { name: r } });
    }

    app.listen(process.env.PORT || 4000, "0.0.0.0", () => {
  console.log("API corriendo");
});

  } catch (error) {
    console.error("❌ Error iniciando el servidor:", error);
    process.exit(1);
  }
}

start();
