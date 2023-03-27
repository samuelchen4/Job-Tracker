const PizZip = require('pizzip');
const DocxTemplater = require('docxtemplater');

const fs = require('fs');
const path = require('path');

// creates cover Letter with the job info
const createCoverLetter = () => {
  try {
    // for now, store a template cover letter in data
    // later I will convert the template into binary and store it in db
    const content = fs.readFileSync(
      path.resolve('./backend/data', 'Template Cover Letter.docx'),
      'binary'
    ); // read the cover letter template

    const zip = new PizZip(content);
    const doc = new DocxTemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render({
      company: 'company_name',
      position: 'Ceo of Swag',
      location: 'Sidney, BC',
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    fs.writeFileSync(path.resolve('./backend/data', 'testing.pdf'), buf);
  } catch (err) {
    console.log(err);
  }
};

createCoverLetter();
