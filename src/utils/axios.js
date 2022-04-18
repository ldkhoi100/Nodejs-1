const axios = require('axios')

const requestApi = (url, method, data, callback) => {
    axios({
        method: method || "GET",
        url: url,
        data: data
    }).then((res) => {
        return callback(res)
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = {
    requestApi: requestApi
}
