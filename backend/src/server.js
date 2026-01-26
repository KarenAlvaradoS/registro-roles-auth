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

    app.listen(PORT, () => {
      console.log(`✅ API corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error iniciando el servidor:", error);
    process.exit(1);
  }
}

start();
