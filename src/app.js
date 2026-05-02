const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const prisma = require("./config/prisma");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));
console.log("Cek lokasi views:", path.resolve(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
    }),
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  }),
);

// passport
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", require("./routes/shareRoutes"));

app.use("/", require("./routes/authRoutes"));
app.use("/", require("./routes/folderRoutes"));
app.use("/files", require("./routes/fileRoutes"));

// home
// app.get("/", (req, res) => {
//   if (!req.isAuthenticated()) return res.redirect("/login");

//   res.render("dashboard", {
//     user: req.user,
//     folders: []
//   });
// });

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
