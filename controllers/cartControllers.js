import Cart from '../models/Cart.js'; 
import Product from '../models/Product.js'; 

// Add item to cart
export async function addToCart(req, res) {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    if (!productId || quantity <= 0) {
      return res.status(400).json({ message: 'Invalid product or quantity' });
    }

    // You could check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create or update cart logic
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      // Check if item already exists
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Update item quantity in cart
export async function updateCartItem(req, res) {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity <= 0) {
      return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.id(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json({ message: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove item from cart
export async function removeCartItem(req, res) {
  try {
    const userId = req.user._id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// View user's cart
export async function getCart(req, res) {
  try {
    const userId = req.user._id;

    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart is empty or not found' });
    }

    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
