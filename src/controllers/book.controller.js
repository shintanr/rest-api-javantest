import pool from '../config/database.js';
import { successResponse, errorResponse } from '../utils/response.js';

// 📘 Get all books
export const getBooks = async (req, res) => {
  try {
    const [books] = await pool.query('SELECT * FROM books');
    return successResponse(res, 'Berhasil mengambil semua buku', books);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Gagal mengambil data buku', null, 500);
  }
};

// 📗 Get book by ID
export const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const [books] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
    if (books.length === 0) return errorResponse(res, 'Buku tidak ditemukan', null, 404);

    return successResponse(res, 'Berhasil mengambil detail buku', books[0]);
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Gagal mengambil detail buku', null, 500);
  }
};

// 📕 Create new book
export const createBook = async (req, res) => {
  const { title, author, genre, year, description } = req.body;
  const user_id = req.user.id; // ambil dari token

  try {
    await pool.query(
      'INSERT INTO books (title, author, genre, year, description, user_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, author, genre, year, description, user_id]
    );

    return successResponse(res, 'Buku berhasil ditambahkan', {
      title, author, genre, year, description, user_id
    });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Gagal menambahkan buku', null, 500);
  }
};

// 📙 Update book
export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, description } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE books SET title=?, author=?, genre=?, year=?, description=? WHERE id=?',
      [title, author, genre, year, description, id]
    );

    if (result.affectedRows === 0) return errorResponse(res, 'Buku tidak ditemukan', null, 404);
    return successResponse(res, 'Buku berhasil diperbarui', { id, title });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Gagal memperbarui buku', null, 500);
  }
};

// 📒 Delete book
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM books WHERE id = ?', [id]);
    if (result.affectedRows === 0) return errorResponse(res, 'Buku tidak ditemukan', null, 404);

    return successResponse(res, 'Buku berhasil dihapus', { id });
  } catch (error) {
    console.error(error);
    return errorResponse(res, 'Gagal menghapus buku', null, 500);
  }
};
