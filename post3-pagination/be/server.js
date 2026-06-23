const express=require('express');
const axios=require('axios');
const cors=require('cors')
const app=express();
const PORT=8000;

app.use(cors({
    exposedHeaders: ['Content-Length']  
}));

app.get('/',(req,res)=>{
    axios.get("http://www.omdbapi.com/?i=tt3896198&apikey=bbc0cf70&s=space&type=movie&page=2")
        .then(response => {
            res.json(response.data);
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching data from OMDB API:', error);
            res.status(500).json({ error: 'Failed to fetch data' });
        });
    })

app.get('/movies/bulk',async(req,res)=>{
    
    try{
        const pagesToFetch = Array.from({ length: 10 }, (_, i) => i + 1);
        
        
        const fetchPromises = pagesToFetch.map(page => 
        axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=bbc0cf70&s=space&type=movie&page=${page}`)
    );
    const responses = await Promise.all(fetchPromises);
    const bulkMovies = responses.flatMap(response => {
      return response.data.Search || [];
    });
    res.json(bulkMovies);
  }
catch (error) {
    console.error("Bulk fetch pipeline collapsed:", error);
    res.status(500).json({ error: "Failed to assemble the bulk payload stack." });
  }
});


app.get('/movies/retropagination',async(req,res)=>{
    const page = req.query.page || 1;
    axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=bbc0cf70&s=space&type=movie&page=${page}`)
    .then(response => {
        res.json(response.data.Search);
        console.log(page)
        console.log(response.data)
        return response.data.Search
    })
    .catch(error => {
        console.error("Error fetching retro pagination data:", error);
        res.status(500).json({ error: "Failed to fetch retro pagination data." });
    });
}
)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})