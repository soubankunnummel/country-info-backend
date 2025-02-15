import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || 'development',
    restCountriesApi: 'https://restcountries.com/v3.1',
    cacheTimeout: 3600,
};
// cache 1 hour in seconds
