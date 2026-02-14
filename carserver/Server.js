const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

/* ======================
   MongoDB Connection
====================== */
mongoose
  .connect("mongodb://127.0.0.1:27017/cardb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

/* ======================
   CONSTANTS
====================== */
const RIDE_DURATION_MINUTES = 1; // change if needed

const PRICE_PER_KM = {
  Bike: 10,
  Auto: 20,
  Car: 30
};

/* ======================
   SCHEMAS
====================== */
const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});
const User = mongoose.model("User", UserSchema);

const DriverSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
  phone: String,
  status: {
    type: String,
    enum: ["FREE", "BUSY"],
    default: "FREE"
  }
});
const Driver = mongoose.model("Driver", DriverSchema, "drivers");

const RideSchema = new mongoose.Schema({
  pickup: String,
  drop: String,
  pickupCoords: [Number],
  dropCoords: [Number],
  vehicle: String,
  distanceKm: Number,
  price: Number,
  rideDate: String,
  rideTime: String,
  status: { type: String, default: "ONGOING" },
  driverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver"
  },
  createdAt: { type: Date, default: Date.now }
});
const Ride = mongoose.model("Ride", RideSchema);

/* ======================
   HELPERS
====================== */
function getDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getRideEndDelay(rideDate, rideTime) {
  const start = new Date(`${rideDate}T${rideTime}:00`);
  const end = new Date(start.getTime() + RIDE_DURATION_MINUTES * 60000);
  const delay = end.getTime() - Date.now();
  return delay > 0 ? delay : 0;
}

async function autoEndRide(rideId) {
  try {
    const ride = await Ride.findById(rideId);
    if (!ride || ride.status === "COMPLETED") return;

    ride.status = "COMPLETED";
    await ride.save();

    if (ride.driverId) {
      await Driver.findByIdAndUpdate(ride.driverId, {
        status: "FREE"
      });
    }

    console.log("✅ Ride auto completed:", rideId);
  } catch (err) {
    console.error(err.message);
  }
}

/* ======================
   ADD DRIVER (ONE TIME)
====================== */
app.post("/add-driver", async (req, res) => {
  await Driver.create(req.body);
  res.json({ success: true });
});

/* ======================
   BOOK RIDE
====================== */
app.post("/book-ride", async (req, res) => {
  try {
    const {
      pickup,
      drop,
      pickupCoords,
      dropCoords,
      vehicle,
      rideDate,
      rideTime
    } = req.body;

    const driver = await Driver.findOne({ status: "FREE" });
    if (!driver) {
      return res.json({
        success: false,
        message: "No drivers available"
      });
    }

    const [pLat, pLng] = pickupCoords;
    const [dLat, dLng] = dropCoords;

    const distanceKm = getDistanceKm(pLat, pLng, dLat, dLng);
    const price = Math.round(distanceKm * PRICE_PER_KM[vehicle]);

    const ride = await Ride.create({
      pickup,
      drop,
      pickupCoords,
      dropCoords,
      vehicle,
      distanceKm,
      price,
      rideDate,
      rideTime,
      driverId: driver._id,
      status: "ONGOING"
    });

    driver.status = "BUSY";
    await driver.save();

    const delay = getRideEndDelay(rideDate, rideTime);
    setTimeout(() => autoEndRide(ride._id), delay);

    res.json({
      success: true,
      bookingId: ride._id,
      distanceKm: distanceKm.toFixed(2),
      price,
      driver: {
        name: driver.name,
        phone: driver.phone
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* ======================
   LOGIN
====================== */
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === "admin" && password === "admin123") {
      return res.json({
        message: "✅ Admin login successful",
        user: { email, role: "admin" }
      });
    }
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "❌ Invalid email or password"
      });
    }

    res.json({
      message: "✅ Login successful",
      user: {
        email: user.email
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Server error"
    });
  }
});

/* ======================
   REGISTER
====================== */
app.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({
        message: "❌ User already exists"
      });
    }

    await User.create({ email, password });

    res.json({
      message: "✅ Registration successful"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "❌ Server error"
    });
  }
});





app.get("/drivers", async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});


app.get("/rides", async (req, res) => {
  const rides = await Ride.find()
    .populate("driverId", "name phone status")
    .sort({ createdAt: -1 });

  res.json(rides);
});


app.get("/users", async (req, res) => {
  const users = await User.find({}, { password: 0 });
  res.json(users);
});



app.post("/driver/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(401).json({ message: "Driver not found" });
    }

    if (driver.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({
      message: "Driver login successful",
      driver
    });

  } catch (err) {
    console.error("❌ DRIVER LOGIN ERROR:", err); 
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/driver/:driverId/rides", async (req, res) => {
  try {
    const { driverId } = req.params;

    const rides = await Ride.find({ driverId })
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


app.get("/driver/:driverId/rides", async (req, res) => {
  try {
    const { driverId } = req.params;

    const rides = await Ride.find({ driverId })
      .sort({ createdAt: -1 });

    res.json(rides);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


/* ======================
   SERVER START
====================== */
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

 