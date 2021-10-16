const express = require("express");
const fs = require("fs");
const util = require("util");

const fileRead = util.promisify(fs.readFile);
const fileWrite = util.promisify(fs.writeFile);

module.exports = function (app) {
    app.get("/api/notes", function (req, res) {
        (fileRead("./Develop/db/debugger.json", "utf8"))
        .then(listNotes => {
            res.json(JSON.parse(listNotes))
        })
        .catch(err => console.log(err))
    });

    app.post("./api/notes", async function (req, res) {
        let writeNew = req.body;
        let numb = Math.floor(Math.random() * 100 +1);

        let nPr = numb.toString();
        let prop = {"id": nPr}
        let nObj = [{"title": req.body.title, "text": req.body.text, ...prop}]
        let nString = await fileRead("./db/db.json", "utf8");

        let notes = JSON.parse(nString);

        notes.push(nObj[0])
        let nNote = JSON.stringify(notes)
        
        await fileWrite("./db/db.json", nNote, "utf8");

        res.json(nNote);
    });

    app.delete("./api/notes/:id", async function (req, res) {
        let noteId = req.params.id;
        let allStr = await fileRead("./db/db.json", "utf8");

        let notes = JSON.parse(allStr);

        dNote = notes.filter(dnote => {
            return dnote.id !== noteId;
        });

        let nNote = JSON.stringify(dNote)


        await fileWrite("./db/db.json", nNote, "utf8");

        res.send("Disapearroo'd!");
    })

}