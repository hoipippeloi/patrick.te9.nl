import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'json2csv';

async function fetchAndSaveToFile() {
    const result = [];
    
    let currentPage = 1;
    let totalPages = Infinity;

    const dataDir = './static/data/';
    // Check if the directory exists, if not, create it
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir, { recursive: true });
    }

    while (currentPage <= totalPages) {
        const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=creatuluw&api_key=7483643e3ed220fe64c3ba5bb5f28e8b&format=json&page=${currentPage}`);
        const data = await response.json();

        if (!data.recenttracks || !data.recenttracks.track) {
            console.error(`No track data found at page ${currentPage}.`);
            break; // Exit the loop if data structure is not as expected
        }

        // Add data to our result
        result.push(...data.recenttracks.track);

        // Update total pages if it's not fixed yet
        if (totalPages === Infinity) {
            totalPages = parseInt(data.recenttracks['@attr'].totalPages, 10);
        }

        // Calculate percentage
        const percentageComplete = ((currentPage / totalPages) * 100).toFixed(2);
        console.log(`Page ${currentPage} of ${totalPages} fetched (${percentageComplete}% complete)`);

        // Increment current page
        currentPage += 1;
    }

    // Write JSON file
    fs.writeFileSync(`${dataDir}last_fm_tracks.json`, JSON.stringify(result, null, 2));

    // Convert to CSV
    try {
        const csv = parse(result, {fields: ['artist.#text', 'album.#text', 'name', 'date.uts'], defaultValue: "No Data"});
        fs.writeFileSync(`${dataDir}last_fm_tracks.csv`, csv);
    } catch (err) {
        console.error('Error converting to CSV:', err);
    }
}

fetchAndSaveToFile().catch(err => console.log(err));
