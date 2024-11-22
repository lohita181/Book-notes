import express from 'express';
const app = express();

const port = 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("home.ejs", {images: images})
});

app.get('/form', (req, res) => {
  res.render("create.ejs")
})

app.post('/create', upload.single('image'), (req, res) => {
  console.log(req.file, req.body)
  const imagePath = `/images/${req.file.filename}`;
  const caption = req.body.caption;
  images.push({path: imagePath, caption: caption})
  console.log(images)
  //res.render("home.ejs", {images: images});
  res.redirect("/")
})

app.post('/edit', (req, res) => {
  const {imagePath, newCaption} = req.body;

  images = images.map(image => {
    if (image.path === imagePath){
      return {path: imagePath, caption: newCaption}
    }
    return image
  })
  res.status(200).json({message:"Iamge updated successfully"})
})

app.post('/delete', (req, res) => {
  const {imagePath} = req.body;
  images = images.filter(image => image.path!==imagePath);
  const imageFilePath = `public${imagePath}`;
  

    // Send success response after deletion
    res.sendStatus(200)

})
app.listen(port, () => {
  console.log(images);
});