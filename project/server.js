const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const urlencodedParser = express.urlencoded({extended: false});
const port = 5000;

app.use((req, res, next) => {
    console.log(`Request_Endpoint: ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());


// типо данные в БД
let issues = [
    {id: 1, name: "Информатика", start: "2022-05-01T10:10", end: "2022-05-01T:12:30"},
    {id: 2, name: "Веб-программирование", start: "2022-05-02T10:10", end: "2022-05-02T:12:30"},
    {id: 3, name: "Физкультура", start: "2022-05-02T13:00", end: "2022-05-02T:15:30"},
    {id: 4, name: "Веб-программирование", start: "2022-05-06T10:10", end: "2022-05-06T:14:30"},
    {id: 5, name: "Математика", start: "2022-07-01T10:10", end: "2022-05-07T:12:30"},
];

app.get("/api/issues", (req, resp) => {
    resp.json(issues);
});

app.post("/api/issues/new", urlencodedParser, (req, resp) => {
    // sort by id
    issues.sort((a, b) => {
        return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
    });
    // new object
    let newId = issues[issues.length - 1].id + 1;
    let obj = {
        id: newId,
        ...req.body,
    };
    issues.push(obj);
    resp.json(obj);
});

app.post("/api/issues/edit", urlencodedParser, (req, resp) => {
    // find and edit
    let ind = issues.findIndex(el => el.id === Number(req.body.id));
    issues[ind] = {
        ...req.body,
        id: Number(req.body.id),
    };
    resp.json(req.body);
});

app.post("/api/issues/delete", urlencodedParser, (req, resp) => {
    // find and delete
    let ind = issues.findIndex(el => el.id === Number(req.body.id));
    issues.splice(ind, 1);
    resp.send(200);
});




app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`));