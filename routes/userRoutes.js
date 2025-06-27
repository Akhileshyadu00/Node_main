import express from 'express';
import { register, login } from '../controllers/userControllers.js'; 

export function UserRoutes(app) {
    app.post('/api/register', register);
    app.post('/api/login', login);
}
