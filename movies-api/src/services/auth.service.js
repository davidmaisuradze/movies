import UserModel  from '../models/user.model'
import bcrypt     from 'bcryptjs'
import jwt        from 'jsonwebtoken'
import HttpStatus from 'http-status'
import {ROLES}    from '../config/constants'

export const login = async (email, password) => {
    try {
        const user = await UserModel.findOne({email : email})

        if (!user) {
            return {status : HttpStatus.BAD_REQUEST, data : 'user not found'}
        }

        if (user && bcrypt.compareSync(password, user.passwordHash)) {
            const generatedJWT = jwt.sign({
                email : email
            }, process.env.JWT_SECRET, {expiresIn : '7d'})

            const userObject = {...user.toObject()}
            delete userObject.passwordHash

            const userToAuthJson = {
                token : generatedJWT,
                user  : {
                    email : email,
                    ...userObject
                }
            }
            return {status : HttpStatus.OK, data : userToAuthJson}
        } else {
            return {status : HttpStatus.BAD_REQUEST, data : 'Invalid credentials'}
        }
    } catch (err) {
        console.log(err, 'err')
        return {status : HttpStatus.BAD_REQUEST, data : err}
    }
}

export const register = async (data) => {
    try {
        const {email, password, confirmedPassword, firstName, lastName} = data

        if (password !== confirmedPassword) {
            return {status : HttpStatus.BAD_REQUEST, data : 'passwords not match'}
        }

        const user = await UserModel.findOne({email : email})
        if (user) {
            return {status : HttpStatus.BAD_REQUEST, data : 'user already exists'}
        }

        const salt         = await bcrypt.genSalt(10)
        const passwordHash = bcrypt.hashSync(password, salt)

        const newUser = new UserModel({
            email        : email,
            firstName    : firstName,
            lastName     : lastName,
            passwordHash : passwordHash,
            role         : ROLES.User // assign default user role to newly registered user
        })
        const result  = await newUser.save()
        delete result.passwordHash

        return {
            status : HttpStatus.OK, data : {
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: ROLES.User
            }
        }
    } catch (err) {
        console.log(err, 'err')
        return {status : HttpStatus.BAD_REQUEST, data : err}
    }
}
