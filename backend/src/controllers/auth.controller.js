const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Role } = require("../models");

const register = async (req, res) => {
  try {
    const { name, email, password, roleName } = req.body;

    if (!name || !email || !password || !roleName) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const role = await Role.findOne({ where: { name: roleName } });
    if (!role) return res.status(400).json({ message: "Rol no válido" });

    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      RoleId: role.id,
    });

    return res.status(201).json({ message: "Usuario creado", userId: user.id });
  } catch (err) {
    return res.status(500).json({ message: "Error en registro", error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan credenciales" });
    }

    const user = await User.findOne({ where: { email }, include: Role });
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Credenciales inválidas" });

    const token = jwt.sign(
      { id: user.id, role: user.Role?.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.Role?.name },
    });
  } catch (err) {
    return res.status(500).json({ message: "Error en login", error: err.message });
  }
};

module.exports = { register, login };
