const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Roasting logic
const roastDatabase = [];

const getRoasting = (merk, chipset, ram, battery, camera) => {
    const praises = [
        `Behhh, ${merk} ini keren banget, Yee! 🥳`,
        `Wih, ${merk} ini kayak mobil balap! 😏`,
        `Kayaknya ${merk} ini buat para sultan beneran, ya? 🤩`,
        `Wow, ${merk} pake chipset ${chipset}, pasti ngebut! 🚀`
    ];

    const weaknesses = [
        `Tapi baterai ${battery}mAh-nya? Pasti 5 menit langsung abis! 😂🤡`,
        `RAM ${ram} doang? Gak ada harapan buat multitasking, dasar hp kentang! 😂`,
        `Kamera ${camera}MP? Malam hari hasilnya kaya CCTV, gelap gulita! 🤦‍♂️`,
        `Chipset ${chipset} sih bagus, tapi harga segitu? Lu beli hape atau beban hidup? 🤑`,
        `Pake RAM ${ram}? Udah pasti buat scrolling IG doang, nyangkut-nyangkut! 🤣`,
        `Kalo ${merk} ini tahan lama, mending jadi pajangan di lemari aja! 😂`
    ];

    // Generate a unique roast
    let roast;
    do {
        const praise = praises[Math.floor(Math.random() * praises.length)];
        const weakness = weaknesses[Math.floor(Math.random() * weaknesses.length)];
        roast = `${praise} ${weakness}`;
    } while (roastDatabase.includes(roast)); // Ensure uniqueness

    roastDatabase.push(roast); // Store the roast to prevent duplicates
    return roast;
};

app.get('/', (req, res) => {
    res.render('index', { roast: null });
});

app.post('/roast', (req, res) => {
    const { merk, chipset, ram, battery, camera } = req.body;

    // Generate roasting based on the input
    const roast = getRoasting(merk, chipset, ram, battery, camera);

    // Return the roast without changing the page
    res.json({ roast });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
