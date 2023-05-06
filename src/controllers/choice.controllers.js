import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";

export async function newChoice(req, res) {
    //middlewares usando schemas em routes filtra a entrada
    const { title, pollId } = req.body;

    try {
        //console.log(pollId);
        const poll = await db.collection("Polls").findOne({ _id: new ObjectId(pollId) });
        //console.log("poll",poll);
        if (!poll) return res.status(404).send("Essa enquete não existe!")

        const choice = await db.collection("Choices").findOne({ title });
        if (choice) return res.status(409).send("Essa opção já existe!")

        const timestampPoll = new Date(poll.expireAt).getTime();
        //console.log(poll.expireAt);
        //console.log(timestampPoll);
        const timestampActual = new Date().getTime();
        if (timestampActual > timestampPoll) return res.status(403).send("Essa enquete já foi finalizada!");

        await db.collection("Choices").insertOne({ title, pollId });
        res.status(201).send({ title, pollId });
    }
    catch (error) {
        console.log(error.message);
    }
}

export async function allChoicesPoll(req, res) {
    //middlewares usando schemas em routes filtra a entrada
    const pollId = req.params.id;
    try {
        console.log(pollId);
        const allChoicesPoll = await db.collection("Choices").find({ pollId }).toArray();
        console.log(allChoicesPoll);
        if (allChoicesPoll.length === 0) return res.status(404).send("Essa enquete não existe ou não possui opções");

        res.send(allChoicesPoll);
    }
    catch (error) {
        console.log(error.message);
    }
}