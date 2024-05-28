const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const Person = require("./models/person.js");

passport.use(new passportLocal( async(username, password, done)=>{
    //Authentication logic here
    try{
        console.log("Recived credentials: ", username, password);
        const user = await Person.findOne({username: username});
        if(!user){
            return done(null, false, { message: "Incorrect username"});
        }
        const isPasswordMatch = await user.comparePassword(password); 
        if(isPasswordMatch){
            return done(null, user);
        }
        else{
            return(null, false, { message: "Password is Incorrect"});
        }
    }
    catch(err){
        return done(err);
    }
}))
module.exports = passport; 