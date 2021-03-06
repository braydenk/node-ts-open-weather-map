'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const url_1 = require("url");
var OpenWeatherMapApiDataType;
(function (OpenWeatherMapApiDataType) {
    OpenWeatherMapApiDataType["Weather"] = "weather";
    OpenWeatherMapApiDataType["Forecast"] = "forecast";
})(OpenWeatherMapApiDataType || (OpenWeatherMapApiDataType = {}));
var OpenWeatherMapApiUnits;
(function (OpenWeatherMapApiUnits) {
    OpenWeatherMapApiUnits["Fahrenheit"] = "imperial";
    OpenWeatherMapApiUnits["Celsius"] = "metric";
})(OpenWeatherMapApiUnits = exports.OpenWeatherMapApiUnits || (exports.OpenWeatherMapApiUnits = {}));
const BASE_URL = 'https://api.openweathermap.org/';
const DEFAULT_API_VERSION = '2.5';
const DEFAULT_UNIT = OpenWeatherMapApiUnits.Celsius;
class OpenWeatherMapApi {
    constructor(options = {
        apiVersion: DEFAULT_API_VERSION,
        key: '',
        temperatureUnit: DEFAULT_UNIT
    }) {
        if (!options.key.length) {
            throw new Error('Invalid option key!');
        }
        this.options = options;
        this.options.apiVersion = this.options.apiVersion || DEFAULT_API_VERSION;
        this.options.temperatureUnit = this.options.temperatureUnit || DEFAULT_UNIT;
    }
    async byCityName(queryOpts) {
        try {
            const params = new url_1.URLSearchParams({
                q: [queryOpts.name, queryOpts.countryCode].join(),
                units: this.options.temperatureUnit
            });
            const url = this.getBaseUrl(OpenWeatherMapApiDataType.Weather) +
                '&' +
                params.toString();
            const { data } = await axios_1.default.get(url);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    async forecastByCityName(queryOpts) {
        try {
            const params = new url_1.URLSearchParams({
                q: [queryOpts.name, queryOpts.countryCode].join(),
                units: this.options.temperatureUnit
            });
            const url = this.getBaseUrl(OpenWeatherMapApiDataType.Forecast) +
                '&' +
                params.toString();
            const { data } = await axios_1.default.get(url);
            return data;
        }
        catch (error) {
            throw error;
        }
    }
    getBaseUrl(type) {
        const params = new url_1.URLSearchParams({
            APPID: this.options.key
        });
        return new url_1.URL(`data/${this.options.apiVersion}/${type}?${params.toString()}`, BASE_URL);
    }
}
exports.OpenWeatherMapApi = OpenWeatherMapApi;
//# sourceMappingURL=OpenWeatherMap.js.map