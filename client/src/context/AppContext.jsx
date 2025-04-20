import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [address, setAddress] = useState(
    JSON.parse(localStorage.getItem("address")) || []
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showLogin, setShowLogin] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/food/get-allfood`);
      if (data.success) {
        setAllProducts(data.food);
        setFilteredProducts(data.food);
        setIsLoading(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load products");
      console.error(error)
    }
  };

  const queryProducts = () => {
    if (!query) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter((item) =>
        item?.name?.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  const addToCart = async (foodId, quantity = 1) => {
    try {
      const { data } = await axios.post(
        `${backendURL}/api/cart/add`,
        { foodId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setCart(data.cart);
        toast.success("Added to cart!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add to cart");
      console.error(error)
    }
  };

  const updateCartQuantity = async (foodId, quantity) => {
    try {
      const { data } = await axios.put(
        `${backendURL}/api/cart/update/${foodId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setCart(data.cart);
        toast.success("Cart updated!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update cart");
      console.error(error)
    }
  };

  const removeFromCart = async (foodId) => {
    try {
      const { data } = await axios.delete(
        `${backendURL}/api/cart/delete/${foodId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setCart(data.cart);
        toast.success("Item removed from cart!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error)
    }
  };

  const handleOrder = () => {
    if (!loggedIn) {
      setShowLogin(true);
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      paymentMethod: paymentType,
      address: selectedAddress,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        offerPrice: item.offerPrice,
        category: allProducts.find((p) => p._id === item.id)?.category || "Unknown",
      })),
      total: cart.reduce((sum, item) => sum + item.quantity * item.offerPrice, 0),
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    toast.success("Order placed successfully!");
    navigate("/my-orders");
  };

  const getCart = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/cart/get-cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setCart(data.cart);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to load cart");
      console.error(error)
    }
  };

  useEffect(() => {
    if (token) getCart();
  }, [token]);

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    queryProducts();
    if (query) {
      navigate("/products");
    }
  }, [query, allProducts]);

  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    setLoggedIn(!!token);
  }, [token]);

  const value = {
    category, setCategory,
    cart, setCart,
    query, setQuery,
    allProducts, filteredProducts,
    setAllProducts, address,
    setAddress, selectedAddress,
    setSelectedAddress, loggedIn,
    setLoggedIn, showLogin,
    setShowLogin, orders,
    setOrders, paymentType,
    setPaymentType, handleOrder,
    token, setToken, backendURL,
    addToCart, updateCartQuantity, removeFromCart, getCart,
    isLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;