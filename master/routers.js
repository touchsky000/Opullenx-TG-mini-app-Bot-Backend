var fs = require("fs");
var routers;
try {
   routers = fs.readdirSync('routers');
} catch (err) {
    routers = [];
    console.log(err.message);
}

module.exports = routers.map(router => router.split(".")[0]);
