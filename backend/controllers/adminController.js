import jwt from "jsonwebtoken"

// admin login controller

export const adminLoginController = async (req,res)=>{

    const {email,password} = req.body

    if(!email || !password){
        return res.json({
            success:false,
            message:"Enter email and password"
        })
    }
    try {
        if (email !== process.env.ADMIN_EMAIL){
            return res.json({
                success:false,
                message:"Invalid Email address"
            })
        }
        if (password !== process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:"Invalid Password"
            })
        }
        const atoken = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn:"1h"})

        return res.json({
            success:true,
            message: "Login Successful!",
            atoken
        })

    }catch(error){
        return res.json({
            success:false,
            message: error.message
        })
    }
}

// verify admin token

export const verifyTokenController = async (req, res) => {
  const { atoken } = req.body;

  if (!atoken) {
    return res.status(400).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {
    const decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      email: decoded.email,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

// add food

export const addFoodController = async (req,res)=> {

  const {name,description,price,offerPrice,category} = req.body
  const imgFile = req.file

  if (!name || !description ||!price || !offerPrice || !category){
    return res.json({
      success: false,
      message: "Missing fields"
    })
  }

  try {
    

  } catch(error){
    return res.json({
      success:false,
      message:error.message
    })
  }

}

