# RINFO-2: Add imagePrompt Field to Blog Posts

> **Goal:** Add an optional `imagePrompt` text field to blog posts so each post can store a custom AI prompt for generating featured images.

**Architecture:** Add field at Model → API → Admin forms → Public display. Field is optional textarea (long prompts). Display on public blog optionally.

**Files to modify:**
- `src/models/Post.ts`
- `app/api/posts/route.ts`
- `app/api/posts/[id]/route.ts`
- `app/api/public/posts/route.ts`
- `app/admin/posts/add/page.tsx`
- `app/admin/posts/edit/[id]/page.tsx`
- `app/admin/posts/page.tsx`
- `app/admin/posts/list/page.tsx`
- `src/components/Blog.jsx`
- `app/blog/[id]/page.jsx`

---

### Task 1: Update Post Model

**Objective:** Add `imagePrompt` field to IPost interface and Mongoose schema.

**File:** `src/models/Post.ts`

```ts
// Add to IPost interface
export interface IPost extends Document {
    title: string
    content: string
    category: mongoose.Types.ObjectId
    published: boolean
    image?: string
    imagePrompt?: string   // NEW
}

// Add to PostSchema
const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    published: { type: Boolean, default: false },
    image: { type: String },
    imagePrompt: { type: String }   // NEW - optional textarea for AI image prompt
})
```

---

### Task 2: Update Admin API (POST)

**Objective:** Include `imagePrompt` in POST request body when creating posts.

**File:** `app/api/posts/route.ts`

```ts
// Line 19 - destructure imagePrompt
const { title, content, category, published, image, imagePrompt } = await request.json()

// Line 20 - include in Post creation
const post = new Post({ title, content, category, published, image, imagePrompt })
```

---

### Task 3: Update Admin API (PUT)

**Objective:** Include `imagePrompt` in PUT request body when updating posts.

**File:** `app/api/posts/[id]/route.ts`

```ts
// Line 24 - destructure imagePrompt
const { title, content, category, published, image, imagePrompt } = await request.json()

// Line 25 - include in findByIdAndUpdate
const post = await Post.findByIdAndUpdate(
    params.id, 
    { title, content, category, published, image, imagePrompt }, 
    { new: true }
).populate('category')
```

---

### Task 4: Update Public API

**Objective:** The public API already returns the full post object from MongoDB, so `imagePrompt` will automatically be included. No code change needed — just verify.

**File:** `app/api/public/posts/route.ts` — No change needed.

---

### Task 5: Update Admin Add Post Form

**Objective:** Add `imagePrompt` textarea field to the "Add New Post" form.

**File:** `app/admin/posts/add/page.tsx`

Changes:
1. Add `imagePrompt` state variable: `const [imagePrompt, setImagePrompt] = useState("")`
2. Include `imagePrompt` in POST body: `body: JSON.stringify({ title, content, category, published, image, imagePrompt })`
3. Add textarea field after the "Featured Image" section (before published checkbox):

```tsx
<div className="col-span-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Image Prompt
  </label>
  <textarea
    id="imagePrompt"
    value={imagePrompt}
    onChange={(e) => setImagePrompt(e.target.value)}
    rows={3}
    placeholder="Optional: Describe the AI-generated image for this post"
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 text-black bg-white"
  />
  <p className="mt-1 text-xs text-gray-500">
    Used for generating the featured image via AI. Leave empty to use the uploaded image.
  </p>
</div>
```

---

### Task 6: Update Admin Edit Post Form

**Objective:** Add `imagePrompt` field to the edit post form with load/save.

**File:** `app/admin/posts/edit/[id]/page.tsx`

Changes:
1. Add state: `const [imagePrompt, setImagePrompt] = useState("")`
2. Load on fetch: `setImagePrompt(post.imagePrompt || "")`
3. Include in PUT body: `body: JSON.stringify({ title, content, category, published, image, imagePrompt })`
4. Add textarea field (same as add form, after featured image)

Also update the Post interface:
```ts
interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  published: boolean;
  image?: string;
  imagePrompt?: string;  // NEW
}
```

---

### Task 7: Update Admin Inline Post Form

**Objective:** Add `imagePrompt` to the inline add-post form on the main admin posts page.

**File:** `app/admin/posts/page.tsx`

Changes:
1. Add state: `const [imagePrompt, setImagePrompt] = useState("")`
2. Include in POST body: `body: JSON.stringify({ title, content, category, published, image, imagePrompt })`
3. Reset on success: `setImagePrompt("")`
4. Add textarea after the Image DropzoneUpload, before the published checkbox

---

### Task 8: Update Admin Post List Display

**Objective:** Show imagePrompt in the admin posts list if present.

**File:** `app/admin/posts/list/page.tsx`

Add imagePrompt to Post interface:
```ts
interface Post {
    _id: string
    title: string
    content: string
    category: Category
    published: boolean
    image?: string
    imagePrompt?: string  // NEW
    createdAt?: string
}
```

Optionally display imagePrompt snippet in the list item (below the content snippet):
```tsx
{post.imagePrompt && (
  <p className="text-xs text-gray-400 mt-1 italic truncate">
    Prompt: {post.imagePrompt.substring(0, 80)}...
  </p>
)}
```

---

### Task 9: Update Public Blog List (Optional Display)

**Objective:** Show imagePrompt on blog cards if the user wants to display it.

**File:** `src/components/Blog.jsx`

In the card content section (after the description/read-more), optionally add:
```tsx
{post.imagePrompt && (
  <div className="mt-2 text-[10px] text-gray-600 italic line-clamp-1">
    🎨 {post.imagePrompt}
  </div>
)}
```

The task says "Public blog page should optionally display it" — I'll add it as a small italic hint below the excerpt.

---

### Task 10: Update Public Blog Detail (Optional Display)

**Objective:** Show imagePrompt on the blog detail page if present.

**File:** `app/blog/[id]/page.jsx`

After the featured image section, optionally add:
```tsx
{post.imagePrompt && (
  <div className="mb-6 text-sm text-gray-500 italic border-l-2 border-white/10 pl-4">
    🎨 Image prompt: {post.imagePrompt}
  </div>
)}
```

---

### Task 11: Deploy & Verify

1. Deploy to Vercel preview: `vercel deploy -l --yes`
2. Check build logs for errors
3. Fix any issues, redeploy
4. Promote to production: `vercel --prod --yes`
5. Verify on live site
6. Commit and push to GitHub
