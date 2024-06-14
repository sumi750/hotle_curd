const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const Person = require("./models/person.js");

passport.use(new passportLocal( async function(username, password, done){
    
    //Authentication logic for Token and Local Passport
    try{
        
        // console.log("Recived credentials: ", username, password);
        const user = await Person.findOne({username: username});
        if(!user){
            return done(null, false, { message: "Incorrect username"});
        }
        // const isPasswordMatch =  user.password === password ? true : false;
        const isPasswordMatch =  await user.comparePassword(password); 
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return(null, false, { message: "Password is Incorrect or invalid"});
        }
    }

    catch(err){
        return done(err);
    }
}))

module.exports = passport;