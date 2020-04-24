const LocalStrategy = require('passport-local').Strategy
const db = require('../../db_server/db_connection');


module.exports = (passport, db) => {
    passport.use(new LocalStrategy((username, password, cb) => {
        db.query('SELECT id, fullname, email, phonenumber, postcode FROM users WHERE email = $1 and password = $2', [username, password], (err, result) => {
            if (err) {
                console.error('Error when selecting user on login', err)
                return cb(err)
            }

            if (result.rows.length > 0) {
                const first = result.rows[0]
                    //bcrypt.compare(password, first.password, function(err, res) {
                if (password === first.password) {
                    cb(null, { id: first.id, fullname: first.fullname, email: first.email, phonenumber: first.phonenumber, postcode: first.postcode })
                } else {
                    cb(null, false)
                }
                // })
            } else {
                cb(null, false)
            }
        })
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        db.query('SELECT id, fullname, email, phonenumber, postcode FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
            if (err) {
                console.error('Error when selecting user on session deserialize', err)
                return cb(err)
            }

            cb(null, results.rows[0])
        })
    })
}