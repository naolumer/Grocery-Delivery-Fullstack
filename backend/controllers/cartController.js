import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

const cartController = {
  addItem: async (req, res) => {
    try {
      const { foodId, quantity = 1 } = req.body;
      const userId = req.userId;

      if (!foodId) {
        return res.status(400).json({
            success: false,
            message: "Food ID is required"
        });
      }

      const food = await foodModel.findById(foodId);
      if (!food || !food.inStock) {
        return res.status(400).json({
            success: false,
            message: 'Food not available'
        });
      }

      const user = await userModel.findById(userId);
      if (!user.cart) user.cart = new Map();

      const currentQty = user.cart.get(foodId)?.quantity || 0;
      user.cart.set(foodId, {
        foodId,
        quantity: currentQty + quantity
      });

      await user.save();

      const cartArray = await convertCartToArray(user.cart);
      res.status(200).json({
        success: true,
        cart: cartArray
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  removeItem: async (req, res) => {
    try {
      const { foodId } = req.params;
      const userId = req.userId;

      const user = await userModel.findById(userId);
      if (user.cart && user.cart.has(foodId)) {
        user.cart.delete(foodId);
        await user.save();
      }

      const cartArray = await convertCartToArray(user.cart || new Map());
      res.status(200).json({
        success: true,
        cart: cartArray
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  updateQuantity: async (req, res) => {
    try {
      const { foodId } = req.params;
      const { quantity } = req.body;
      const userId = req.userId;

      if (quantity === undefined || quantity < 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid quantity'
        });
      }

      const user = await userModel.findById(userId);
      if (quantity === 0) {
        if (user.cart && user.cart.has(foodId)) {
          user.cart.delete(foodId);
          await user.save();
        }
      } else {
        const food = await foodModel.findById(foodId);
        if (!food || !food.inStock) {
          return res.status(400).json({
            success: false,
            message: 'Food not available'
          });
        }

        if (!user.cart) user.cart = new Map();
        user.cart.set(foodId, { foodId, quantity });
        await user.save();
      }

      const cartArray = await convertCartToArray(user.cart || new Map());
      res.status(200).json({
        success: true,
        cart: cartArray
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      const cartArray = await convertCartToArray(user.cart || new Map());
      res.status(200).json({
        success: true,
        cart: cartArray
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  }
};

async function convertCartToArray(cartMap) {
  if (!cartMap || cartMap.size === 0) return [];

  const cartArray = [];
  for (const [foodId, item] of cartMap.entries()) {
    const food = await foodModel.findById(foodId).select('name image offerPrice inStock');
    if (food) {
      cartArray.push({
        id: item.foodId,
        quantity: item.quantity,
        name: food.name,
        image: food.image?.[0] || '',
        offerPrice: food.offerPrice || 0,
        inStock: food.inStock
      });
    }
  }
  return cartArray;
}

export default cartController;