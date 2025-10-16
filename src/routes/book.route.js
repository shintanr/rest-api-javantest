import express from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/book.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getBooks);
router.get('/:id', verifyToken, getBookById);
router.post('/', verifyToken, createBook);
router.put('/:id', verifyToken, updateBook);
router.delete('/:id', verifyToken, deleteBook);

export default router;
