const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const blogRouter = require("./routes/blogRouter");
const categoryRouter = require("./routes/categoryRouter");
const blogCategoryRouter = require("./routes/blogCatRouter");
const brandRouter = require("./routes/brandRouter");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5012;

dbConnect();

app.use(morgan());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
app.use("/api/blog", blogRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blogcategory", blogCategoryRouter);
app.use("/api/brand", brandRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
