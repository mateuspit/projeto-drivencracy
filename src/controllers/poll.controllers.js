import { ObjectId } from "mongodb";
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

export async function getPolls(req, res) {
    try {
        const allPolls = await db.collection("Polls").find().toArray();
        res.send(allPolls);
    }
    catch (error) {
        console.log(error.message);
    }
}

export async function getResult(req, res) {
    const pollId = req.params.id;
    try {
        const winnerChoice = await db.collection("Choices").findOne({ pollId }, { sort: { votes: -1 } });

        if (!winnerChoice) return res.status(404).send("Enquete inexistente");

        const winnerPoll = await db.collection("Polls").findOne({ _id: new ObjectId(pollId) });

        const dataPoll = {
            _id: winnerPoll._id,
            title: winnerPoll.title,
            expireAt: winnerPoll.expireAt,
            result: {
                title: winnerChoice.title,
                votes: winnerChoice.votes
            }
        }

        return res.send(dataPoll);
    }
    catch (error) {
        console.log(error.message);
    }
}