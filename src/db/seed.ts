import { comments, posts, postTag, tag } from "@/db/schema";
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

async function main() {
  console.log("🌱 Starting seed...");

  const client = neon(process.env.DATABASE_URL!);
  const db = drizzle(client);

  await db.delete(postTag);
  await db.delete(comments);
  await db.delete(tag);
  await db.delete(posts);

  const insertedTags = await db
    .insert(tag)
    .values([
      { name: "Next.js" },
      { name: "JavaScript" },
      { name: "WebDev" },
      { name: "Design" },
      { name: "Database" },
      { name: "TypeScript" },
      { name: "React" },
      { name: "CSS" },
      { name: "Performance" },
      { name: "Security" },
      { name: "AI" },
      { name: "Testing" },
    ])
    .returning();

  const insertedPosts = await db
    .insert(posts)
    .values([
      {
        slug: "my-first-post",
        title: "My First Post",
        description:
          "Welcome to my blog where I'll share my web development journey, from beginner lessons to advanced techniques. Join me as I explore modern web technologies.",
        imageUrl: "/images/sample-1.jpg",
        content: `
# My Web Development Journey Begins

Welcome to my very first post! This marks the beginning of my journey documenting everything I learn, build, and explore in the world of web development.

## Why I'm Starting This Blog

Over the past three years of coding, I've realized that writing things down not only helps others but reinforces what I've learned myself. There's something magical about explaining concepts that solidifies them in your mind.

Some key reasons I'm starting:

- **Accountability**: Committing to regular posts will push me to learn consistently
- **Community**: Hoping to connect with other developers at all skill levels
- **Progress Tracking**: Documenting my growth over time

## My Current Tech Stack (2025 Edition)

After much experimentation, here's what I'm currently using:

\`\`\`javascript
// Frontend
const frontend = {
  framework: "Next.js 14",
  styling: "Tailwind CSS + CSS Modules",
  state: "Zustand + React Query",
  form: "React Hook Form + Zod",
};

// Backend
const backend = {
  runtime: "Node.js 22",
  database: "PostgreSQL + Prisma",
  auth: "Clerk",
  hosting: "Vercel + Supabase",
};
\`\`\`

## What To Expect From This Blog

### Beginner Guides
I remember how overwhelming starting was, so I'll create detailed walkthroughs including:
- Setting up development environments
- Git fundamentals
- Debugging techniques

### Project Breakdowns
Every month I'll:
1. Build a complete project
2. Document the process
3. Share lessons learned
4. Provide the full codebase

### Advanced Concepts
As I grow, I'll explore:
- Performance optimization
- Security best practices
- Complex state management
- WebAssembly integration

## My Learning Philosophy

1. **Fundamentals First**: Before any framework, master HTML, CSS, and vanilla JavaScript
2. **Build Constantly**: Theory alone isn't enough - regular projects are essential
3. **Embrace Struggle**: The hardest concepts become the most rewarding

## Current Learning Goals

| Topic          | Target Date | Progress |
|----------------|-------------|----------|
| Web Components | June 2025   | 30%      |
| Rust Basics    | August 2025 | 5%       |
| GraphQL        | October 2025| 60%      |

## Final Thoughts

This blog will be raw, honest, and full of real-world learnings. Whether it's code snippets, project breakdowns, or just lessons learned the hard way — I'll be sharing it all. 

Thank you for joining me at the start. Let's grow together!

> "The expert in anything was once a beginner." - Helen Hayes
`.trim(),
        isFeatured: true,
      },
      {
        slug: "second-post-about-web-dev",
        title: "Second Post About Web Dev",
        description:
          "Exploring the reality of web development in 2025 - JavaScript frameworks, build tools, and why fundamentals still matter most in our fast-evolving industry.",
        imageUrl: "/images/sample-2.jpg",
        content: `
# The State of Web Development in 2025: A Reality Check

Let's talk about the reality of being a web developer in 2025. The landscape has changed dramatically, yet some truths remain eternal.

## The Framework Explosion

Here's the current JavaScript framework ecosystem:

\`\`\`mermaid
graph TD
    A[JavaScript] --> B[React]
    A --> C[Vue]
    A --> D[Angular]
    A --> E[Svelte]
    A --> F[Solid]
    B --> G[Next.js]
    B --> H[Remix]
    C --> I[Nuxt]
    D --> J[Analog]
    E --> K[SvelteKit]
\`\`\`

**My take**: This abundance creates both opportunity and analysis paralysis. 

## What I Wish I Knew Earlier

1. **Vanilla JavaScript is forever**
   - Frameworks come and go
   - DOM manipulation skills never expire
   - Example: Mastering events pays dividends forever

\`\`\`javascript
// Still valuable in 2025
document.querySelector('.btn').addEventListener('click', (e) => {
  console.log('Fundamentals matter!');
});
\`\`\`

2. **Browser APIs > Framework Features**
   - Intersection Observer
   - Web Workers
   - Web Components
   - These outlast any framework trend

## React vs Next.js in 2025

| Feature         | React 19 | Next.js 14 |
|-----------------|---------|------------|
| SSR            | ❌      | ✅         |
| File Routing   | ❌      | ✅         |
| API Routes     | ❌      | ✅         |
| Image Opt      | ❌      | ✅         |
| Flexibility    | ✅      | ❌         |

**When to choose React alone**:
- Highly interactive dashboards
- When you need full control
- Microfrontend architectures

**When Next.js shines**:
- Marketing sites
- SEO-critical apps
- When you want batteries included

## Avoiding Tutorial Hell

The trap: Watching endless tutorials without building. Here's my escape plan:

1. **20/80 Rule**: Watch 20%, code 80%
2. **Project-Based Learning**: 
   - Build a clone
   - Then modify it
   - Then build from scratch
3. **Teach Others**: Writing this post helps me too!

## The Web Development Hierarchy of Needs

1. **Functionality** (It works)
2. **Accessibility** (Everyone can use it)
3. **Performance** (It works well)
4. **Maintainability** (Others can work on it)
5. **Developer Experience** (It's enjoyable to build)

Most debates focus on level 5 while many sites struggle with level 1.

## Final Thoughts

There's no one-size-fits-all solution in web development. The key is understanding fundamentals so you can adapt as the ecosystem evolves. 

> "The web is the ultimate Darwinian environment." - Tim Berners-Lee
`.trim(),
        isFeatured: false,
      },
      {
        slug: "design-matters-in-modern-web",
        title: "Design Matters in Modern Web",
        description:
          "Why design is more than aesthetics - it's about communication and usability. Tips for developers to improve their design skills and create better user experiences.",
        imageUrl: "/images/sample-3.jpg",
        content: `
# Why Design Matters More Than Ever in 2025

Design is not just about looking pretty. It's about communication, clarity, and usability. In an age of AI-generated interfaces, human-centered design stands out.

## The Business Impact of Good Design

Statistics don't lie:

- 94% of first impressions are design-related
- Good UI can increase conversion by 200%
- 88% of users won't return after a bad experience

## Core Principles Every Developer Should Know

### 1. Visual Hierarchy

\`\`\`mermaid
graph TD
    A[Most Important] --> B[Primary CTA]
    C[Secondary] --> D[Supporting Content]
    E[Tertiary] --> F[Footer Links]
\`\`\`

**Implementation**:
- Size contrast
- Color weight
- Positioning

### 2. The Spacing System

Use a consistent spacing scale (Tailwind example):

\`\`\`css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
}
\`\`\`

### 3. Color Theory Basics

| Purpose       | Hue       | Example Use          |
|---------------|-----------|----------------------|
| Primary       | Blue      | Main brand color     |
| Secondary     | Purple    | Secondary buttons    |
| Success       | Green     | Positive actions     |
| Danger        | Red       | Destructive actions  |
| Warning       | Yellow    | Caution indicators   |

## Practical UI Patterns

### Card Component Anatomy

\`\`\`html
<div class="card">
  <!-- Header -->
  <div class="card-header">
    <img src="..." alt="...">
    <h3>Card Title</h3>
  </div>
  
  <!-- Body -->
  <div class="card-body">
    <p>Content goes here...</p>
  </div>
  
  <!-- Footer -->
  <div class="card-footer">
    <button>Action</button>
  </div>
</div>
\`\`\`

### Form Design Best Practices

1. **Label Placement**: Top-aligned labels work best
2. **Input States**: Style :focus, :invalid, :disabled
3. **Validation**: Show errors contextually
4. **Progressive Disclosure**: Complex fields only when needed

## Tools I Recommend

1. **Figma**: For prototyping
2. **Tailwind CSS**: For implementation
3. **Storybook**: For component documentation
4. **WebAIM Contrast Checker**: For accessibility

## Developer to Designer Transition Tips

1. Study existing design systems (Material, Apple HIG)
2. Copy good designs (legally) to understand why they work
3. Learn typography basics (font pairing, line height)
4. Practice daily UI challenges

> "Design is not just what it looks like. Design is how it works." - Steve Jobs
`.trim(),
        isFeatured: true,
      },
      {
        slug: "getting-started-with-typescript",
        title: "Getting Started with TypeScript",
        description:
          "A beginner's guide to TypeScript - why it's worth learning, common pitfalls to avoid, and how it can improve your code quality and developer experience.",
        imageUrl: "/images/sample-4.jpg",
        content: [
          `# TypeScript in 2025: The Complete Beginner's Guide

TypeScript can feel overwhelming when you first start—but trust me, it's worth the effort. Here's everything I wish I knew when beginning.

## Why TypeScript Wins in 2025

1. **Enterprise Adoption**: 78% of large codebases use TS
2. **Framework Support**: Next.js, Nuxt, SvelteKit all have first-class TS support
3. **AI Assistance**: Modern AI tools leverage types for better suggestions
4. **Runtime Safety**: Catch bugs before they reach production

## Core Concepts Explained

### 1. Type Annotations

Basic syntax:

~~~typescript
let username: string = "Alice";
let age: number = 30;
let isAdmin: boolean = false;
~~~

### 2. Interfaces vs Types

~~~typescript
// Interface
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}

// Type alias
type UserRole = 'admin' | 'user' | 'guest';
~~~

**When to use each**:
- Interfaces: For object shapes
- Types: For unions, tuples, complex types

### 3. Generics

Real-world example:

~~~typescript
function apiRequest<T>(url: string): Promise<T> {
  return fetch(url).then(res => res.json());
}

// Usage
interface Post {
  id: number;
  title: string;
}

const posts = await apiRequest<Post[]>('/api/posts');
~~~

## Common Beginner Mistakes

### 1. Overusing 'any'

**Bad**:
~~~typescript
let data: any = fetchData();
~~~

**Better**:
~~~typescript
let data: unknown = fetchData();
if (typeof data === 'string') {
  // Now safely use as string
}
~~~

### 2. Ignoring Utility Types

Missed opportunities:

~~~typescript
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// Partial for updates
type UserUpdate = Partial<User>;

// Pick for specific fields
type UserPreview = Pick<User, 'id' | 'name'>;
~~~

## Advanced Patterns

### 1. Type Predicates

~~~typescript
function isAdmin(user: User): user is AdminUser {
  return user.role === 'admin';
}

if (isAdmin(currentUser)) {
  // Type narrowed to AdminUser
}
~~~

### 2. Template Literal Types

~~~typescript
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

type ApiEndpoint = \`/api/\${string}\`;

function fetchApi(method: HttpMethod, endpoint: ApiEndpoint) {
  // ...
}
~~~

## Migration Strategy

1. Start with \`allowJs\`
2. Add \`checkJs\`
3. Rename files to \`.ts\` incrementally
4. Enable stricter rules over time

## Essential TSConfig Settings

~~~json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "target": "ES2022",
    "moduleResolution": "NodeNext"
  }
}
~~~

> "TypeScript is JavaScript with documentation that the compiler can check." - Anders Hejlsberg
`.trim(),
        ].join("\n"),
        isFeatured: false,
      },
      {
        slug: "using-postgresql-without-pain",
        title: "Using PostgreSQL Without Pain",
        description:
          "PostgreSQL made approachable - from basic setup to performance optimization. Learn how to work with relational data effectively in your applications.",
        imageUrl: "/images/sample-5.jpg",
        content: `
# PostgreSQL in 2025: The Developer-Friendly Guide

PostgreSQL remains the gold standard for relational databases, and with modern tooling, it's more accessible than ever.

## Why PostgreSQL?

- **JSON Support**: Full JSONB capabilities alongside relational data
- **Extensions**: 1000+ extensions (PostGIS, pgvector for AI)
- **Performance**: Optimizer that rivals commercial databases
- **Reliability**: 25+ years of active development

## Modern Setup Options

### 1. Local Development

\`\`\`bash
# Using Docker
docker run --name my-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 -d postgres:16

# Connection string
postgresql://postgres:secret@localhost:5432/postgres
\`\`\`

### 2. Cloud Providers

| Provider   | Free Tier          | Notable Features          |
|------------|--------------------|---------------------------|
| Neon       | 3 projects         | Instant branching         |
| Supabase   | Unlimited projects | Built-in auth             |
| AWS RDS    | 750 hours          | Enterprise integration    |
| Railway    | $5 credit          | Easy scaling              |

## Core Concepts

### Schema Design Example

\`\`\`sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
\`\`\`

### Essential SQL Patterns

**1. CTEs (Common Table Expressions)**

\`\`\`sql
WITH popular_posts AS (
  SELECT * FROM posts 
  WHERE likes > 100
)
SELECT users.email, COUNT(popular_posts.id) 
FROM users
JOIN popular_posts ON users.id = popular_posts.user_id
GROUP BY users.email;
\`\`\`

**2. Window Functions**

\`\`\`sql
SELECT 
  title,
  author,
  RANK() OVER (PARTITION BY author ORDER BY sales DESC) 
FROM books;
\`\`\`

## Performance Optimization

### 1. EXPLAIN ANALYZE

Always test your queries:

\`\`\`sql
EXPLAIN ANALYZE 
SELECT * FROM users WHERE email = 'test@example.com';
\`\`\`

### 2. Connection Pooling

Use tools like:
- PgBouncer
- Built-in poolers in frameworks

### 3. Partitioning

For large tables:

\`\`\`sql
CREATE TABLE logs (
  id BIGSERIAL,
  created_at TIMESTAMPTZ,
  message TEXT
) PARTITION BY RANGE (created_at);

-- Monthly partitions
CREATE TABLE logs_2025_01 PARTITION OF logs
  FOR VALUES FROM ('2025-01-01') TO ('2025-02-01');
\`\`\`

## Modern ORMs

### Prisma Example

\`\`\`typescript
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  posts     Post[]
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}
\`\`\`

## Security Best Practices

1. Always use parameterized queries
2. Limit connection privileges
3. Encrypt sensitive columns with pgcrypto
4. Regularly update PostgreSQL versions

## Monitoring

Essential metrics to track:
- Query latency
- Connection count
- Cache hit ratio
- Replication lag

> "PostgreSQL is the most advanced open source database in the world." - Michael Stonebraker
`.trim(),
        isFeatured: false,
      },
      {
        slug: "nextjs-app-router-tips",
        title: "Next.js App Router Tips",
        description:
          "Mastering Next.js App Router - practical tips for route groups, component architecture, data fetching, and SEO strategies in the App Router era.",
        imageUrl: "/images/sample-6.jpg",
        content: `
# Next.js App Router: The 2025 Master Guide

The App Router represents a paradigm shift in Next.js development. After building 12+ projects with it, here's my comprehensive guide.

## Core Concepts

### File System Hierarchy

\`\`\`
app/
├── (marketing)/
│   ├── page.tsx       # Marketing landing
├── (app)/
│   ├── dashboard/
│   │   ├── page.tsx   # Protected route
├── api/
│   ├── webhook/
│   │   ├── route.ts   # API endpoint
├── layout.tsx         # Root layout
├── template.tsx       # Re-rendered layout
\`\`\`

## Data Fetching Patterns

### 1. Server Components

\`\`\`typescript
export default async function Page() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'no-store', // Dynamic
    // next: { revalidate: 3600 } // ISR
  });
  
  return <div>{data}</div>;
}
\`\`\`

### 2. Client-Side Data

\`\`\`typescript
'use client';

import { useEffect, useState } from 'react';

export function ClientComponent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data')
      .then(res => res.json())
      .then(setData);
  }, []);

  return <div>{data}</div>;
}
\`\`\`

## Advanced Routing

### Route Groups

Organize without affecting URL:

\`\`\`
app/
├── (auth)/
│   ├── login/
│   │   ├── page.tsx
│   ├── register/
│   │   ├── page.tsx
├── (main)/
│   ├── dashboard/
│   │   ├── page.tsx
\`\`\`

### Dynamic Routes

\`\`\`
app/
├── blog/
│   ├── [slug]/
│   │   ├── page.tsx
\`\`\`

Access params:

\`\`\`typescript
export default function Page({ params }: { params: { slug: string } }) {
  return <div>Blog: {params.slug}</div>;
}
\`\`\`

## Performance Optimization

### 1. Code Splitting

\`\`\`typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { 
    loading: () => <Skeleton />,
    ssr: false 
  }
);
\`\`\`

### 2. Bundle Analysis

Add to next.config.js:

\`\`\`javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({});
\`\`\`

## SEO Strategies

### 1. Metadata

\`\`\`typescript
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: [post.image],
    },
  };
}
\`\`\`

### 2. Structured Data

\`\`\`typescript
export default function ProductPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'My Product',
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </div>
  );
}
\`\`\`

## Migration Tips

From Pages Router:

1. Start with new features in app router
2. Use incremental adoption
3. Set up parallel routing
4. Migrate high-value pages first

## Common Pitfalls

1. **Client Component Overuse**: Only use for interactivity
2. **Nested Layout State**: Lift state up when needed
3. **Caching Misconfigurations**: Understand fetch options
4. **Middleware Complexity**: Keep middleware simple

## The Future of Next.js

Expected in 2025:
- Improved React Server Components performance
- Enhanced partial prerendering
- Deeper AI integration
- Improved dev tools

> "Next.js is the React framework for the Web." - Vercel Team
`.trim(),
        isFeatured: true,
      },
    ])
    .returning();

  await db.insert(postTag).values([
    // First post - 5 tags
    { postId: insertedPosts[0].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[0].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[0].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[0].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[0].id, tagId: insertedTags[6].id }, // React

    // Second post - 4 tags
    { postId: insertedPosts[1].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[1].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[1].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[1].id, tagId: insertedTags[8].id }, // Performance

    // Third post - 6 tags
    { postId: insertedPosts[2].id, tagId: insertedTags[3].id }, // Design
    { postId: insertedPosts[2].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[2].id, tagId: insertedTags[7].id }, // CSS
    { postId: insertedPosts[2].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[2].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[2].id, tagId: insertedTags[8].id }, // Performance

    // Fourth post - 5 tags
    { postId: insertedPosts[3].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[3].id, tagId: insertedTags[1].id }, // JavaScript
    { postId: insertedPosts[3].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[3].id, tagId: insertedTags[11].id }, // Testing
    { postId: insertedPosts[3].id, tagId: insertedTags[8].id }, // Performance

    // Fifth post - 4 tags
    { postId: insertedPosts[4].id, tagId: insertedTags[4].id }, // Database
    { postId: insertedPosts[4].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[4].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[4].id, tagId: insertedTags[9].id }, // Security

    // Sixth post - 7 tags
    { postId: insertedPosts[5].id, tagId: insertedTags[0].id }, // Next.js
    { postId: insertedPosts[5].id, tagId: insertedTags[5].id }, // TypeScript
    { postId: insertedPosts[5].id, tagId: insertedTags[6].id }, // React
    { postId: insertedPosts[5].id, tagId: insertedTags[2].id }, // WebDev
    { postId: insertedPosts[5].id, tagId: insertedTags[8].id }, // Performance
    { postId: insertedPosts[5].id, tagId: insertedTags[9].id }, // Security
    { postId: insertedPosts[5].id, tagId: insertedTags[11].id }, // Testing
  ]);

  const insightfulComments = [
    // Technical appreciation
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "This clarified so many concepts I've been struggling with. ",
              },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "The TypeScript generics explanation",
              },
              { type: "text", text: " was particularly eye-opening! " },
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "Bookmarking this for future reference.",
              },
              { type: "text", text: " 🚀" },
            ],
          },
        ],
      },
    },
    // Constructive feedback
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Great post! One suggestion - have you considered covering ",
              },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "error boundaries",
              },
              {
                type: "text",
                text: " in the React section? That's something many beginners (including me) struggle with.",
              },
            ],
          },
        ],
      },
    },
    // Personal experience
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "I implemented your PostgreSQL optimization tips and saw ",
              },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "query times drop by 40%",
              },
              { type: "text", text: "! The indexing advice was gold. " },
              { type: "text", text: "✨" },
            ],
          },
        ],
      },
    },
    // Thoughtful question
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "How would you adapt this architecture for a large-scale enterprise application? I'm curious about scaling considerations.",
              },
            ],
          },
        ],
      },
    },
    // Multi-paragraph insight
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Your design principles section resonated with me. ",
              },
              {
                type: "text",
                marks: [{ type: "italic" }],
                text: "So many developers overlook the psychology behind good UI.",
              },
            ],
          },
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Have you read " },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "Don't Make Me Think",
              },
              {
                type: "text",
                text: " by Steve Krug? Your spacing system reminds me of his concepts.",
              },
            ],
          },
        ],
      },
    },
    // Humorous take
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "After reading this, I realized I've been using ",
              },
              { type: "text", marks: [{ type: "bold" }], text: "'any'" },
              {
                type: "text",
                text: " in TypeScript like it's going out of style ",
              },
              { type: "text", text: "😅" },
              { type: "text", text: " Time to refactor!" },
            ],
          },
        ],
      },
    },
    // Framework comparison
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Interesting perspective on React vs Next.js! I've been team ",
              },
              { type: "text", marks: [{ type: "bold" }], text: "SvelteKit" },
              {
                type: "text",
                text: " lately, but you make compelling arguments for the Vercel stack.",
              },
            ],
          },
        ],
      },
    },
    // Career advice
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "As a junior dev, this roadmap gives me " },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "so much clarity",
              },
              { type: "text", text: " on what to learn next. " },
              { type: "text", text: "🙏" },
              {
                type: "text",
                text: " Any advice for breaking into open source?",
              },
            ],
          },
        ],
      },
    },
    // Technical debate
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "While I agree with most points, I've found ",
              },
              { type: "text", marks: [{ type: "bold" }], text: "Zod" },
              {
                type: "text",
                text: " to be more maintainable than Yup for complex validation. Have you compared them recently?",
              },
            ],
          },
        ],
      },
    },
    // Appreciation
    {
      content: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              {
                type: "text",
                text: "Just wanted to say thanks for putting this together. The ",
              },
              {
                type: "text",
                marks: [{ type: "bold" }],
                text: "real-world examples",
              },
              {
                type: "text",
                text: " make all the difference compared to theoretical tutorials. ",
              },
              { type: "text", text: "👏" },
            ],
          },
        ],
      },
    },
  ];

  // Assign comments to random posts
  for (const post of insertedPosts) {
    const commentCount = Math.floor(Math.random() * 3) + 2; // 2-4 comments per post

    for (let i = 0; i < commentCount; i++) {
      const randomComment =
        insightfulComments[
          Math.floor(Math.random() * insightfulComments.length)
        ];

      await db.insert(comments).values({
        postId: post.id,
        content: randomComment.content,
      });
    }
  }

  console.log("✅ Seed complete. Created:", {
    tags: insertedTags.length,
    posts: insertedPosts.length,
  });
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
