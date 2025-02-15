import axios from "axios";
import { config } from "../config/config";
import { ApiError } from "../utils/apiError";
export class CountryService {
    baseUrl = config.restCountriesApi;
    async getAllCountries() {
        try {
            const { data } = await axios.get(`${this.baseUrl}/all`);
            console.log(`${this.baseUrl}/all`, data);
            return data;
        }
        catch (error) {
            throw new ApiError(500, "Erro fetching countries..");
        }
    }
    async getCountriesByCode(code) {
        try {
            const { data } = await axios.get(`${this.baseUrl}/alpha/${code}`);
            if (!data.length) {
                throw new ApiError(404, "Country not found..");
            }
            return data[0];
        }
        catch (error) {
            throw new ApiError(500, "Erro fetching country by code..");
        }
    }
    async getCountriesByRegion(region) {
        try {
            const { data } = await axios.get(`${this.baseUrl}/region/${region}`);
            return data;
        }
        catch (error) {
            throw new ApiError(500, "Error fetching countries by region");
        }
    }
    async searchCountries(param) {
        try {
            const allCountries = await this.getAllCountries();
            return allCountries.filter((country) => {
                const matchsName = !param.name ||
                    country.name.common.toLowerCase().includes(param.name.toLowerCase());
                const matchesCapital = !param.capital ||
                    country.capital?.some((c) => c.toLowerCase().includes(param.capital.toLowerCase()));
                const matchesRegion = !param.region ||
                    country.region.toLowerCase() === param.region.toLowerCase();
                const matchesTimezone = !param.timezone || country.timezones.includes(param.timezone);
                return matchsName && matchesCapital && matchesRegion && matchesTimezone;
            });
        }
        catch (error) {
            throw new ApiError(500, "Error searching countries");
        }
    }
}
export const countryService = new CountryService();
