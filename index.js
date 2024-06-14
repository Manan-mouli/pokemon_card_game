import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const port = 3000;
var pokemons = " ";
const __dirname = dirname(fileURLToPath(import.meta.url));


app.use(bodyParser.urlencoded({ extended: true }));

//getting all the pokemon cards
app.get("/",(req,res)=>{
    res.render("slash.ejs");
});
app.get("/index",(req,res)=>{
    res.render("index.ejs");
})
app.get("/game",async(req,res)=>{
    const result  = await axios.get(`https://api.pokemontcg.io/v2/cards`);
    pokemons = result.data.data;
    const randomCards1 = cardset1(pokemons);
    const randomCards2 = cardset2(pokemons);
    console.log(randomCards1[0].hp);
    console.log(randomCards2[0].hp);
    const imglink1 = randomCards1[0].images.small;
    const imglink2 = randomCards2[0].images.small;
    console.log(imglink1);
    res.render("image.ejs",{images1: imglink1 , images2: imglink2});
});

//random 20 cards from 250 it will pass into ejs the data of the pokemon
function cardset1(list){
    const card_set = [];
    const totalCards = 250;  // Total number of cards to consider
    const numCards = 20;     // Number of random cards to select
    
    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        card_set.push(list[randomIndex]);
        
    }
    
    return card_set;
}
function cardset2(list){
    const card_set1 = [];
    const totalCards = 250;  // Total number of cards to consider
    const numCards = 20;     // Number of random cards to select
    
    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        card_set1.push(list[randomIndex]);
    }
    
    return card_set1;
}


//checking if the variable is empty or not 



app.listen(port,()=>{
    console.log(`Running in port : ${port}`);
})

