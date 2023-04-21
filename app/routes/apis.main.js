const fs = require('fs');

module.exports = (app, db, ObjectId) => {

    // CATEOGIES
    app.get('/api/getCategories', async (req, res) => {

        try {
            await db.collection('categories').find().sort({ "postingDate": -1 }).toArray((err, result) => {
                res.json(result);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }

    });

    app.get('/api/getCategoryByID', async (req, res) => {

        const { category } = req.params;

        try {
            await db.collection('categories').findOne({
                "category": ObjectId(category)
            }, (err, result) => {

                const ids = result.map(({id}) => id)
                const categories = result.map(({title, creation, items}) => {title, creation, items})

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

    app.get('/api/getPrductByID', async (req, res) => {

        const { id } = req.params;

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

    app.get('/api/getCart', async (req, res) => {

        try {
            await db.collection('cart').findOne({
                "_id": ObjectId(id)
            }, (err, result) => {

                res.json(result);

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

    app.get('/api/setCarts', async (req, res) => {

        try {
            await db.collection('cart').findOne({
                "_id": ObjectId(id)
            }, (err, result) => {

                res.json(result);

            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }


    });

};
