import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import dotenv from "dotenv"; 
dotenv.config();
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        type:"GET"
      },
      function(accessToken, refreshToken, profile, done) {
        console.log(profile);
          done(null, profile)
      }
    ));
    passport.serializeUser((user, done) => {
        done(null, user)
    })
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });