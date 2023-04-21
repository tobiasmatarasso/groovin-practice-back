module.exports = function (app, db, ObjectId) {

    //  SERVER ALIVE
    app.get('/api/serverAlive', (req, res) => {
        res.send("Hello World");
    });

    //  AUTHENTICATION
    app.post('/api/authentication/newUser', async (req, res) => {

        const { name, email, lastName, password } = req.body,
            fullName = name + ' ' + lastName;

        try {
            
          await db.collection('users').findOne({ email }, (err, emailExist) => {

            if (!emailExist) {

                    db.collection('users').insertOne({
                        name,
                        email,
                        fullName,
                        lastName,
                        password
                    }, (err, result) => {
                        res.json(result.ops[0]);
                    });
                    
                } else {
                    res.status(409).json({ message: 'Ya existe un usuario con ese mail' })
                }
                
            });
            

        } catch (err) {
          console.log(err);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

    // LOG IN
    app.get('/api/authentication/login', async (req, res) => {

        console.log('params', req.params)
        const { email, password } = req.params;

        try {

            await db.collection('users').findOne({ email }, (err, result) => {

                if (!result) {
                    if (password == result.password) {
                        delete result.password;
                        res.json(result);
                    } else {
                        res.status(422).json({ message: 'El usuairo o la contraseña no coinciden' });
                    }
                } else {
                    res.status(422).json({ message: 'No hay usuario registrados para los datos ingresados' });
                }

            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal server error' });
        }

    });


};
