# Blog Admin Panel

A Next.js admin panel for managing blog posts and categories.

## Features

- Manage blog posts with rich text editor
- Manage categories
- Image upload for posts and categories using Cloudinary
- MongoDB database

## Setup

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Set up environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Fill in your MongoDB URI
   - Add your Cloudinary credentials

3. Start the development server:
   ```bash
   yarn dev
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Your Cloudinary API key
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

## Usage

- Navigate to `/` for the home page
- Go to `/posts` to manage blog posts
- Go to `/categories` to manage categories

For posts:
- Use the rich text editor for content
- Upload images for posts
- Select a category
- Mark as published

For categories:
- Add name and description
- Upload an image for the category