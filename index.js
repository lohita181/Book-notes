import express from 'express';
import pg from 'pg';
import axios from 'axios';
const app = express();

const port = 3000;

app.use(express.static('public'))
var books = [{id : 1,title:"verity", author:"Colleen Hover", description:"dfdsfdgd"}]
app.get("/", async(req, res) => {
  const url = await getImage("Verity")
  console.log(url)
  res.render("home.ejs", {image: url, books:books});
})

async function getImage(name) {
  try{
    const response = await axios.get(`https://openlibrary.org/search.json?title=${name}`);
    const docs = response.data.docs;
    if (docs && docs.length > 0) {
      const coverId = docs[0].cover_i;
      if(coverId){
        const coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
        return coverUrl
      }
    }
    console.log("Book cover not found");
    return null;
  } catch (err){
    console.log(err)
  }
}

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});