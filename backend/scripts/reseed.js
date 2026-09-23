import '../src/config/env.js';
import mongoose from 'mongoose';
import { seedAdmin } from '../src/utils/seedAdmin.js';
import { seedDemoPosts } from '../src/utils/seedPosts.js';
import Post from '../src/models/Post.js';

process.env.FORCE_DEMO_SEED = 'true';

await mongoose.connect(process.env.MONGODB_URI);
await seedAdmin();
await seedDemoPosts();
const all = await Post.find().select('title category').lean();
console.log(all.map((p) => `${p.category}: ${p.title}`).join('\n'));
await mongoose.disconnect();
