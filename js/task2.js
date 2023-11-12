function getTopCities(CSV) {
    let topCities = {};
    /* array of strings by carriage */
    CSV.split("\n")
        /* split the term into arrays using the "," separator, take only 4 elements */
        .map(elem => elem.split(",", 4))
        /* filtering out empty lines and lines with "#" */
        .filter(elem => elem.every(e => !e.includes("#") && e.length != 0))
        /* recording values in properties */
        .map(e => {
            let o = [];
            [o.x, o.y, o.name, o.population] = e;
            return o;
        })
        /* sort cities by population */
        .sort((a, b) => b.population - a.population)
        /* select the first 10 cities */
        .slice(0, 10)
        /* filling the object with data of the type: Kyiv: {x,y,population, rating} */
        .map((elem, i) => {
            elem.rating = ++i;
            topCities[elem.name] = elem;
            delete topCities[elem.name].name;
        })

    /* replacement in the line of city names with a line of information about this city */
    return (str) => {
        Object.keys(topCities).map(city => {
            str = str.replace(city, `${city} (${topCities[city].rating} місце в ТОП-10 найбільших міст України, населення ${topCities[city].population} людей)`);
        })
        return str;
    }
}

export default getTopCities;