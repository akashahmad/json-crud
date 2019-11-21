//var fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const jsonfile = require('jsonfile');
const uuid = require('uuid');


const Controllerteam = {
    get: (req, res) => {

        const file = './routes/controllers/data.json'
        jsonfile.readFile(file, function (err, obj) {
            if (err) {
                console.error(err)
            }
            else {
                res.send(obj);
                console.dir(obj)
            }
        })
    },


    post: async (req, res) => {
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                const obj = {...req.body}
                obj.id = uuid()
                await data.push(obj);
                jsonfile.writeFile(file, data, function (err) {
                    if (err) console.error(err)

                })
                //console.log('sad', req.body);
            }
        })
        res.send('new-member successfully added');
    },


    put: async (req, res) => {
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                await data.forEach(sin =>{
                    if(sin.id === req.params.id){
                        Object.keys(req.body).forEach(single=>{
                                sin[single]= req.body[single]
                            }
                        )
                        //     sin.name = req.body.name;
                        //     sin.company =  req.body.company;
                        //     sin.email = req.body.email;
                        //     sin.sinphone = req.body.phone;
                        //     sin.address =req.body.address;
                        //     sin.id = req.body.id;
                    }

                })

                jsonfile.writeFile(file, data, function (err) {
                    if (err) console.error(err)
                })
                //console.log('sad', req.body);
            }
        })
        res.send('member successfully updated');
    },



    delete: async (req, res) => {
        console.log("params", req.params.id)
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                jsonfile.writeFile(file, data.filter(item=>item.id !== req.params.id ), function (err) {
                    if (err) console.error(err)
                })
                //console.log('sad', req.body);
            }
        })
        res.status(200).send('member successfully deleted');
    },


    getOne: async (req, res) => {
        let response = {};
        const file = './routes/controllers/data.json'
        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                response.status = 200;
                response.body = {
                    message: "single",
                    data: data.find(item=>item.id === req.params.id)
                };
                res.status(response.status).send(JSON.stringify(response.body));
            }
        })
    },

};

module.exports = Controllerteam;