import {
  fetchProduct,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

export function productRoutes(app) {
  app.get('/api/products', fetchProduct);
   app.get('/api/product/:id', getProductById);
  app.post('/api/product', createProduct);
  app.put('/api/product/:id', updateProduct);
  app.delete('/api/product/:id', deleteProduct);
}
