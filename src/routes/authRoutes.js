import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../prismaClient.js'

const router = express.Router()


// Register a new user endpoint. /auth/register
router.post('/register', async (req,res) => {
    const {username, password} = req.body
    // encrypt
    const hashedPassword = bcrypt.hashSync(password, 8)
    // save new username and hashed pw to db
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        })

        // default todo for new user
        const defaultTodo = `Hello! Add your first todo!`
        await prisma.todo.create({
            data: {
                task: defaultTodo,
                userId: user.id
            }
        })

        // create a token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

router.post('/login', async (req,res) => {
    // we get their email, and look up password but its encrypted
    // we need to again encrypt the users inputed password
    // this new encrypted pw needs to match the one in db
    const {username, password} = req.body

    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        // if we cant find a user with same username, return out of function
        if (!user) { return res.status(400).send({message: "User not found" })}

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if password doesnt match, return out of function
        if (!passwordIsValid) { return res.status(401).send({message: "Invalid password" })}

        // at this point we have a successful authentication
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'} )
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router