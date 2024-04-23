import fs from 'fs/promises';
import { parse } from 'json2csv';

async function flattenJSONToCSV(inputFilePath, outputFilePath) {
  try {
    const data = await fs.readFile(inputFilePath, 'utf8');
    const json = JSON.parse(data);

    // Transform keys from 'json' to match the desired output, replacing dots with underscores
    const transformed = json.map(item => {
      const transformedItem = {};

      Object.keys(item).forEach(key => {
        const transformedKey = key.replace(/\./g, '_'); // Replace dots with underscores
        transformedItem[transformedKey] = typeof item[key] === 'object' ? item[key]['#text'] : item[key];
      });

      return transformedItem;
    });

    const csv = parse(transformed);
    await fs.writeFile(outputFilePath, csv);
    console.log('CSV file was successfully created.');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

const inputFilePath = './static/data/last_fm_tracks.json';
const outputFilePath = './last_fm_tracks.csv';
flattenJSONToCSV(inputFilePath, outputFilePath);
