const connectDB = require('../database/config');
const Job = require('../models/jobModel');

const deleteAllDocs = async () => {
  try {
    connectDB();
    await Job.deleteMany({});
    console.log(`All docs from Job collection deleted!`);
    process.exit(0);
  } catch (err) {
    console.error(`error deleting all docs: ${err.message}`);
    process.exit(1);
  }
};

deleteAllDocs();
