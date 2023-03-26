const puppeteer = require('puppeteer');
const Job = require('../models/jobModel');
const { todaysDateToString } = require('../util/helperMethods');

const parseJob = async (req, res) => {
  try {
    const encodedUrl = req.params.encodedUrl;
    const url = decodeURIComponent(encodedUrl);
    console.log(url); // debugging
    // setup puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
    ); // need this line for it to work in headless mode
    await page.goto(`${url}`);

    console.log('page loaded!'); // debugging
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
        )} from ${todaysDateToString()}`
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
    res.json(err.message);
    process.exit(1);
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

const addJob = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const resData = await Job.create(data);
    res.status(200).json(resData);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

module.exports = { getJobs, parseJob, addJob };
