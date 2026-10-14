const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: BROKEN_MINI_BOT,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('@whiskeysockets/baileys');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function BROKEN_MINI_BOT_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_BROKEN_MINI_BOT = BROKEN_MINI_BOT({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_BROKEN_MINI_BOT.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_BROKEN_MINI_BOT.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_BROKEN_MINI_BOT.ev.on('creds.update', saveCreds);
            Pair_Code_By_BROKEN_MINI_BOT.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(800);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_BROKEN_MINI_BOT.sendMessage(Pair_Code_By_BROKEN_MINI_BOT.user.id, { text: 'BROKEN_MINI_BOT~' + b64data });

                    let BROKEN_MINI_BOT_TEXT = `
        
╔════════════════════◇
║『 SESSION CONNECTED』
║ ✨ BROKEN-MINI-BOT🔷
║ ✨ BROKEN-MINI-BOT OFFICIAL🔷
╚════════════════════╝


---

╔════════════════════◇
║『 YOU'VE CHOSEN BROKEN_MINI_BOT』
║ -Set the session ID in Heroku:
║ - SESSION_ID: 
╚════════════════════╝
╔════════════════════◇
║ 『••• _V𝗶𝘀𝗶𝘁 𝗙𝗼𝗿_H𝗲𝗹𝗽 •••』
║❍ 𝐎𝐰𝐧𝐞𝐫: 923203734432
║❍ 𝐑𝐞𝐩𝐨: https://github.com/shahbaz804/Minibot.git
║❍ 𝐖𝐚𝐆𝗿𝐨𝐮𝐩: https://chat.whatsapp.com/FOWjKXxippQ5IKSv9uok4J?s=cl&p=a&mlu=4&ilr=4
║❍ 𝐖𝐚𝐂𝐡𝐚𝐧𝐧𝐞𝐥: https://whatsapp.com/channel/0029VbDMOp3LSmbkHSqjPR1L
║
║ ☬ ☬ ☬ ☬
╚═════════════════════╝
𒂀 Enjoy BROKEN-MINI-BOT


---

Don't Forget To Give Star⭐ To My Repo
______________________________`;

                    await Pair_Code_By_BROKEN_MINI_BOT.sendMessage(Pair_Code_By_BROKEN_MINI_BOT.user.id, { text: Toxic_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_BROKEN_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    BROKEN_MINI_BOT_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await BROKEN_MINI_BOT_PAIR_CODE();
});

module.exports = router;
