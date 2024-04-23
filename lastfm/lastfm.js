import fs from 'fs';
import fetch from 'node-fetch';
import { parse } from 'json2csv';

async function fetchAndSaveToFile() {
    const result = [];
    
    let currentPage = 1;
    let totalPages = Infinity;

    const dataDir = './static/data/';
    if (!fs.existsSync(dataDir)){
        fs.mkdirSync(dataDir, { recursive: true });
    }

    while (currentPage <= totalPages) {
        let dataFetched = false;
        let retries = 5; // Max retries
        let data; // Declare data here for wider scope
    
        while (!dataFetched && retries > 0) {
            try {
                const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=creatuluw&api_key=7483643e3ed220fe64c3ba5bb5f28e8b&format=json&page=${currentPage}`);
                data = await response.json(); // Now data is assigned in wider scope
    
                if (!data.recenttracks || !data.recenttracks.track) {
                    if (retries === 1) {
                        console.error(`No track data found at page ${currentPage} after final retry. Skipping to next page.`);
                    } else {
                        console.error(`No track data found at page ${currentPage}, retrying...`);
                    }
                    retries--;
                    continue;
                }
    
                dataFetched = true;
    
                // Flatten and add data to our result if successful
                data.recenttracks.track.forEach(track => {
                    const flattenedTrack = flattenAndProcessTrack(track);
                    result.push(flattenedTrack);
                });
    
            } catch (error) {
                console.error(`Error fetching data for page ${currentPage}: ${error}`);
                retries--;
            }
        }
    
        if (!dataFetched) {
            console.log(`Skipping page ${currentPage} due to repeated failures.`);
        } else {
            // Check and assign totalPages inside the dataFetched block
            // to ensure data is defined and accessible
            if (totalPages === Infinity && data && data.recenttracks['@attr']) {
                totalPages = parseInt(data.recenttracks['@attr'].totalPages, 10);
            }
            const percentageComplete = ((currentPage / totalPages) * 100).toFixed(2);
            console.log(`Page ${currentPage} of ${totalPages} fetched (${percentageComplete}% complete)`);
        }
    
        currentPage++;
    }
    

    fs.writeFileSync(`${dataDir}last_fm_tracks.json`, JSON.stringify(result));

    try {
        const csv = parse(result, { fields: Object.keys(result[0] || {}) }); // Dynamically extract fields if result isn't empty
        fs.writeFileSync(`${dataDir}last_fm_tracks.csv`, csv);
    } catch (err) {
        console.error('Error converting to CSV:', err);
    }
}

function flattenAndProcessTrack(track) {
    const flattenedTrack = {};
    Object.keys(track).forEach(key => {
        if (key === 'image') {
            track[key].forEach((imageObj, index) => {
                flattenedTrack[`image_${index}`] = imageObj['#text']; // Extract and assign URL directly
            });
        } else if (typeof track[key] === 'object' && track[key] !== null) {
            Object.keys(track[key]).forEach(subKey => {
                flattenedTrack[`${key}_${subKey}`] = track[key][subKey];
            });
        } else {
            flattenedTrack[key] = track[key];
        }
    });
    return flattenedTrack;
}

fetchAndSaveToFile().catch(err => console.log(err));
