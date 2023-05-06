import { db } from "../database/database.connection.js";

export async function newPoll(req, res) {
    //middlewares usando schemas em routes filtra a entrada
    let { title, expireAt } = req.body;
    try {
        //Se expireAt for vazio deve ser considerado 30 dias de enquete por padrão.
        if (expireAt === undefined || expireAt === "") {
            const now = new Date();
            const nowDayOfMonth = now.getDate();
            now.setDate(nowDayOfMonth + 30);
            const formattedDate = now.toISOString().slice(0, 16).replace('T', ' ');;
            //const formattedDate = isoString.toISOString().slice(0, 16).replace('T', ' ');
            expireAt = formattedDate;
        }

        await db.collection("Polls").insertOne({ title, expireAt });
        res.status(201).send({ title, expireAt });
    }
    catch (error) {
        console.log(error.message)
    }
}