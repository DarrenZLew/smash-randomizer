var axios = require('axios');

module.exports = {
	fetchSmashUpData: function () {
		// var encodedURI = window.encodeURI('https://jsonblob.com/api/jsonBlob/e95e3be1-74bc-11e7-9e0d-7db1df8d40ff');
		var encodedURI = window.encodeURI('https://api.myjson.com/bins/186mmh');
		return axios.get(encodedURI)
			.then(function (response) {
				return response.data;
			})
	}
}