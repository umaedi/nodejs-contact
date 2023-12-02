import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient;

//get all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await prisma.contact.findMany();
        res.status(200).send({
            data: contacts,
            message: 'data contacts'
        });
    } catch (error) {
        res.send(error.message);
    }
});

//create contact
app.post('/contact/store', async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, phone } = req.body;
        await prisma.contact.create({
            data: {
                name: name,
                email: email,
                phone: phone
            }
        });
        res.status(201).send('contact has been created')
    } catch (error) {
        res.status(500).send(error.message);
    }

});

//get contact by id
app.get('/contact/:id', async (req, res) => {
    try {
        const contact_id = req.params.id;
        const contact = await prisma.contact.findUnique({
            where: {
                id: parseInt(contact_id)
            }
        });

        res.send({
            data: contact,
            message: 'data contact'
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//update contact by id
app.put('/contact/update/:id', async (req, res) => {
    try {
        const contact_id = req.params.id;
        const { name, email, phone } = req.body;

        await prisma.contact.update({
            where: {
                id: parseInt(contact_id)
            },
            data: {
                name: name,
                email: email,
                phone: phone
            }
        })
        res.send('contact has been updated');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//delete contact by id
app.delete('/contact/destroy/:id', async (req, res) => {
    try {
        const contact_id = req.params.id;
        await prisma.contact.delete({
            where: {
                id: parseInt(contact_id)
            }
        });
        res.send('contact has been deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen('3000', () => {
    console.log('server running on port 3000');
});
