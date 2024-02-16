import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongooseUrl: process.env.MONGOOSE_URL,
    mongooseUrlArchived: process.env.MONGOOSE_URL_ARCHIVED,
    urlArchive: process.env.URL_ARCHIVE,
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY,
    admin_token: process.env.ADMIN
};
