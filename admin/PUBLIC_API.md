# Public API Endpoints

These endpoints are publicly accessible and don't require authentication. They are designed for your frontend blog to fetch published content.

## Base URL
```
http://your-domain.com/api/public
```

## Posts Endpoints

### Get All Published Posts
```
GET /api/public/posts
```

**Query Parameters:**
- `category` (optional): Filter posts by category ID
- `limit` (optional): Limit the number of posts returned
- `page` (optional): Page number for pagination (used with limit)

**Example:**
```bash
# Get all published posts
GET /api/public/posts

# Get posts from specific category with pagination
GET /api/public/posts?category=64f1a2b3c4d5e6f7g8h9i0j1&page=1&limit=10
```

**Response:**
```json
{
  "posts": [
    {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "title": "My Blog Post",
      "content": "<p>Post content...</p>",
      "category": {
        "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
        "name": "Technology"
      },
      "published": true,
      "image": "https://cloudinary.com/image.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 25,
  "page": 1,
  "limit": 10
}
```

### Get Single Published Post
```
GET /api/public/posts/[id]
```

**Example:**
```bash
GET /api/public/posts/64f1a2b3c4d5e6f7g8h9i0j1
```

**Response:**
```json
{
  "_id": "64f1a2b3c4d5e6f7g8h9i0j1",
  "title": "My Blog Post",
  "content": "<p>Post content...</p>",
  "category": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "name": "Technology"
  },
  "published": true,
  "image": "https://cloudinary.com/image.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Service Types Endpoints

### Get Active Service Types
```
GET /api/public/service-types
```

**Example:**
```bash
GET /api/public/service-types
```

**Response:**
```json
[
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
    "name": "Web Development",
    "description": "Website development services",
    "active": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j3",
    "name": "Mobile Development",
    "description": "Mobile app development services",
    "active": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## Contact Form Endpoints

### Submit Contact Message
```
POST /api/public/contact
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "serviceType": "64f1a2b3c4d5e6f7g8h9i0j2",
  "message": "I need help with web development"
}
```

**Required Fields:** `name`, `email`, `serviceType`, `message`

**Example:**
```bash
curl -X POST /api/public/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "serviceType": "64f1a2b3c4d5e6f7g8h9i0j2",
    "message": "I need help with web development"
  }'
```

**Response:**
```json
{
  "message": "Contact message sent successfully",
  "data": {
    "_id": "64f1a2b3c4d5e6f7g8h9i0j4",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "serviceType": {
      "_id": "64f1a2b3c4d5e6f7g8h9i0j2",
      "name": "Web Development"
    },
    "message": "I need help with web development",
    "read": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Features

- **Published Only**: Only published posts are returned
- **Category Filtering**: Filter posts by category
- **Pagination**: Support for paginated results
- **Populated Categories**: Category information is included with posts
- **Sorted Results**: Posts are sorted by creation date (newest first)

## Usage Examples

### Fetch Latest 5 Posts
```javascript
const response = await fetch('/api/public/posts?limit=5');
const data = await response.json();
console.log(data.posts); // Array of latest 5 published posts
```

### Fetch Posts by Category
```javascript
const response = await fetch('/api/public/posts?category=64f1a2b3c4d5e6f7g8h9i0j2');
const data = await response.json();
console.log(data.posts); // Posts from specific category
```

### Fetch Single Post
```javascript
const response = await fetch('/api/public/posts/64f1a2b3c4d5e6f7g8h9i0j1');
const post = await response.json();
console.log(post); // Single post object
```

### Fetch All Categories
```javascript
const response = await fetch('/api/public/categories');
const categories = await response.json();
console.log(categories); // Array of all categories
```