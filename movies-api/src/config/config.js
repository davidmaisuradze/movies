import dotenv from 'dotenv';

dotenv.config();

// AWS config
export const config = {
    aws_table_users: 'Users',
    aws_table_images: 'Images',
    aws_bucket_images: 'tcdn-image-storage',
    aws_remote_config: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
    }
};
