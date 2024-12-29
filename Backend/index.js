// import express from 'express';
// import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "",
//         pass: "",
//     },
// });

// app.post("/procesar-email", (req, res) => {
//     const {para, titulo, mensaje } = req.body;
    
//     const mensajeHtml = `
//         <p style="color: blue;">Hola, buenos días.</p>
//         <p>Aquí está el informe que solicitaste:</p>
//         <ul>
//             <li>Cantidad de notas pendientes: <span style="color: red;">10</span></li>
//             <li>Otras tareas pendientes: <span style="color: green;">5</span></li>
//         </ul>
//         <p>Saludos cordiales,</p>
//     `;


//     const mailOptions = {
//      to: para,
//      subject: titulo,
//      text: mensajeHtml,
//      html: mensajeHtml
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         console.log("Error al enviar el correo:", error);
//         res.send("Error al enviar el correo.");
//     } else {
//         console.log("Correo enviado:", info.response);
//         res.send("Correo enviado exitosamente!");
//     }
//     });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });


// import express from 'express';
// import bodyParser from 'body-parser';
// import nodemailer from 'nodemailer';
// import cron from 'node-cron';

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "",
//         pass: "",
//     },
// });

// // Tarea Cron para enviar un email todos los días a las 8:00 AM
// cron.schedule('10 22 * * *', () => {
//     const mensajeHtml = `
//         <p style="color: blue;">Hola, buenos días.</p>
//         <p>Aquí está el informe que solicitaste:</p>
//         <ul>
//             <li>Cantidad de notas pendientes: <span style="color: red;">10</span></li>
//             <li>Otras tareas pendientes: <span style="color: green;">5</span></li>
//         </ul>
//         <p>Saludos cordiales,</p>
//     `;

//     const mailOptions = {
//         to: "andres.sy1004@gmail.com",  
//         subject: "Informe Diario",
//         text: mensajeHtml,
//         html: mensajeHtml
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log("Error al enviar el correo:", error);
//         } else {
//             console.log("Correo enviado:", info.response);
//         }
//     });
// }, {
//     scheduled: true,
//     timezone: "America/Bogota"  
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });


import express from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import cors from 'cors'; 


const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const reportData = {
    email: "",
    saludo: "buenos días",
    notasPendientes: 0,
    notasSinIniciar: 0,
    notasCompletadas: 0,
    tareasPendientes: 0
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass: "",
    },
});

app.post('/actualizar-informe', (req, res) => {
    // Actualizar los datos almacenados con lo que viene del frontend
    reportData.email = req.body.email;
    reportData.saludo = req.body.saludo || "buenos días";
    reportData.notasPendientes = req.body.notasPendientes;
    reportData.notasSinIniciar = req.body.notasSinIniciar;
    reportData.notasCompletadas = req.body.notasCompletadas;
    console.log(reportData)

    
    res.json({ message: "Datos del informe actualizados correctamente" });
});

function buildMessageHtml(data) {
    return `
        <p style="color: blue;">${data.saludo}.</p>
        <p>Aquí está el informe que solicitaste:</p>
        <ul>
            <li>Cantidad de notas pendientes: <span style="color: red;">${data.notasPendientes}</span></li>
            <li>Cantidad de notas sin iniciar: <span style="color: orange;">${data.notasSinIniciar}</span></li>
            <li>Cantidad de notas completadas: <span style="color: green;">${data.notasCompletadas}</span></li>
            <li>Otras tareas pendientes: <span style="color: purple;">${data.tareasPendientes}</span></li>
        </ul>
        <p>Saludos cordiales, para saber mas sobre el informe entra a la app con tus credenciales bye bye</p>
    `;
}

// Tarea Cron para enviar un email todos los días a las 10:10 PM
cron.schedule('56 22 * * *', () => {
    if (reportData.email) {
        const mensajeHtml = buildMessageHtml(reportData);
        const mailOptions = {
            to: reportData.email,
            subject: "Informe Diario Automático",
            html: mensajeHtml
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo:", error);
            } else {
                console.log("Correo enviado con éxito:", info.response);
            }
        });
    } else {
        console.log("No hay un email configurado para enviar el informe.");
    }
}, {
    scheduled: true,
    timezone: "America/Bogota"
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
