const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://admin:FXZ9T5ZszWP4CHU4@cluster0.dyzigwz.mongodb.net/street-wear-ecommerce?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));
