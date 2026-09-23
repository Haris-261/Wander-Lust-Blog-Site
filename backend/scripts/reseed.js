import '../src/config/env.js';
import mongoose from 'mongoose';
import { seedAdmin } from '../src/utils/seedAdmin.js';
import Post from '../src/models/Post.js';
import User from '../src/models/User.js';
import { DEMO_POSTS } from '../src/utils/seedPosts.js';

// Manual reset only: node scripts/reseed.js
await mongoose.connect(process.env.MONGODB_URI);
await seedAdmin();

const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase().trim();
const admin = await User.findOne({ email: adminEmail, role: 'admin' });
if (!admin) {
  console.error('Admin not found');
  process.exit(1);
}

await Post.deleteMany({});
for (const post of DEMO_POSTS) {
  await Post.create({ ...post, author: admin._id, published: true });
}
console.log(`Reseeded ${DEMO_POSTS.length} demo blogs (manual)`);
await mongoose.disconnect();
