const fetchData = (callback) => {
    try {
        fetch("https://api-one-pied.vercel.app/api/v1/restaurants")
            .then((response) => response.json())
            .then((data) => {
                callback(data.places)
            
            })
    } catch (error) {
        console.log(error)
    }
}

export { fetchData }




// import puppeteer from "puppeteer";
// import fs from "fs";

// async function parsePlaces(page) {
//     let places = [];

//     const elements = await page.$$(".fontHeadlineSmall");
//     for (let element of elements) {
//         const name = await element.evaluate(span => span.textContent);
//         places.push({name});
//     }

//     return places;
// }

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
    
    
//     await page.goto("https://www.google.com/maps/search/restaurants/@-7.8529023,112.5003032,11.25z?entry=ttu");
//     await page.screenshot({ path: "example.png" });

//     const places = await parsePlaces(page);
//     console.log(places);
//     await browser.close();

//     const data = fs.readFileSync("data.json");
//     let json;
//     try {
//         const data = fs.readFileSync("data.json");
//         json = JSON.parse(data);
//     } catch (error) {
//         console.error('Error reading or parsing data.json:', error);
//         json = [];
//     }

//     json.push(...places);

//     const newData = JSON.stringify(json, null, 2);
//     fs.writeFile('data.json', newData, 'utf8', () => console.log('Data saved'));
// })();