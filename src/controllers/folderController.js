const prisma = require("../config/prisma");

module.exports = {
  index: async (req, res) => {
    try {
      const folders = await prisma.folder.findMany({ where: { userId: req.user.id }, orderBy: { createdAt: "desc" } });

      res.render("dashboard", {
        user: req.user,
        folders: folders,
      });
    } catch (err) {
      res.render("dashboard", {
        error: "Gagal memuat daftar folder",
        user: req.user,
        folders: [],
      });
    }
  },

  getCreate: (req, res) => res.render("folders/index"),

  postCreate: async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;
    try {
      await prisma.folder.create({
        data: { name, userId },
      });

      res.redirect("/");
    } catch (err) {
      res.render("dashboard", {
        error: "Terjadi Kesalahan",
        user: req.user,
        folders: [],
      });
    }
  },

  show: async (req, res) => {
    const { id } = req.params;

    try {
      const folder = await prisma.folder.findUnique({
        where: {
          id: parseInt(id),
        },
        include: {
          files: true,
          shareLinks: true,
        },
      });

      if (!folder || folder.userId !== req.user.id) {
        return res.status(404).send("Folder tidak ditemukan atau Anda tidak memiliki akses.");
      }

      res.render("folders/show", {
        user: req.user,
        folder: folder,
      });
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  },

  getEdit: async (req, res) => {
    const { id } = req.params;
    try {
      const folder = await prisma.folder.findUnique({ where: { id: parseInt(id) } });

      if (!folder || folder.userId !== req.user.id) {
        return res.status(404).send("folder tidak ditemukan");
      }

      res.render("folders/edit", { folder });
    } catch (err) {
      res.redirect("/");
    }
  },

  postEdit: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      await prisma.folder.updateMany({
        where: { id: parseInt(id), userId: req.user.id },
        data: { name: name },
      });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.folder.deleteMany({
        where: {
          id: parseInt(id),
          userId: req.user.id,
        },
      });
      res.redirect("/");
    } catch (err) {
      console.error(err);
      res.redirect("/");
    }
  },

  generateShareLink: async (req, res) => {
    const { folderId } = req.params;
    const { duration } = req.body;

    try {
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + parseInt(duration));

      await prisma.shareLink.create({
        data: {
          folderId: parseInt(folderId),
          expiresAt: expiresAt,
        },
      });

      res.redirect(`/folders/${folderId}`);
    } catch (err) {
      console.error("Gagal membuat share link:", err);
      res.status(500).send("Gagal membuat link berbagi.");
    }
  },

  showPublicFolder: async (req, res) => {
    const { uuid } = req.params;
    try {
      const shareLink = await prisma.shareLink.findUnique({
        where: { id: uuid },
        include: {
          folder: {
            include: { files: true }
          }
        }
      });

      if (!shareLink) return res.status(404).send("Link tidak valid.");

      if (new Date() > shareLink.expiresAt) {
        return res.status(410).send("Link ini sudah kadaluwarsa.");
      }

      res.render("folders/share_view", {
        folder: shareLink.folder
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan.");
    }
  }
};
