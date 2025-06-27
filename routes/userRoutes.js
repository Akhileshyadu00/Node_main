import express from 'express';
import { register } from '../controllers/userControllers.js'; 

export function UserRoutes(app) {
    app.post('/api/register', register);
}
