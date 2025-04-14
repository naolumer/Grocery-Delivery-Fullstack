import { createContext, useState } from "react";
import { dummyProducts } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AppContext = createContext()

const AppContextProvider = ({children})=>{


    const [allProducts,setAllProducts] = useState([])
    const [category, setCategory] = useState("")
    const [cart, setCart] = useState([])
    const [query, setQuery] = useState("")
    const [orders, setOrders] = useState([])
    const [paymentType,setPaymentType] = useState("")
    
    const [address, setAddress] = useState(JSON.parse(localStorage.getItem("address")) ? 
    JSON.parse(localStorage.getItem("address")) : []);
    
    const [selectedAddress, setSelectedAddress] = useState(null)

    const [loggedIn,setLoggedIn] = useState(false)
    const [showLogin, setShowLogin] = useState(false)

    const navigate = useNavigate()

    const queryProducts = ()=>{
        const filtered = dummyProducts.filter((item)=> item?.name?.toLocaleLowerCase().startsWith(query.toLocaleLowerCase()))
        setAllProducts(filtered)
    }

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
          items: cart.map(item => ({
            ...item,
            // Ensure image data is properly included
            name:item.name || dummyProducts.find(p=>p._id===item.id)?.name,
            image: item.image || dummyProducts.find(p => p._id === item.id)?.image || [],
            category: item.category || dummyProducts.find(p=>p._id===item.id)?.category
          })),
          total: cart.reduce((sum, item) => sum + item.quantity * item.offerPrice, 0),
        };
      
        setOrders((prev) => [...prev, newOrder]);
        setCart([]);
        navigate("/my-orders");
        }
      

    useEffect(()=>{
        query && navigate("/products")
        queryProducts()
    },[query])

    useEffect(()=>{

        localStorage.setItem("address",JSON.stringify(address))
    },[address])


    const value = {
        category,
        setCategory,setCart,
        cart,query,
        setQuery,allProducts,
        setAllProducts,address,
        setAddress,selectedAddress,
        setSelectedAddress,loggedIn,
        setLoggedIn,showLogin,setShowLogin,
        orders, setOrders,
        paymentType,setPaymentType,handleOrder
    }
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export default AppContextProvider