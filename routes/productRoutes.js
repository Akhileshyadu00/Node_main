import {
  fetchProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers.js";

export function productRoutes(app) {
  app.get('/api/products', fetchProduct);
  app.post('/api/product', createProduct);
  app.put('/api/product/:id', updateProduct);
  app.delete('/api/product/:id', deleteProduct);
}
