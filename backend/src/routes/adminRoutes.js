import { Router } from 'express';
import {
  getAdminPosts,
  getAdminPostById,
  createPost,
  updatePost,
  deletePost,
  uploadImage,
  getStats,
} from '../controllers/postController.js';
import { protect, requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.use(protect, requireAdmin);

router.get('/stats', getStats);
router.get('/posts', getAdminPosts);
router.get('/posts/:id', getAdminPostById);
router.post('/posts', upload.single('cover'), createPost);
router.put('/posts/:id', upload.single('cover'), updatePost);
router.delete('/posts/:id', deletePost);
router.post('/upload', upload.single('image'), uploadImage);

export default router;
