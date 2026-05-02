const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = {
  getLogin: (req, res) => {
    res.render("auth/login", { error: req.flash?.("error") });
  },

  postLogin: passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),

  getRegister: (req, res) => {
    res.render("auth/register", { error: null });
  },

  postRegister: async (req, res) => {
    try {
      const { email, password } = req.body;

      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.render("auth/register", { error: "Email sudah digunakan" });
      }

      // Hash password
      const hashed = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: { email, password: hashed },
      });

      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.render("auth/register", { error: "Terjadi kesalahan" });
    }
  },

  logout: (req, res) => {
    req.logout(() => {
      res.redirect("/login");
    });
  },
};
