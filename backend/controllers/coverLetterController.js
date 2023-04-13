const PizZip = require('pizzip');
const DocxTemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const Template = require('../models/templateModel');
const { todaysDateToString } = require('../util/helperMethods');

// creates cover Letter with the job info
const createCoverLetter = async (req, res) => {
  try {
    const { company, position, location } = req.query;
    const { data: buffer } = await Template.findOne();

    const zip = new PizZip(buffer);
    const doc = new DocxTemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      company,
      position,
      location,
      currentDate: todaysDateToString,
    });

    const contentBuffer = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    res.set({
      'Content-Disposition': `attachment; filename=${company} ${position} Cover Letter.docx`,
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    res.send(contentBuffer);
  } catch (err) {
    console.log(err.message);
    res.end();
  }
};

//saves file from multer middleware to mongoDB
const saveTemplateToDb = async (req, res) => {
  try {
    const { originalname, mimetype, encoding, size, buffer } = req.file;
    const templateData = {
      name: originalname,
      mimetype,
      encoding,
      size,
      data: buffer,
    };
    const template = await Template.create(templateData);
    res.status(200).json({ _id: template._id, name: template.name });
  } catch (err) {
    res.json(err.message);
  }
};

module.exports = { createCoverLetter, saveTemplateToDb };
