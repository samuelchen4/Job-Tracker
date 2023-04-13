const puppeteer = require('puppeteer');
const Job = require('../models/jobModel');
const { todaysDateToString } = require('../util/helperMethods');

const parseJob = async (req, res) => {
  try {
    const encodedUrl = req.params.encodedUrl;
    const url = decodeURIComponent(encodedUrl);
    // console.log(url); // debugging
    // setup puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    ); // need this line for it to work in headless mode
    await page.goto(`${url}`);

    // console.log('page loaded!'); // debugging
    const positionHandle = await page.$('.jobsearch-JobInfoHeader-title');
    const companyHandle = await page.$('[data-company-name]');
    const locationHandle = await page.$('.css-6z8o9s'); // based on styles
    const salaryHandle = await page.$('#salaryInfoAndJobType');
    const activityHandle = await page.$('.css-659xjq'); // based on styles

    // get all the company data
    const position = await positionHandle.evaluate(
      (position) => position.textContent
    );
    const company = await companyHandle.evaluate(
      (company) => company.textContent
    );
    const location = await locationHandle.evaluate(
      (location) => location.textContent
    );
    const salary = await salaryHandle.evaluate((salary) => salary.textContent);
    const activity = activityHandle
      ? `${await activityHandle.evaluate(
          (activity) => activity.textContent
        )} (${todaysDateToString()})`
      : 'handler not found';

    await browser.close();

    const response = {
      company,
      position,
      url,
      salary,
      activity,
      location,
    };

    res.json(response);
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const addJob = async (req, res) => {
  try {
    const data = req.body;
    const resData = await Job.create(data);
    res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

const updateJob = async (req, res) => {
  try {
    //replace document with req.body for the same _ids
    const { _id } = req.params;
    const { updateObj } = req.body;
    const job = await Job.findById(_id);
    job.set({ ...updateObj });
    await job.save();
    console.log(job);
    console.log(updateObj);
    res.status(200).json(updateObj);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// deletes a job based on id
const deleteJob = async (req, res) => {
  try {
    const _id = req.body._id;
    const deletedJob = await Job.findOneAndDelete({ _id });
    res
      .status(200)
      .json({ message: `Job with id:${_id} was deleted!`, ...deletedJob });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err.message });
  }
};

module.exports = { getJobs, parseJob, addJob, updateJob, deleteJob };
