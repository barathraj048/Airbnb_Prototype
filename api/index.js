import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import User from "./models/user.js";
import placeModel from './models/places.js';
import bcrypt from "bcrypt";
import download from "image-downloader";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from "multer";
import fs from "fs";
import bookingsModel from "./models/bokings.js";

const SaltRound = bcrypt.genSaltSync(10);
const jwtSecrot = 'kjrngrikgikuhgigklggdsfgnedkrjglerr';
dotenv.config();

const port = 4000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use('/uplodes', express.static(path.join(__dirname, '/uplodes')));
app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
}));

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {   });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
}
connectToDatabase();

// Define a middleware to extract user data from the token
const getUserDataFromToken = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecrot, {}, (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
};


app.get("/test", (req, res) => {
  res.json('app is running');
});

app.post("/register", async (req, res) => {
  const { Name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      Name: Name,
      email: email,
      password: bcrypt.hashSync(password, SaltRound)
    });
    res.json({ userDoc });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(422).json({ error });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email: email });
  try {
    if (userDoc) {
      const passOk = await bcrypt.compare(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          Email:userDoc.email,id:userDoc._id},jwtSecrot,{},(error,token)=> {
          if(error){
            console.log(error)
          }
          res.cookie('token',token).json(userDoc);
        })
      } else {
        res.status(422).json('Password error');
      }
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json('Internal Server Error');
  }
});

app.get('/profile',(req,res)=> {
  const {token}=req.cookies
  if(token){
    jwt.verify(token,jwtSecrot,{},async (err,userData)=> {
      if (err) throw err;
      const {Name,email,id}=await User.findById(userData.id)
      res.json({Name,email,id})
    })
  }else{
    res.json(null)
  }
})

app.post('/logout', (req, res) => {
  res.cookie('token', '').json({ message: 'logged out' })

});

app.post('/add-photos-by-link', async (req, res) => {
  const { link } = req.body;
  const filename = Date.now() + '.jpg';
  const destinationDirectory = path.join(__dirname, '/uplodes/');
  if (!link) {
      return res.status(400).send('Link is required.');
  }

  const options = {
      url: link,
      dest:( destinationDirectory + filename),
  };

  try {
      await download.image(options);
      console.log('File saved');
      res.status(200).json({ filename });
  } catch (error) {
      console.error('Error downloading image:', error);
      res.status(500).send('Error downloading image');
  }
});


const photoMiddleware=multer({dest:'uplodes'})
app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
  let addedPhoto = [];
  for (let i = 0; i < req.files.length; i++) {
    const { originalname, path } = req.files[i];
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const new_path = path + '.' + extension;
    fs.renameSync(path, new_path);
    addedPhoto.push(new_path.replace('uplodes\\', ''));
  }
  res.json(addedPhoto);
});
app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const { price,title, address, image, discription, features, extrainfo, checkin, checkout, maxguest } = req.body;
  console.log(title,'from post("/places")')
  if (token) {
    jwt.verify(token, jwtSecrot, {}, async (err, userData) => {
      if (err) throw err;

      try {
        const placeDoc = await placeModel.create({
          user:userData.id,
          title,
          address,
          image,
          description:discription,
          features,
          extrainfo,
          checkin,
          checkout,
          maxguest,
          price
        });
        res.json(placeDoc);
      } catch (error) {
        console.error('Error creating place document:', error);
        res.status(500).json({ error });
      }
    });
  }
});
app.get('/places',async (req,res)=> {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecrot, {}, async (err, userData) => {
    const {id}=userData;
    try {
      const place = await placeModel.find({
        user:id
        });
      res.json(place);
    } catch (error) {
      console.error('Error fetching place:', error);
      res.status(500).json({ error: 'Internal Server Error at get("places")' });
    }
  });
})

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userPlace = await placeModel.findById(id);
    res.json(userPlace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error at get("places/:id")' });
  }
});

app.put('/places', async (req, res) => {
  try {
    const { token } = req.cookies;
    const { price, title, address, image, discription, features, extrainfo, checkin, checkout, maxguest, id } = req.body;
    jwt.verify(token, jwtSecrot, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const placeDoc = await placeModel.findById(id);
      if (!placeDoc) {
        return res.status(404).json({ error: 'Place not found' });
      }
      if (userData.id === placeDoc.user.toString()) {
        placeDoc.set({
          title,
          address,
          image,
          description: discription,
          features,
          extrainfo,
          checkin,
          checkout,
          maxguest,
          price
        });
        await placeDoc.save();
        return res.json('Successfully updated place');
      } else {
        return res.status(403).json({ error: 'Forbidden' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error at put("places")' });
  }
});

app.get('/places-home',async (req,res)=> {
  res.json(await placeModel.find())
})

app.get('/place/:id',async (req,res)=> {
  const {id}=req.params;
  res.json(await placeModel.findById(id))
})

app.post('/bookings', async (req, res) => {
  try {
    const { checkin, checkout, guste, name, phone, place, price } = req.body;
    const userData = await getUserDataFromToken(req)
    // Attempt to create a new booking
    const bookingDetail = await bookingsModel.create({
      checkin: checkin,
      checkout: checkout,
      noOfGuste: guste,
      name: name,
      phone: phone,
      place: place,
      price: price,
      user:userData.id
    });
    res.json(bookingDetail);
    console.log('Booking data was added successfully.');
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ error: 'Error adding booking' });
  }
});

app.get('/bookingsdata/:id',async (req, res) => {
  const userData = await getUserDataFromToken(req)
  const { id } = req.params; 
  try{
    const bookingDoc=await bookingsModel.find({
      user:userData.id
    })
    if(!bookingDoc){
      return res.status(404).json({ message: 'Booking data not found' });
    }
    res.json(bookingDoc)
  }catch(err){
    console.log(`failed to fetch data ${err}`)
  }
});
app.get('/bookingsdata/',async (req, res) => {
  const userData = await getUserDataFromToken(req)
  try{
    const bookingDoc=await bookingsModel.find({
      user:userData.id
    })
    if(!bookingDoc){
      return res.status(404).json({ message: 'Booking data not found' });
    }
    res.json(bookingDoc)
  }catch(err){
    console.log(`failed to fetch data ${err}`)
  }
});

app.get('/image-booked', async (req, res) => {
  const { placeid } = req.query;
  console.log(placeid)
  try {
    if (!placeid) {
      return res.status(400).json({ error: 'Place ID is required' });
    }

    const placedetail = await placeModel.findById(placeid);
    if (!placedetail) {
      return res.status(404).json({ error: 'Place not found' });
    }

    res.json(placedetail);
  } catch (error) {
    console.error('Error fetching booked place:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/search', async (req, res) => {
  try {
    const { search } = req.query;
    const searchedPlace = await placeModel.find({
      title: search
    });
    res.json(searchedPlace);
  } catch (err) {
    console.log(`error in fetching searched member ${err}`);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

  
app.listen(port, () => {
  console.log(`server is running successfully on port ${port}`);
});