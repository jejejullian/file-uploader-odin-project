const { cloudinary } = require("../config/cloudinary");
const prisma = require("../config/prisma");

module.exports = {
  show: async (req, res) => {
    const { id } = req.params;
    try {
      const file = await prisma.file.findUnique({
        where: { id: parseInt(id) },
      });

      if (!file || file.userId !== req.user.id) {
        return res.status(404).send("File tidak ditemukan atau akses ditolak.");
      }

      res.render("files/show_file", { file });
    } catch (err) {
      console.error(err);
      res.status(500).send("Terjadi kesalahan pada server.");
    }
  },

  upload: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("Tidak ada file yang diunggah.");
      }

      const { folderId } = req.body;

      const fileUrl = req.file.secure_url || req.file.path;

      await prisma.file.create({
        data: {
          name: req.file.originalname,
          url: fileUrl,
          size: req.file.size,
          folderId: parseInt(folderId),
          userId: req.user.id,
        },
      });

      res.redirect(`/folders/${folderId}`);
    } catch (err) {
      console.error("Kesalahan saat simpan database:", err);
      res.status(500).send("Terjadi kesalahan pada server.");
    }
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const file = await prisma.file.findUnique({
        where: { id: parseInt(id) },
      });

      if (!file) return res.status(404).send("File tidak ditemukan.");

      if (file.userId !== req.user.id) {
        return res.status(403).send("Anda tidak memiliki akses untuk menghapus file ini.");
      }

      const parts = file.url.split("/");
      const fileNameWithExtension = parts.pop();
      const folderName = parts.pop();
      const publicId = `${folderName}/${fileNameWithExtension.split(".")[0]}`;

      await cloudinary.uploader.destroy(publicId);

      await prisma.file.delete({
        where: { id: parseInt(id) },
      });

      res.redirect(`/folders/${file.folderId}`);
    } catch (err) {
      console.error("Gagal menghapus file:", err);
      res.status(500).send("Gagal menghapus file.");
    }
  },
};
