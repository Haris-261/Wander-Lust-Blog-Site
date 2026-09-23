import { Router } from 'express';
import {
  getPublishedPosts,
  getPostBySlug,
  getCategories,
} from '../controllers/postController.js';

const router = Router();

router.get('/', getPublishedPosts);
router.get('/categories/list', getCategories);
router.get('/:slug', getPostBySlug);

export default router;
