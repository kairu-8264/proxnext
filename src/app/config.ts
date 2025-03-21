import fs from 'fs';
import path from 'path';

interface Config {
    host: string;
    port: number;
    custom_headers?: { [key: string]: string };
}

export function getConfig(): Config {
    const configPath = path.resolve('config.json');
    let config: Config;

    try {
        const configFile = fs.readFileSync(configPath, 'utf-8');
        config = JSON.parse(configFile);
    } catch (error) {
        console.error('Error reading config file:', error);
        config = { host: 'pve', port: 8006 };
    }

    return config;
}
