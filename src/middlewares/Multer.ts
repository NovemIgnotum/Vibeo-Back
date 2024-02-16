import { randomBytes } from 'crypto';
import { Options, diskStorage } from 'multer';

export const multerConfig = {
    storage: diskStorage({
        filename: (req, file, callback) => {
            randomBytes(16, (error, hash) => {
                if (error) {
                    callback(error, file.filename);
                }
                const filename = `${hash.toString('hex')}${file.mimetype.replace('image/', '.')}`;
                callback(null, filename);
            });
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    },
    fileFilter: (req, file, callback) => {
        const formats = ['image/jpeg', 'image/jpg', 'image/png'];
        if (formats.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Format not accepted'));
        }
    }
} as Options;
