const express = require("express");
const app = express();
const path = __dirname + '/build/';
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const si = require('systeminformation');
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const port = 5000;

var diskLayoutData = new Array;
var cpuCurrentSpeed = new Array;
var fsSize = new Array;
var usedSize = 0;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path));

app.get('/', function (req, res) {
    res.sendFile(path + "index.html");
});

app.get('/api/hardtest', async (_req, _res) => {
    await (async () => {
        diskLayoutData = await si.diskLayout();
        cpuCurrentSpeed = await si.cpuCurrentSpeed();
        fsSize = await si.fsSize();

        fsSize.forEach(element => {
            usedSize = parseInt(usedSize) + parseInt(element.used);
        });
    })()

    const diskLayout = {
        name: diskLayoutData[0].name,
        type: diskLayoutData[0].type,
        vendor: diskLayoutData[0].vendor,
        serialNum: diskLayoutData[0].serialNum,
        totalSize: Math.round(diskLayoutData[0].size / (1024 * 1024 * 1024)),
        usedSize: Math.round(usedSize / (1024 * 1024 * 1024)),
        smartStatus: diskLayoutData[0].smartStatus,
        temperature: diskLayoutData[0].temperature,
        firmwareRevision: diskLayoutData[0].firmwareRevision,
        interfaceType: diskLayoutData[0].interfaceType,
        cpuCurrentSpeed: cpuCurrentSpeed.avg
    };
    console.log("diskLayout", diskLayout);
    _res.json(diskLayout);
})

app.listen(port, () => console.log(`|o| yupiii!! your node api seed is now listening on port ${port}`));
