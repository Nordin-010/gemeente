

function sortByCity(list) {
    list.sort((a, b) => {
        return (a.gemeente > b.gemeente)?1:-1;
    });
}

function sortByInhabitant(list) {
    list.sort((a, b) => {
        return (a.inwoners > b.inwoners)?1:-1;
    });
}

module.exports.byCity = sortByCity;
module.exports.byInhabitant = sortByInhabitant;
