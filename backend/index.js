import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

const app = express();
const port = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "secret_ecom";

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

//API Creation

app.get("/", (req, res) => {
  res.send("App is Runnings");
});

//Creating API For deleting Product

app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Creating API Getting All Products

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fteched");
  res.send(products);
});

//Careating EndPoint for registering User

// const saltRounds = 10;
// const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

// Creating EndPonit for User Login

//Creating endPoint for newcollection data

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(0).slice(-8);
  console.log("NEW COLLECTION FETCHED");
  res.send(newcollection);
});

//Creating endPoint for popularinwomen data

app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Poppular in women products fetched");
  res.send(popular_in_women);
});

// creating middleware for fetch user

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send({ error: "Please authoticate using valid user " });
  } else {
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      res.status(401).send({ error: "Please authoticate using valid user" });
    }
  }
};

//Creating endPoint for adding products to cartdata

app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    const itemId = req.body.itemId;
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

    await Users.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
    res.json({ message: "Added to cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// creating endpoint for removing products to cartdata

app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({ message: "Removed" });
});

//Crating endpoint to get cartdata

app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });

  if (!userData) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(userData.cartData);
});

app.listen(port, () => {
  console.log(`Server Running Successfully on Port ${port}`);
});
