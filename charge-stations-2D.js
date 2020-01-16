const prompt = require('prompt-sync')();
const stations = {}


function ChargeStation(stations) {
    this.stations = stations
}

ChargeStation.prototype.listStations = function () {
    if (!this.stations) {
        return 'There are no charge stations, add one!'
    }
    let placeInOrder = [];
    let rows = [], colomns = []
    const stationNames = Object.keys(this.stations)
    for (let i = 0; i < stationNames.length; i++) {
        rows.push(parseInt(this.stations[stationNames[i]].row) - 1)
        colomns.push(parseInt(this.stations[stationNames[i]].colomn) - 1)
    }
    console.log(rows)
    console.log(colomns)
}

ChargeStation.prototype.addStation = function (stationName, oder) {
    const stations = Object.keys(this.stations)

    if (stations.includes(stationName)) {
        console.log('Station Name already exists')
    } else {
        this.stations[stationName] = { row: oder.row, colomn: oder.colomn }
        console.log('\n')
        console.log('New station added', this.stations)
    }
}



const chargeStation = new ChargeStation(stations)

while (true) {
    const answer = prompt('Add? List? : ')
    if (answer == 'list') {
        chargeStation.listStations()
    } else if (answer == 'add') {
        const stationName = prompt('Name of the station? : ')
        const row = prompt('Row? : ')
        const colomn = prompt('colomn? : ')
        chargeStation.addStation(stationName, { row, colomn })
    } else {
        break;
    }
}