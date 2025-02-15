import { Request, Response, NextFunction } from "express";
import { countryService } from "../services/countryService";
import { CountrySearchParams } from "../interfaces/country.interface";

export class CountryController {
  async getAllCountries(req: Request | any, res: Response | any, next: NextFunction | any) {
    try {
      const countries = await countryService.getAllCountries();
      return res.json(countries);
    } catch (error) {
      next(error);
    }
  }

  async getCountriesByCode(req: Request, res: Response, next: NextFunction) {
    try {
      const country = await countryService.getCountriesByCode(req.params.code);
      res.json(country);
    } catch (error) {
      next(error);
    } 
  }
  // async getCountriesCapital(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const country = await countryService.getCountriesByCapital(req.params.capital);
  //     res.json(country);
  //   } catch (error) {
  //     next(error);
  //   } 
  // }

  // async getCountriesByRegion(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const countries = await countryService.getCountriesByRegion(
  //       req.params.region
  //     );
  //     res.json(countries);  
  //   } catch (error) {
  //     next(error); 
  //   }
  // }

  async searchCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const searchParams: CountrySearchParams = {
        name: req.query.name as string,
        capital: req.query.capital as string,
        region: req.query.region as string,
        timezone: req.query.timezone as string,
      };

      console.log("params", req)
      const countries = await countryService.searchCountries(searchParams);
      res.json(countries);
    } catch (error) {
      next(error);
    }
  }
}

export const countryController = new CountryController();
