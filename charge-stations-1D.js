const prompt = require('prompt-sync')();
const stations = {
    1: 'a',
    0: 'b',
    2: 'c'
}

function ChargeStation(stations) {
    this.stations = stations
}

// Prototype for listing station
ChargeStation.prototype.listStations = function () {
    let stations = Object.keys(this.stations)

    if (stations.length < 1) {
        console.log('There are no charge stations, add one!')
    }

    let stationsInOrder = []
    for (let i = 0; i < stations.length; i++) {
        stationsInOrder.push([parseInt(stations[i]), this.stations[stations[i]]])
    }
    stationsInOrder = stationsInOrder.sort()
    for (let i = 0; i < stationsInOrder.length; i++) {
        console.log(stationsInOrder[i])
    }
}

// Prototype for adding station
ChargeStation.prototype.addStation = function (location, stationName) {
    const stations = Object.values(this.stations)
    if (stations.includes(stationName)) {
        console.log('Station Name already exists')
    } else {
        const boundary = Object.keys(this.stations).length
        if (location < boundary) {
            const existingStation = this.stations[location]
            this.stations[location] = stationName
            this.stations[boundary] = existingStation
        } else if (location > boundary) {
            console.log('There is a gap between')
        } else {
            this.stations[location] = stationName
        }
        console.log('\n')
        console.log('New station added', this.stations)
    }
}

// Prototype for removing stations
ChargeStation.prototype.removeStation = function (stationName) {
    const stations = Object.values(this.stations)
    if (!stations.includes(stationName)) {
        console.log('Station does not exists')
    } else {
        for (let station in this.stations) {
            if (this.stations[station] == stationName) {
                delete this.stations[station]
                // Re-arrange the remining stations
                for (let i = parseInt(station); i < (stations.length - parseInt(station)); i++) {
                    if (this.stations[i + 1]) {
                        this.stations[i] = this.stations[i + 1]
                        delete this.stations[i + 1]
                    }
                }
                break;
            }
        }
        console.log(`Station ${stationName} deleted`, this.stations)
    }
}

// Initiate Object
const chargeStation = new ChargeStation(stations)

while (true) {
    const answer = prompt(' List? Add? remove?: ')
    if (answer == 'list') {
        chargeStation.listStations()
    } else if (answer == 'add') {
        const stationName = prompt('Name of the station? : ')
        const location = prompt('location? : ')
        chargeStation.addStation(parseInt(location), stationName)
    } else if (answer == 'remove') {
        const stationName = prompt('Name of the station? : ')
        chargeStation.removeStation(stationName)
    } else {
        break;
    }
}