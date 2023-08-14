const moment = require("moment/moment")

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt : moment().valueOf()
    }
}

const generateLoactionMessage = (from, lat, long) => {
    return {
        from,
        url : `https://www.google.com/maps?q=${lat}. ${long}`,
        createdAt : moment().valueOf()
    }
}

module.exports = {
     generateMessage,
     generateLoactionMessage
}