const router = require("express").Router();
const Beer = require('../../models/Beer');
const User = require('../../models/User');
const axios = require('axios');

// helper functions


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
        let queryRegex = new RegExp(query)
        const queryDatabase = async () => {
            await Beer.find({ name: { $regex: queryRegex, $options: 'i' } }, (err, beers) => {
                if (err) return res.status(500).json([{ msg: "Failure searching from database" }])
                if (beers.length > 10) { dbBeers.dbBeerList = beers.slice(0, 10) }
                else {
                    let parsedDB = beers.map(beer =>
                        ({
                            source: "BeerMe",
                            name: beer.name,
                            brewery: beer.brewery,
                            abv: beer.abv,
                            type: beer.type,
                            location: beer.location,
                            _id: beer._id
                        })
                    )
                    dbBeers.dbBeerList = parsedDB
                }
                return "Done"
            })
        }
        const queryAPI = async () => {
            await axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=open-beer-database%40public-us&q=name%3A${query}`)
                .then(response => {
                    const { records } = response.data
                    let parsedAPI = records.map((record, index) =>
                        ({
                            source: "OpenBeerDB",
                            name: record.fields.name,
                            brewery: record.fields.name_breweries,
                            abv: record.fields.abv >= 0 ? parseFloat(record.fields.abv.toFixed(2)) : "No ABV found",
                            type: record.fields.style_name,
                            location: record.fields.city + ", " + record.fields.state,
                            _id: index
                        })
                    )
                    dbBeers.apiBeerList = parsedAPI
                    return "Done"
                })
                .catch(err => res.status(500).json([{ msg: err.message }]))
        }
        const queries = async () => {
            await queryDatabase()
            await queryAPI()

            // check for duplicate entries and remove them, prioritizing our database ones first
            dbBeers.apiBeerList = dbBeers.apiBeerList.filter(beer => !dbBeers.dbBeerList.find(object => beer.name === object.name && beer.brewery === object.brewery))

            Array.prototype.push.apply(dbBeers.dbBeerList, dbBeers.apiBeerList)
            let fullList = dbBeers.dbBeerList
            res.status(200).json(fullList);
        }
        queries()
    })

router.route("/createbeer")
    .post((req, res) => {
        const { name, brewery, abv, type, location } = req.body;
        const { _id } = req.user._id;
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
                                if (err) res.status(500).json([{ msg: "Server Error" }])
                                else { res.status(200).json([{ msg: "Beer added to your list!", beer: info }]) }
                            })
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).json([{ msg: "Server Error, try again" }])
            })
    })

router.route("/addbeer")
    .post((req, res) => {
        const { _id } = req.user._id;
        if (req.body._id) {
            const beerId = req.body._id
            User.findOneAndUpdate({ _id: _id }, { "$push": { "beers": beerId } }, { new: true, runValidators: true }, (err, info) => {
                if (err) res.status(500).json([{ msg: "Server Error, try again" }])
                else { res.status(200).json([{ msg: "Success, beer added" }]) }
            })
        }
        else {
            const { name, brewery, abv, type, location } = req.body;
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
                        if (err) res.status(500).json([{ msg: "Server Error, try again" }])
                        else { res.status(200).json([{ msg: "Success, beer added", beer: info }]) }
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json([{ msg: "Server Error, try again" }])
                })
        }
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