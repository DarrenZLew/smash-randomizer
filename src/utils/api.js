import axios from 'axios';

export function fetchSmashUpData() {
	const url = 'https://api.myjson.com/bins/19dsmx';
	let encodedURI = window.encodeURI(url);
	return axios.get(encodedURI)
		.then(function (response) {
			return response.data;
		})
}