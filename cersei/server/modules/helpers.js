exports.handleError = (err, result, res) => {
	console.log('[ERROR]', err);

	res.json(Object.assign(result, {
		success: false,
		errors: [...result.errors, err],
	}));
};
