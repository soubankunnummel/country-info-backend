import { Router } from "express";
import { countryController } from "../controllers/countryController";
import {cacheHandler} from '../middleware/cache'


const route = Router()


route.get('/countries', cacheHandler, countryController.getAllCountries)
route.get('/countrie/:code', cacheHandler, countryController.getCountriesByCode);
// route.get('/countries/region/:region', cacheHandler, countryController.getCountriesByRegion);
// route.get('/countries/capital/:capital', cacheHandler, countryController.getCountriesCapital);
route.get('/countries/search', cacheHandler, countryController.searchCountries);

export default route;
