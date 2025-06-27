import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from '../controllers/cartController.js';

import { verifyToken } from '../middleware/authMiddleware.js';

export function cartRoutes(app) {
  app.get('/api/cart', verifyToken, getCart);          
  app.post('/api/cart', verifyToken, addToCart);        
  app.put('/api/cart/:itemId', verifyToken, updateCartItem); 
  app.delete('/api/cart/:itemId', verifyToken, removeCartItem); 
}
