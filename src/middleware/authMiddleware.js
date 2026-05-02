module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  },

  isGuest: (req, res, next) => {
    // jika sudah login, tidak bisa akses halaman login/register 
    if (!req.isAuthenticated()) return next();
    res.redirect('/');
  }
};