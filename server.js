import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express() // dependencia que permitiu realizar as chamadas rest.
app.use(express.json())
app.use(cors()) //utilizado para permitir que qualquer endereço consulte a api 

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)

})

app.put('/usuarios/:id', async (req, res) => {
    await prisma.user.update({
        where:{
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)

})




app.get('/usuarios', async (req, res) => {

    let users = []

    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                email: req.query.email,
                age: req.query.age
            }
        })
    }else{
        const users =  await prisma.user.findMany()
    }



   res.status(200).json(users)
}) 


app.delete('/usuarios/:id' , async (req,res) =>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({message:'Usuário deletado'})
})

app.listen(3000)





/*
mongodb: 

augustocahu
MpxnFh3dGH6kUp6m
*/