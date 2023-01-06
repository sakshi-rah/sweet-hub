import express from "express"
import mongoose from "mongoose";
import dotenv, { config } from "dotenv";
import User from "./models/User.js";
import FoodItems from "./models/FoodItems.js"
dotenv.config()



const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_URL, () => {
    console.log('connected to mongoose')
})

//signup routes
app.post('/signup', async (req, res) => {
    const { name, email, phone, password, role } = req.body;
    //validation for all field fillor not is starts 
    const emptyFields = [];

    if (!name) emptyFields.push('name');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!phone) emptyFields.push('phone');
    if (!role) emptyFields.push('role');

    if (emptyFields.length > 0) {
        return res.json({
            success: false,
            message: `${emptyFields.join(', ')} are require`
        })
    }
    //validation for all field fillor not  ends

    //validation to check if email already exists starts 
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return res.json({
            success: false,
            message: "Email already exists "
        })
    }
    //validation to check if email already exists ends

    //validation to check if phone already exists starts 
    const existingUserPhone = await User.findOne({ phone: phone });
    if (existingUserPhone) {
        return res.json({
            success: false,
            message: "Phone already exists "
        })
    }
    //validation to check if email already exists ends
    const user = new User({
        name: name,
        email: email,
        phone: phone,
        password: password,
        role: role
    })

    const savedUser = await user.save();
    res.json({
        success: true,
        message: "User created successfully",
        data: savedUser
    })
})

//login routes
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({
            success: false,
            message: "Email and Password are required"
        })
    }

    const existingUser = await User.findOne({ email: email, password: password });
    if (existingUser) {
        return res.json({
            success: true,
            message: "Login successful",
            data: existingUser
        })
    }
    else {
        return res.json({
            success: false,
            message: "Invalid email or password",
        })
    }
})

//create fooditems api
app.post('/createFoodItems', async (req, res) => {
    const { title, description, imgUrl, category, price } = req.body;

    const foodItem = new FoodItem({
        title: title,
        description: description,
        imgUrl: imgUrl,
        category: category,
        price: price
    })

    const saveFoodItem = await FoodItem.save();

    res.json({
        success: true,
        description: "Food Item created successfully",
        data: saveFoodItem
    })
})
//search food items api route by category
app.get('/FoodItemByCategory',async(req,res)=>{
    const {category} = req.query;

    const foodItems = await FoodItems.find({
        category: {$regex: category, $options: 'i'}
    })

    res.json({
        success:true,
        description: "Food Items Fatch Successfully",
        data : foodItems
    })
})

//search food items api route by title
app.get('/FoodItemByTitle',async(req,res)=>{
    const {title} = req.query;

    const foodItems = await FoodItems.find({
        title: {$regex: title, $options: 'i'}
    })

    res.json({
        success:true,
        description: "Food Items Fatch Successfully",
        data : foodItems
    })
})

app.listen(PORT, () => {
    console.log(`server started running on PORT ${PORT}`);
})