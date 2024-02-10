import express from "express";
import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const app = express();
const port = 3000;
const upload = multer({ dest: "./public/uploads/" });

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/form.html", upload.single("myfile"), (req, res) => {
  console.log(req.file);

  console.log(req.body);

  if (req.file) {
    const { filename, destination, originalname } = req.file;
    const src = path.resolve(`${destination}${filename}`);
    const dst = path.resolve(`${destination}${originalname}`);
    fs.renameSync(src, dst);
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        form.html
    
        <div><img src="uploads/${originalname}" /></div>
        <pre>
${JSON.stringify(req.body, null, 2)}
        </pre>
    </body>
    </html>`;
    res.send(html);
  } else {
    res.json(req.body);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
