const httpStatus    = require('http-status');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

function getAllDetails(req, res) {
    const url       = 'http://universities.hipolabs.com/search?country=United+States';

    const settings  = { method: "Get" };
    fetch(url, settings)
    .then(res => res.json())
    .then((json) => {
        console.log(json);
        return res.status(httpStatus.OK).send({ message: 'SUCCESS', json, status: 'success' });
    })
    .catch((err) => {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: err, status: 'error' });
    })
}

module.exports = {
    getAllDetails: getAllDetails
}