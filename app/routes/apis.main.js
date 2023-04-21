const fs = require('fs');

module.exports = (app, db, ObjectId) => {

    // CATEOGIES
    app.get('/api/getCategories', async (req, res) => {

        try {
            await db.collection('categories').find().sort({ "postingDate": -1 }).toArray((err, result) => {
                const ids = result.map(({_id}) => _id)
                const categories = result.map(({title, creation, items}) => {
                    return {title, creation, items}
                })

                res.json({
                    ids,
                    categories
                });
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }

    });

    app.post('/api/createCategories', async (req, res) => {

        const category = req.body;

        try {
            await db.collection('categories').insertOne(category, (err, {ops}) => {
                res.json(ops[0]);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }

    });

    app.get('/api/getCategoryByID', async (req, res) => {

        const { id } = req.query;
        console.log(id)

        try {
            await db.collection('categories').findOne({
                "_id": ObjectId(id)
            }, (err, result) => {
                res.json(result)
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

    app.post('/api/setPrduct', async (req, res) => {

        const product = req.body;

        try {
            await db.collection('products').insertOne(product, (err, { ops }) => {

                res.json(ops[0]);

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

    app.get('/api/getPrducts', async (req, res) => {

        const { category_id } = req.query;

        try {
            await db.collection('products').find({
                "category_id": category_id
            }, {
                projection: {
                    category_id: 0,
                    detail: 0,
                    stock: 0,
                    sizes: 0
                }
            }).toArray((err, result) => {

                res.json(result);

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

    app.get('/api/getPrductByID', async (req, res) => {

        const { id } = req.query;

        try {
            await db.collection('products').findOne({
                "_id": ObjectId(id)
            }, (err, result) => {

                res.json(result);

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

    // app.get('/api/getCart', async (req, res) => {

    //     try {
    //         await db.collection('cart').findOne({
    //             "_id": ObjectId(id)
    //         }, (err, result) => {

    //             res.json(result);

    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }


    // });

    // app.get('/api/setCarts', async (req, res) => {

    //     try {
    //         await db.collection('cart').findOne({
    //             "_id": ObjectId(id)
    //         }, (err, result) => {

    //             res.json(result);

    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).json({ message: 'Internal server error' });
    //     }


    // });

};
