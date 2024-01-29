const express = require('express');
const qr = require('qrcode');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { qrcode: '' });
});

app.post('/', (req, res) => {
  const url = req.body.url;
  if (url) {
    qr.toDataURL(url, (err, src) => {
      if (err) throw err;
      var file = 'static/' + Date.now() + '.png';
      qr.toFile(file, url, {
        color: {
          dark: '#000',
          light: '#0000',
        },
      });
      res.render('index', { qrcode: src, img: file });
    });
  } else {
    res.send('no url');
  }
});

app.get('/download', (req, res) => {
  res.download(req.query.path);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
