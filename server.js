const http = require("http");
const app = require("./app");
require('dotenv').config()
const port = 5000

const server = http.createServer(app);

server.listen(process.env.PORT || port, () => {
    console.log(`app is running at port ${process.env.PORT}`);
});
