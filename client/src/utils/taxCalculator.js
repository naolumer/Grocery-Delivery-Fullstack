const calculateTax = (price)=>{
    if (price && price>0) {
        const tax = (0.02 * price).toFixed(2)
        return tax
    } else return 0
}

export default calculateTax