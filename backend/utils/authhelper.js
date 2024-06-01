const bcrypt =require("bcryptjs")

const hashPassword = async(password) =>{
    //saltround = noo. of times hashing is being done
    try{
        const hashedpass = await bcrypt.hash(password, saltRounds=10)
        return hashedpass
    }
    catch(error){
        console.log(error)
    }
}
const comparePassword = async(password, hashedpass) =>{
    try{
        return bcrypt.compare(password,hashedpass)
    }
    catch(error){
        console.log(error)
    }
}
module.exports = {
    comparePassword, hashPassword
}