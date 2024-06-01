require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./controller/authcontroller");
const { Server } = require("socket.io");
const http = require("http");
const app = express();
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const cheerio = require("cheerio");
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server, {
  path: '/socket.io/',
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  }
});
let openChrome;
const Hashtag = require('./models/Tags');
const User = require('./models/usermodel');
const usermodel = require('./models/usermodel');
const DBconnect = require('./models/db');
let options = new chrome.Options();
options.addArguments('--headless'); // Run in headless mode
options.addArguments('--window-size=1200,800'); // Set the window size (viewport size)



let responseArray = [];
async function fillInputField(driver, className, text) {
  let inputField = await driver.findElement(By.className(className));
  await inputField.sendKeys(text);
}

async function clickDiv(driver, className) {
  let div = await driver.findElement(By.className(className));
  await div.click();
}


const frontendNamespace = io.of('/frontend');
frontendNamespace.on('connection', (socket) => {
  console.log('Frontend client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Frontend client disconnected:', socket.id);
  });


openChrome = async(id,email,username,password,ip) => {
  let data={userId:id,description:'Setting things for you'}
  socket.emit('status',data)
  let service = new chrome.ServiceBuilder();
  let driver = new Builder().forBrowser('chrome').setChromeOptions(options).setChromeService(service).build();
  try {
    await driver.get('https://x.com/i/flow/login');

    await driver.manage().window().maximize()

    await driver.wait(until.elementLocated(By.className('r-30o5oe')), 10000);
    await fillInputField(driver, 'r-30o5oe', email);

    console.log("Filling Email Fields")

    data = {userId:id,description:"Filling Email Fields"}

    socket.emit('status',data)
    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-ywje51 r-184id4b r-13qz1uu r-2yi16 r-1qi8awa r-3pj75a r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
    data = {userId:id,description:"Authenticating you in the process"}
    socket.emit('status',data)
    const inp = "r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7";
    await driver.wait(until.elementLocated(By.className(inp)), 10000);
    await fillInputField(driver, inp, username);
    data = {userId:id,description:"Authenticating you in the process"}
socket.emit('status',data)
    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
    data = {userId:id,description:"Authenticating you in the process"}
    socket.emit('status',data)
    await driver.wait(until.elementLocated(By.className("r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7")), 10000);
    await fillInputField(driver, "r-30o5oe r-1dz5y72 r-13qz1uu r-1niwhzg r-17gur6a r-1yadl64 r-deolkf r-homxoj r-poiln3 r-7cikom r-1ny4l3l r-t60dpp r-fdjqy7", password);
    data = {userId:id,description:"Authenticating you in the process"}
    socket.emit('status',data)

    await driver.wait(until.elementIsVisible(driver.findElement(By.className("css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"))), 10000);
    await clickDiv(driver, "css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1fkl15p r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l");
    data = {userId:id,description:"Authenticatiion Completed"}
    socket.emit('status',data)
    data = {userId:id,description:"Fetching resources"}
socket.emit('status',data)
    while (responseArray.length != 5) {
      const pageSource = await driver.getPageSource();
      const $ = cheerio.load(pageSource);
      let count = 0;
    
      const targetClass = 'r-poiln3';
      const elements = $(`.${targetClass}`);
      
      elements.each(function (index, element) {
        console.log(responseArray)
        if (count === 1) {
          if (!responseArray.includes($(element).text().toString())) {
            responseArray.push($(element).text().toString());
          }

        }
        if (responseArray.length === 6) {
          return false;
        }
        if ($(element).text().includes("Trending")) {
          count++;
        } else {
          count = 0;
        }
      });  

    }
    console.log(responseArray)
    data = {userId:id,ip:ip,description:responseArray}
    socket.emit('response',data)
    createHasTags(id,responseArray,ip)
    await driver.sleep(5000);
    await driver.sleep(100000);
  } finally {
    await driver.quit();
  }
}

});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan("dev"));

DBconnect.dbconnection.then(()=>{
})// Define routes
app.post("/api/auth/register", auth.registerUser);
app.post("/api/auth/login", auth.loginUser);
app.put("/api/auth/user/:userId", auth.updateUserInfo); // Assuming userId is passed in the URL parameters
app.post(`/api/automate/:userId`, async (req, res) => {
  try {
    let { userId } = req.params;
    let { ip } = req.body;
    console.log(userId);
    let u = await usermodel.findOne({ _id: userId });
    if (!u) {
      res.status(404).json({ message: "User not found" });
      console.log("User not found");
      return; // Exit the function if user not found
    }

    console.log(u);

    if (!u.twitterId) {
      res.status(404).json({ message: "Twitter Id not found" });
      console.log("Twitter Id not found");
      return; // Exit the function if Twitter ID not found
    }

    let email = u.twitterId.email;
    let username = u.twitterId.username;
    let password = u.twitterId.password;

    await openChrome(userId, email, username, password, ip);

  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/hashtags/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const hashtags = await Hashtag.find({ createdBy: userId });
    return res.status(200).json({ hashtags });
  } catch (error) {
    console.error('Error retrieving hashtags:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
async function createHasTags(userId, tags,ip) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    let hashtag = await Hashtag.findOne({ tags: { $all: tags } });

    if (!hashtag) {
      hashtag = new Hashtag({
        tags: tags,
        createdBy: userId,
        ip:ip
      });
    } else {
      hashtag.createdBy = userId;
    }

    const savedHashtag = await hashtag.save();

    console.log( 'Hashtag created/updated successfully',savedHashtag );
    return { message: 'Hashtag created/updated successfully', hashtag: savedHashtag };
  } catch (error) {
    console.error('Error creating/updating hashtag:', error);
    throw error;
  }
}
// Start the app
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
