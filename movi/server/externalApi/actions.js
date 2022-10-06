/**
 * This file contains implementation of an interface for 
 * interacting with external movie database APIs.
 * 
 * For now, the only external API is WatchMode. Files outside
 * of this folder should not perform queries of external APIs.
 */

import dotenv from 'dotenv';
dotenv.config({path: __dirname + '/../.env'});
import { fetch } from 'node-fetch';
let watchmodeKey = process.env.WATCHMODE_API_KEY;

fetch(url, { method: 'Get' })
    .then((res) => res.json())
    .then((json) => {
        return json
    });

export const searchByTitle = (title_string) => {
    // Check if already in database

    query = title_string.replace(" ", "%20") // replace spaces with %20
    let queryUrl = `https://api.watchmode.com/v1/search/?apiKey=${watchmodeKey}&search_field=name&search_value=${query}`;
    let json = fetch(queryUrl);

    if (res.success == false) {
        
    }
    // TODO (ryan) finish this by fetching the data from watchmode and creating new entries in database for the title
}