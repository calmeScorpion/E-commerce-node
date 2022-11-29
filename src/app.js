const express = require('express');
const bodyPraser = require('body-parser');
const path = require('path');

const appDirName = require('./utils/path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

app.use(bodyPraser.urlencoded({ extended: false }));

//setup template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(appDirName, 'views'));

app.use(express.static(path.resolve(appDirName, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.sendFile(path.resolve(__dirname, 'views', '404.html'));
  res.render('404', {
    pagetitle: 'page not found',
    h1content: '404',
    activelink: '404',
  });
});

app.listen(7000, () => {
  console.log('App running...');
});
