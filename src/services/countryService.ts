import axios from "axios";
import { config } from "../config/config";
import { Country, CountrySearchParams } from "../interfaces/country.interface";
import { ApiError } from "../utils/apiError";

export class CountryService {
  private baseUrl = config.restCountriesApi;

  async getAllCountries(): Promise<Country[]> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/all`);
      return data; 
    } catch (error) {
      throw new ApiError(500, "Erro fetching countries..");
    } 
  }

  async getCountriesByCode(code: string): Promise<Country> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/alpha/${code}`);

      if (!data.length) {
        throw new ApiError(404, "Country not found..");
      }
      return data[0];
    } catch (error) {
      throw new ApiError(500, "Erro fetching country by code..");
    }
  }
  async getCountriesByCapital(capital: string): Promise<Country> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/capital/${capital}`);

      if (!data.length) {
        throw new ApiError(404, "Country not found..");
      }
      return data[0];
    } catch (error) {
      throw new ApiError(500, "Erro fetching country by capital..");
    }
  }

  async getCountriesByRegion(region: string): Promise<Country[]> {
    try {
      const { data } = await axios.get(`${this.baseUrl}/region/${region}`);
      return data;
    } catch (error) {
      throw new ApiError(500, "Error fetching countries by region");
    }
  }

  async searchCountries(param: CountrySearchParams): Promise<Country[]> {
    try {
      let results: Country[] = [];
  
      // Search by name (if provided)
      if (param.name) {
        const { data } = await axios.get(`${this.baseUrl}/name/${param.name}`);
        results = data;
      }
  
      // Search by capital (if provided)
      if (param.capital) {
        const { data } = await axios.get(`${this.baseUrl}/capital/${param.capital}`);
        results = results.length
          ? results.filter((country) =>
              data.some((c: Country) => c.cca2 === country.cca2)
            )
          : data;
      }
  
      // Search by region (if provided)
      if (param.region) {
        const { data } = await axios.get(`${this.baseUrl}/region/${param.region}`);
        results = results.length
          ? results.filter((country) =>
              data.some((c: Country) => c.cca2 === country.cca2)
            )
          : data;
      }
  
      // Search by timezone (if provided)
      if (param.timezone) {
        const allCountries = await this.getAllCountries();
        const timezoneResults = allCountries.filter((country) =>
          country.timezones.includes(param.timezone!)
        );
        results = results.length
          ? results.filter((country) =>
              timezoneResults.some((c) => c.cca2 === country.cca2)
            )
          : timezoneResults;
      }
  
      // If no search parameters are provided, return all countries
      if (!param.name && !param.capital && !param.region && !param.timezone) {
        results = await this.getAllCountries();
      }
  
      // Remove duplicates (if multiple search parameters are used)
      const uniqueResults = Array.from(new Set(results.map((c) => c.cca2))).map(
        (cca2) => results.find((c) => c.cca2 === cca2)!
      );
  
      return uniqueResults;
    } catch (error) {
      throw new ApiError(500, "Error searching countries");
    }
  }
}


export const countryService  = new CountryService();