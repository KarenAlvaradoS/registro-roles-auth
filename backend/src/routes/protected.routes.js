const router = require("express").Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "✅ Acceso permitido a ruta protegida",
    user: req.user,
  });
});

module.exports = router;
