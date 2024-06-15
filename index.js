import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
let pokemons = "";
let randomCards1 = "";
let randomCards2 = "";
let score1 = 0;
let score2 = 0;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("slash");
});

app.get("/game", async (req, res) => {
    try {
        const hp_range = [90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150];
        const rand = hp_range[Math.floor(Math.random() * hp_range.length)];

        const result = await axios.get(`https://api.pokemontcg.io/v2/cards?q=hp:[${rand} TO *]`);
        pokemons = result.data.data;

        randomCards1 = cardset1(pokemons);
        randomCards2 = cardset2(pokemons);

        const images = randomCards2.slice(0, 10).map(card => card.images.small);
        const aiImages = randomCards1.slice(0, 10).map(card => card.images.small);
        const playerScores = randomCards2.slice(0, 10).map(card => card.hp);
        const aiScores = randomCards1.slice(0, 10).map(card => card.hp);

        res.render("image", {
            images,
            aiImages,
            playerScores,
            aiScores
        });
    } catch (error) {
        console.error("Error fetching Pokémon cards:", error);
        res.status(500).send("An error occurred while fetching Pokémon cards.");
    }
});

function cardset1(list) {
    const card_set = [];
    const totalCards = list.length;
    const numCards = 20;

    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        card_set.push(list[randomIndex]);
    }

    return card_set;
}

function cardset2(list) {
    const card_set1 = [];
    const totalCards = list.length;
    const numCards = 20;

    for (let i = 0; i < numCards; i++) {
        const randomIndex = Math.floor(Math.random() * totalCards);
        card_set1.push(list[randomIndex]);
    }

    return card_set1;
}

app.listen(port, () => {
    console.log(`Running on port: ${port}`);
});
