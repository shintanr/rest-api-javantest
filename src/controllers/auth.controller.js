import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { cookieOptions } from '../utils/cookieOptions.js';
import express from 'express';

const JWT_SECRET = process.env.JWT_SECRET;

// register 
export const register = async (req, res) => {
    console.log(req.body); // cek apa aja yg dikirim client
    const { name, email, password } = req.body;

    try {
    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if(existingUser.length > 0) {
        return errorResponse(res, 'Email sudah terdaftar', null, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

    return successResponse(res, 'User berhasil didaftarkan', { name, email});
}  catch (error) {
    console.error(error);
    return errorResponse(res,'Terjadi kesalahan pada server', null, 500);
}
}




// login
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

    if(users.length === 0) {
        return errorResponse(res, 'Email atau password salah', null, 401);
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return errorResponse(res, 'Email atau password salah', null, 401);
    }

    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, cookieOptions);

    return successResponse(res, 'Login berhasil', { token });
}

// logoout
export const logout = (req, res) => {
    res.clearCookie('token', {
        ...cookieOptions(req), // menghapus semua yang termasuk ke dalam cookie 
        maxAge: undefined
    })
    return successResponse(res, 'berhasil logout yeyy')
}