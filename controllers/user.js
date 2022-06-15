const User = require ('../models/User');
const bcrypt =  require ('bcrypt');
const jwt = require('jsonwebtoken');
console.log ("controller : begin");
exports.signup = (req, res, next) => {
    console.log ('controllers : signup req = ');

    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        console.log ('controllers : hashing  = ',hash);
        const user = new User({
          email: req.body.email,
          password: hash
        });
        console.log ('controllers : signup user = ',user);

        user.save()
          .then(() =>
          { 
              console.log ("controllers : signup ok");
              res.status(201).json({ message: 'Utilisateur créé !' })
    })
          .catch(error => {
                           console.log (" controller signup error ", error );
                           res.status(400).json({ error });
                         });


      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    console.log ('controllers : login  = email ', req.body.email);

    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
            console.log ('controllers : login  = email Not found ', req.body.email);
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        console.log ('controllers : login  = email  found ', req.body.email);
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
                console.log ('controllers : login  = email  mot de passe wrong ', req.body.email);
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }

            console.log ('controllers : login  = email  mot de passe good userId ', user._id);

/*
            res.status(200).json({
              userId: user._id,
              token: 'TOKEN'
            });
*/
console.log ('controllers Providing the token ');
res.status(200).json({
    userId: user._id,
    token: jwt.sign(
      { userId: user._id },
      'RANDOM_TOKEN_SECRET',
      { expiresIn: '24h' }
    )
  });


          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
    };
      
