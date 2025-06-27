import Product from '../models/Product.js';

// Create a new product
export async function createProduct(req, res) {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json({ product: newProduct });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Get all products
export async function fetchProduct(req, res) {
  try {
    const products = await Product.find({});
    return res.status(200).json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Get single product by ID
export async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) 
      return res.status(404).json({ error: 'Product not found' });
    return res.status(200).json(product);
  } catch (err) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }
}

// Update a product
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Delete a product
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
