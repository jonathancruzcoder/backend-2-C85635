import { Router} from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url'
import { createMailer } from '../config/mailer.js'

const router = Router();

const __filename = fileURLToPath( import.meta.url);
const __dirname = path.dirname(__filename);

const readTemplate = ( nameTemplate) => {
    const p = path.join(__dirname, '..', 'templates', nameTemplate);
    return fs.readFileSync(p, 'utf-8')
}

router.get('/mail', async (req, res) => {
    const to = 'usuario@mail.com';
    try {
        const transporter = createMailer();
        const info = await transporter.sendMail({
            from: `${ process.env.MAIL_USER} "APP Coder"`,
            to: to,
            subject: "Confirmación de Compra",
            text: "Estimado Cliente, confirmamos tu compra", // Plain-text version of the message
            // html: "<b>Hello world?</b>", // HTML version of the message
        });
        console.log("Mensaje Enviado:", info.messageId);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error({error});
        res.status(500).json({ status: 'error', message:'No se pudo enviar el Mail' });
    }
})


router.post('/mail', async (req, res) => {
 const { to, name='cliente', product='Producto'} = req.body;

    try {

        if( !to ) {
            return res.status(400).json({ error: 'El destinatario es Obligatorio'});
        }

        const htmlBase = readTemplate('purchase.html')
            .replaceAll('{{NOMBRE}}', name)
            .replaceAll('{{PRODUCTO}}', product)

        const transporter = createMailer();
        const info = await transporter.sendMail({
            from: `${ process.env.MAIL_USER} "APP Coder"`,
            to: to,
            subject: `Confirmación de Compra ${product}`,
            html: htmlBase,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.join(__dirname, '..', '..', 'assets', 'logo.png'),
                    cid: 'logo_cid'
                },
                {
                    filename: 'manual.pdf',
                    path: path.join(__dirname, '..', '..', 'assets', 'apunte.pdf'),
                    
                }
            ]
        });
        console.log("Mensaje Enviado:", info.messageId);
        res.json({ status: 'ok' });
    } catch (error) {
        console.error({error});
        res.status(500).json({ status: 'error', message:'No se pudo enviar el Mail' });
    } 
  
})

export default router;