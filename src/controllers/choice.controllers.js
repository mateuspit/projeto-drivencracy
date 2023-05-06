import { db } from "../database/database.connection.js";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

export async function newChoice(req, res) {
    //middlewares usando schemas em routes filtra a entrada
    const { title, pollId } = req.body;

    try {
        //console.log(pollId);
        const poll = await db.collection("Polls").findOne({ _id: new ObjectId(pollId) });
        //console.log("poll",poll);
        if (!poll) return res.status(404).send("Essa enquete não existe!")

        const choice = await db.collection("Choices").findOne({ title, pollId });
        //console.log(title);
        //console.log(pollId);
        //console.log(choice);
        if (choice) return res.status(409).send("Essa opção já existe!")

        const timestampPoll = new Date(poll.expireAt).getTime();
        //console.log(poll.expireAt);
        //console.log(timestampPoll);
        const timestampActual = new Date().getTime();
        if (timestampActual > timestampPoll) return res.status(403).send("Essa enquete já foi finalizada!");

        await db.collection("Choices").insertOne({ title, pollId, votes: 0 });
        //await db.collection("Polls")
        //    .updateOne({ _id: new ObjectId(pollId) },
        //        {
        //            result: {
        //                title: title,
        //                votes: 0
        //            }
        //        }
        //    );
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

export async function vote(req, res) {
    //middlewares usando schemas em routes filtra a entrada
    const _id = req.params.id;
    try {
        if (_id.length !== 24) return res.status(404).send("Opção inexistente!");
        const choice = await db.collection("Choices").findOne({ _id: new ObjectId(_id) });
        if (!choice) return res.status(404).send("Opção inexistente!");

        const poll = await db.collection("Polls").findOne({ _id: new ObjectId(choice.pollId) });

        const timestampPoll = new Date(poll.expireAt).getTime();
        const timestampActual = new Date().getTime();
        if (timestampActual > timestampPoll) return res.status(403).send("Essa enquete já foi finalizada!");

        //const timestamp = timestampActual;
        const date = new Date(timestampActual);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

        const token = uuid();

        await db.collection("Choices").updateOne(
            { _id: new ObjectId(_id) },
            { $set: { [`Time_${token}`]: formattedDate }, $inc: { votes: 1 } });
        //await db.collection("Polls")
        //    .updateOne({ _id: new ObjectId(choice.pollId) }, {
        //        $set: { "result.title": choice.title },
        //        $inc: { "result.votes": 1 }
        //    }, { upsert: true });
        res.status(201).send("Voto computado!");
    }
    catch (error) {
        console.log(error.message);
    }
}
