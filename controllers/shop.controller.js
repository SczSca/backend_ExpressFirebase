const { shopManager } = require("../services/shop.services");

const getAllProducts = ( req, res, next ) =>{
    shopManager.getAllProducts()
    .then(  (response) =>{
        if(response !== null){
            //sends all products
            res.status(200).send(response);
        }else{
            res.status(400).send({
                msg: 'read error',
                res: response
            })
        }
    }).catch( (error) =>{
        res.status(500).send({
            msg: 'Internal server error'
        });
    })

};

const newProduct = ( req, res, next ) =>{
    const data = {
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price
    }
    shopManager.newProduct(data)
    .then( (response) =>{
        if(response){
            res.status(201).send({
                msg: 'product created!'
            });
        }else{
            res.status(400).send({
                msg: 'error with sent data',
                data: data
            });
        }
    }).catch( (error) =>{
        res.status(500).send({
            msg: 'Internal server error',
            e: error.message,
            data: typeof data
        });
    })
};

module.exports = {
    getAllProducts,
    newProduct
}