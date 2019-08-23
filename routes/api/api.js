const router = require("express").Router();
const Beer = require('../../models/Beer');
const User = require('../../models/User');
const axios = require('axios');

// /api/x/ routes
router.route("/getbeers")
    .get((req, res) => {
        const { _id } = req.user;
        User.findOne({ _id: _id }).populate('beers')
            .then(user => {
                if (!user) res.status(400).json([{ msg: "User not found - please log in" }])
                else {
                    res.status(200).json(user.beers)
                }
            })
    })

router.route("/searchbeers/:query")
    .get((req, res) => {
        const { query } = req.params;

        let dbBeers = {
            dbBeerList: null,  // array
            apiBeerList: null, // array
        }
        const queryDatabase = async () => {
            await Beer.find({}, (err, beers) => {
                if (err) return res.status(500).json([{ msg: "Failure searching from database" }])
                if (beers.length > 10) { dbBeers.dbBeerList = beers.slice(0, 10) }
                else dbBeers.dbBeerList = beers
                return "Done"
            })
        }
        const queryAPI = async () => {
            await axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=${query}`)
                .then(response => {
                    const { records } = response.data
                    let parsed = records.map(record =>
                        ({
                            name: record.fields.name,
                            brewery: record.fields.name_breweries,
                            abv: parseFloat(record.fields.abv.toFixed(2)),
                            type: record.fields.style_name,
                            location: record.fields.city + ", " + record.fields.state
                        })
                    )
                    dbBeers.apiBeerList = parsed
                    return "Done"
                })
                .catch(err => res.status(500).json([{ msg: err.message }]))
        }
        const queries = async () => {
            await queryDatabase()
            await queryAPI()
            res.status(200).json(dbBeers);
        }
        queries()
    })

router.route("/addbeer")
    .post((req, res) => {
        const { name, brewery, abv, type, location } = req.body;
        const { _id } = req.user;
        Beer.findOne({ name: name, brewery: brewery })
            .then(beer => {
                if (beer) res.status(400).json([{ msg: "Beer already in database, please add it to your list from the search menu" }])
                else {
                    const newBeer = new Beer({
                        name,
                        brewery,
                        abv,
                        type,
                        location
                    });
                    newBeer.save()
                        .then(beer => {
                            User.findOneAndUpdate({ _id: _id }, { "$push": { "beers": beer._id } }, { new: true, runValidators: true }, (err, info) => {
                                if (err) res.send(500).json([{ msg: "Server Error" }])
                                else { res.status(200).json(info) }
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    })

router.route("/removebeer/:id")
    .delete((req, res) => {
        const beerId = req.params.id
        const { _id } = req.user;
        User.findOneAndUpdate({ _id: _id }, { "$pull": { "beers": beerId } }, { new: true }, (err, info) => {
            if (err) res.send(500).json([{ msg: "Server Error" }])
            else { res.status(200).json(info) }
        })
    })

module.exports = router;