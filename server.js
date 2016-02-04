var connect = require('connect'),
    serveStatic = require('serve-static');

var app = connect();

app.use(serveStatic("/Users/yaweili/git/Pro_AngularJS"));
app.listen(5000);