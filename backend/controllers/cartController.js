import userModel from '../models/userModel.js';
import foodModel from '../models/foodModel.js';

const cartController = {
  addItem: async (req, res) => {
    try {
      const { foodId, quantity = 1 } = req.body; 
      const userId = req.userId;

      if (!foodId) {
        return res.status(400).json({
            success:false,
            message: "food Id is required"
        })
      }

      const food = await foodModel.findById(foodId);

      if (!food || !food.inStock) {
        return res.status(400).json({
            success:false,
            message: 'Food not available' });
      }

      const user = await userModel.findById(userId);

      if (!user.cart) user.cart = {};

      const currentQty = user.cart[foodId]?.quantity || 0;
      user.cart[foodId] = {
        foodId,
        quantity: currentQty + quantity
      };

      await user.save();

      const cartArray = convertCartToArray(user.cart);
      res.status(200).json({ 
        success:true,
        cart: cartArray });

    } catch (error) {
      res.status(500).json({ 
        success:false,
        message: 'Server error', 
      });
    }
  },


  removeItem: async (req, res) => {
    try {
      const { foodId } = req.params;
      const userId = req.userId;

      const user = await userModel.findById(userId);
      
      if (user.cart && user.cart[foodId]) {
        delete user.cart[foodId];
        await user.save();
      }
      const cartArray = convertCartToArray(user.cart || {});
      res.status(200).json({ 
        success:true,
        cart: cartArray });

    } catch (error) {
      res.status(500).json({ 
        message: 'Server error', 
        success:false
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
            success:false,
            message: 'Invalid quantity' });
      }

      const user = await userModel.findById(userId);
      
      if (quantity === 0) {
        if (user.cart && user.cart[foodId]) {
          delete user.cart[productId];
          await user.save();
        }
      } else {

        const food = await foodModel.findById(foodId);

        if (!food || !food.inStock) {
          return res.status(400).json({ 
            success:false,
            message: 'Product not available' });
        }

        if (!user.cart) user.cart = {};
        user.cart[foodId] = { foodId, quantity };
        await user.save();
      }

      const cartArray = convertCartToArray(user.cart || {});
      res.status(200).json({ 
        success:true,
        cart: cartArray });

    } catch (error) {
      res.status(500).json({
         message: 'Server error', 
         success:false });
    }
  },

  getCart: async (req, res) => {
    try {
      const userId = req.userId;
      const user = await userModel.findById(userId);
      
      const cartArray = convertCartToArray(user.cart || {});
      
      res.status(200).json({ 
        cart: cartArray,
        success:true
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error', 
        success:false });
    }
  }
};

function convertCartToArray(cartObj) {
  return Object.values(cartObj).map(item => ({
    id: item.foodId,
    quantity: item.quantity
  }));
}

export default cartController;