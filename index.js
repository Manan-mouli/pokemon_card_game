import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const port = 3000;
var pokemons = " ";
const __dirname = dirname(fileURLToPath(import.meta.url));
var randomCards1 = "";
var randomCards2 = "";
var score1 = 0 ;
var score2 = 0;





app.use(bodyParser.urlencoded({ extended: true }));

//getting all the pokemon cards
app.get("/",(req,res)=>{
    res.render("slash.ejs");
});
app.get("/index",(req,res)=>{
    res.render("index.ejs");
})
app.get("/game",async(req,res)=>{
    //changing the card set range
    const hp_range = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150];
    var rand = hp_range[Math.floor(Math.random () * hp_range.length)];
    //accessing cards
    const result  = await axios.get(`https://api.pokemontcg.io/v2/cards?q=hp:[${rand} TO *]`);
    pokemons = result.data.data;
    //made two set of cards 
    randomCards1 = cardset1(pokemons);//ai
    randomCards2 = cardset2(pokemons);//player
    //accessing the 10 cards pic 
    const imglink1 = randomCards2[0].images.small;
    const imglink2 = randomCards2[1].images.small;
    const imglink3 = randomCards2[2].images.small;
    const imglink4 = randomCards2[3].images.small;
    const imglink5 = randomCards2[4].images.small;
    const imglink6 = randomCards2[5].images.small;
    const imglink7 = randomCards2[6].images.small;
    const imglink8 = randomCards2[7].images.small;
    const imglink9 = randomCards2[8].images.small;
    const imglink10 = randomCards2[9].images.small;

    res.render("image.ejs",{images1: imglink1 , images2: imglink2 ,images3: imglink3 ,images4: imglink4,images5: imglink5,images6: imglink6,images7: imglink7,images8: imglink8,images9: imglink9,images10: imglink10});
    game_logic(randomCards1,randomCards2);
});

//game logic initially a funtion but then soon will change it 
function game_logic(randomCards1,randomCards2){
    const c1 = randomCards1[0];
    const c2 = randomCards2[9];

    //hp fetch
    const hp1 = c1.hp;
    const hp2 = c2.hp;
    
    if(hp1>hp2){
        score1 +=1;
        console.log(`${c1.name} wins ${score1 }`);
        if(hp1 == 10){
            console.log("game over")
            console.log("bot win")
        }
    }
    else if(hp2>hp1){
        score2 +=1
        console.log(`${c2.name} wins ${score2}`);
        if(hp2 == 10){
            console.log("game over")
            console.log("you win")
        }
    }
    else{
        console.log("draw");
        score1 +=1;
        score2 +=1;
        if(hp2 == 10){
            console.log("game over")
            console.log("you win")
        }
        if(hp1 == 10){
            console.log("game over")
            console.log("bot win")
        }
    }
    
    
    
}




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

