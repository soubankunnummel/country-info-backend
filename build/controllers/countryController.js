import { countryService } from "../services/countryService";
export class CountryController {
    async getAllCountries(req, res, next) {
        try {
            const countries = await countryService.getAllCountries();
            console.log(` qqqall`, countries);
            return res.json(countries);
        }
        catch (error) {
            next(error);
        }
    }
    async getCountriesByCode(req, res, next) {
        try {
            const country = await countryService.getCountriesByCode(req.params.code);
            res.json(country);
        }
        catch (error) {
            next(error);
        }
    }
    async getCountriesByRegion(req, res, next) {
        try {
            const countries = await countryService.getCountriesByRegion(req.params.region);
            res.json(countries);
        }
        catch (error) {
            next(error);
        }
    }
    async searchCountries(req, res, next) {
        try {
            const searchParams = {
                name: req.query.name,
                capital: req.query.capital,
                region: req.query.region,
                timezone: req.query.timezone,
            };
            const countries = await countryService.searchCountries(searchParams);
            res.json(countries);
        }
        catch (error) {
            next(error);
        }
    }
}
export const countryController = new CountryController();
