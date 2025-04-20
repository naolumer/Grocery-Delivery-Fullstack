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
      toast.error(error.message);
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
      if (data.success) setCart(data.cart);
    } catch (error) {
      toast.error(error.message);
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
      if (data.success) setCart(data.cart);
    } catch (error) {
      toast.error(error.message);
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
      if (data.success) setCart(data.cart);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOrder = () => {
    if (!loggedIn) {
      setShowLogin(true);
      return;
    }
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!selectedAddress) {
      alert("Please select a delivery address.");
      return;
    }
    const newOrder = {
      id: Date.now(),
      paymentMethod: paymentType,
      address: selectedAddress,
      items: cart.map((item) => ({
        ...item,
        name: item.name || allProducts.find((p) => p._id === item.id)?.name,
        image: item.image || allProducts.find((p) => p._id === item.id)?.image || [],
        category: item.category || allProducts.find((p) => p._id === item.id)?.category,
      })),
      total: cart.reduce((sum, item) => sum + item.quantity * item.offerPrice, 0),
    };
    setOrders((prev) => [...prev, newOrder]);
    setCart([]);
    navigate("/my-orders");
  };

  const getCart = async ()=>{
    try{
      const {data} = await axios.get(`${backendURL}/api/cart/get-food`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })

      if (data.success){
        setCart(data.cart)
      } 

    } catch(error){
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) getCart()
  },[token])

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
    category,setCategory,
    setCart,cart,
    query,setQuery,
    allProducts,filteredProducts, 
    setAllProducts,address,
    setAddress,selectedAddress,
    setSelectedAddress,loggedIn,
    setLoggedIn,showLogin,
    setShowLogin,orders,
    setOrders,paymentType,
    setPaymentType,handleOrder,
    token,setToken, backendURL,
    addToCart,updateCartQuantity,removeFromCart,getCart
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;