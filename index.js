const express = require("express");
const { google } = require("googleapis");
const csv = require("csvtojson");
var cors = require('cors')
const app = express();

app.use(cors())

app.get("/", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const data = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId: sheetId
    });
    const booksRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Our Books"
    })
    const sageRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Sage"
    })
    const simonSchusterRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Simon Schuster"
    })
    const genreRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Genre List"
    })
    let booksRowsToJson = _convertOutputToJson(booksRows)
    let genreRowsToJson = _convertOutputToJson(genreRows)
    let sageRowsToJson = _convertOutputToJson(sageRows)
    let simonSchusterRowsToJson = _convertOutputToJson(simonSchusterRows)
    res.send({ products: {books: booksRowsToJson, sage: sageRowsToJson, simon: simonSchusterRowsToJson}, genre: genreRowsToJson });
});

function _convertOutputToJson(rows){
    let data = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        data.push(rowObject);
    }
    return data
}

app.get("/slider", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";
    
    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Slider Management"
    })

    let genreRowsToJson = [];
    // rows.data.values.map((_, i) => {
    //     genreRowsToJson.push(_[0]);
    // })
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        genreRowsToJson.push(rowObject);
    }
    res.send(genreRowsToJson);
});
app.get("/new-release", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "New Releases Block"
    })

    let rowsToJson = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        rowsToJson.push(rowObject);
    }
    res.send({ products: rowsToJson });
});

app.get("/blogs", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Blog"
    })

    let rowsToJson = []
    for (var i = 1; i < rows.data.values.length; i++) {
        var rowObject = {};
        for (var j = 0; j < rows.data.values[i].length; j++) {
            rowObject[rows.data.values[0][j]] = rows.data.values[i][j];
        }
        rowsToJson.push(rowObject);
    }
    res.send({ products: rowsToJson });
});

app.get("/workshops", async(req, res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "cred.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });

    const client = await auth.getClient();
    const googleSheets = google.sheets({ version: "v4", auth: client });

    const sheetId = "1HczFhP-EvCvH5fr4fPXvCO-PTiWIt5hTfhhFXbrlwfo";

    const rows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId: sheetId,
        range: "Workshops"
    })

    let workshopToJson = _convertOutputToJson(rows)
    res.send({ workshops: workshopToJson });
});

app.listen(process.env.PORT || 3000, (req, res) => console.log("Server is live on 3000"));