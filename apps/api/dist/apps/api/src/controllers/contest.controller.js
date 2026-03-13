"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAIQuestions = exports.getContests = exports.createContest = void 0;
const database_1 = require("@blitzquiz/database");
const validators_1 = require("../validators");
const generateAIres_1 = require("../services/generateAIres");
const createContest = async (req, res) => {
    try {
        const { title, description, startTime, endTime } = validators_1.createContestSchema.parse(req.body);
        const adminId = req.user.id;
        const contest = await database_1.prisma.contest.create({
            data: {
                title,
                description,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                adminId
            }
        });
        res.status(201).json(contest);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.createContest = createContest;
const getContests = async (req, res) => {
    const contests = await database_1.prisma.contest.findMany({
        include: { _count: { select: { questions: true } } }
    });
    res.json(contests);
};
exports.getContests = getContests;
const addAIQuestions = async (req, res) => {
    const { contestId, topic, count } = req.body;
    const questions = await (0, generateAIres_1.generateAIQuestions)(topic, count);
    if (questions.length === 0) {
        res.status(500).json({ message: 'Failed to generate questions' });
        return;
    }
    const createdQuestions = await Promise.all(questions.map((q) => database_1.prisma.mCQ.create({
        data: {
            ...q,
            contestId
        }
    })));
    res.json(createdQuestions);
};
exports.addAIQuestions = addAIQuestions;
