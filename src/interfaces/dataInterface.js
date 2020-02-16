export default class WeatherData {
    constructor(model) {
        this.coord = model.coord;
        this.weather = model.weather;
        this.base = model.base;
        this.main = model.main;
        this.visibility = model.visibility;
        this.wind = model.wind;
        this.clouds = model.clouds;
        this.dt = model.dt;
        this.sys = model.sys;
        this.timezone = model.timezone;
        this.id = model.id;
        this.name = model.name;
        this.cod = model.cod;
    }

}
