import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
var pokemons = " ";


app.use(bodyParser.urlencoded({ extended: true }));

//getting all the pokemon cards
async function getdata(){
    const res = await axios.get(`https://api.pokemontcg.io/v2/cards`);
    pokemons = res.data.data;
    const randomCards1 = cardset1(pokemons);
    const randomCards2 = cardset2(pokemons);
};

//random 20 cards from 250 it will pass into ejs the data of the pokemon
function cardset1(list){
    const cardset = [];
    const totalCards = 250;  // Total number of cards to consider
    const numCards = 20;     // Number of random cards to select
    
    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        cardset.push(list[randomIndex]);
        console.log(list[randomIndex].set.total);
    }
    
    return cardset;
}
function cardset2(list){
    const cardset1 = [];
    const totalCards = 250;  // Total number of cards to consider
    const numCards = 20;     // Number of random cards to select
    
    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        cardset1.push(list[randomIndex]);
    }
    
    return cardset1;
}


//checking if the variable is empty or not 
if (pokemons == " "){
     getdata();
}
else{
    console.log("Data_fatched");
}


app.listen(port,()=>{
    console.log(`Running in port : ${port}`);
})

