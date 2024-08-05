// src/middlewares/Multer.ts
import { Options, diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

// Chemin de destination pour les fichiers téléchargés
const uploadDir = path.join(__dirname, '../uploads');

// Crée le répertoire s'il n'existe pas
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const multerConfig: Options = {
    storage: diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadDir);
        },
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname);
            const filename = `${uuidv4()}${ext}`;
            cb(null, filename);
        }
    }),
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'audio/mpeg', 'audio/mp3', 'video/mp4'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            console.log(file);
            cb(new Error('Invalid file type. Only JPEG, PNG, MPEG, MP3 files are allowed.'));
        }
    }
};
