const express = require('express');
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const PORT = process.env.PORT || 5000
const cors = require('cors')
app.use(cors({
    origin: "http://localhost:3000"
}))
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/uploaded', upload.array("files"), uploadFiles)
function uploadFiles(req, res) {
  console.log(req.body.files[0]);
  console.log(req.files[0]);
  //console.log(file.name);
  res.json({ message: "Successfully uploaded files" });
  res.send(req.body)
}
app.listen(PORT, (err) => {
    console.log(`App listening on port ${PORT}!`)
});