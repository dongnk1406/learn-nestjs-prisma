# Comments Feature Documentation

## Overview

The Comments feature provides a complete CRUD system for managing comments on posts. Users can create, read, update, and delete their own comments, with proper authorization and validation.

## Database Schema

### Comment Model
```prisma
model Comment {
  id        Int       @id @default(autoincrement())
  message   String
  postId    Int
  authorId  Int
  createdAt DateTime  @default(now())
  updatedAt DateTime? @updatedAt
  
  post      Post      @relation(fields: [postId], references: [id], onDelete: Cascade)
  author    User      @relation(fields: [authorId], references: [id])
}
```

### Relationships
- **Comments → User**: Many-to-One (authorId)
- **Comments → Post**: Many-to-One (postId)
- **User → Comments**: One-to-Many
- **Post → Comments**: One-to-Many
