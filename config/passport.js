var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var mongoose = require('mongoose');

module.exports = function() {
    var Usuario = mongoose.model('Usuario');

    passport.use(new GitHubStrategy({
        clientID: '43ceaba8bea0a10020fd',
        clientSecret: '8e30b22e1ccf48faff9421c8a511cae361172c1d',
        callbackURL: 'https://dswa5-15-ac-pt3009351.herokuapp.com/auth/github/callback'
    }, function(accessToken, refreshToken, profile, done) {
        Usuario.findOrCreate(
            { "login" : profile.username},
            { "nome" : profile.username},
            function(erro, usuario) {
            if(erro){
                console.log(erro);
                return done(erro);
            }
            return done(null, usuario);
            }
        );
    }));
    passport.serializeUser(function(usuario, done) {
        done(null, usuario._id);
    });
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec()
        .then(function(usuario) {
        done(null, usuario);
        });
    });
};


