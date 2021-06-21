import dotenv from 'dotenv';

dotenv.config();

// AWS config
export const config = {
    aws_bucket_images: 'movies-image-storage',
    aws_remote_config: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    }
};
