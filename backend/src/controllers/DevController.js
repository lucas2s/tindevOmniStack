const axios = require('axios');

module.exports = {
    async store(req, res) {
        const { username } = req.body;
        const response = await axios.get(`https://api.github.com/users/${username}`);

        console.log(`https://api.github.com/users/${username}`);
        console.log(response);

      //  return res.json(response);
    }
};