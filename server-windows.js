var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("../Pro_AngularJS"));
app.listen(5000);