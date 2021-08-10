import express from 'express';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = process.env.port || 5000;

app.use(express.json());
app.use(cors());

app.post('/sendmail', (req, res) => {
    const { email, id, secret } = req.body;
    const token = jwt.sign({ id }, secret);
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gowthamitachi.uchiha@gmail.com',
            pass: 'shadowhokage@0102'
        }
    })
    const mailOption = {
        from: "gowthamitachi.uchiha@gmail.com",
        to: email,
        subject: "Forgot password link",
        text: token,
        html: `<p>Set new password link: <a href='http://localhost:3000/setnewpassword/${token}/${id}'>Click here</a></p>`
    }
    transporter.sendMail(mailOption, (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.send({ message: "sent successfully", token: token });
        }
    })
})

app.listen(port, () => {
    console.log("server was running at : ", port);
})

