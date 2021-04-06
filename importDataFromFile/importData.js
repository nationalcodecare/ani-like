const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Title = require('../models/titleModel');

dotenv.config({ path: './config.env' });

// DATABSE CONNECTION STRING
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {  //  connect to databse
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to Database!'));

// READ JSON FILE
const titles = JSON.parse(
  fs.readFileSync(`${__dirname}/data.json`, 'utf-8')
);
console.log(titles);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Title.create(titles);
    console.log('Titles successfully imported!');
} catch (err) {
    console.log(err);
}
process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Title.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
