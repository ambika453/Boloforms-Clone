import mongoose from "mongoose";

const items = new mongoose.Schema({
    option: { type: String, required: false },
    category: { type: String, required: false }
})

const categorize = new mongoose.Schema({
    description: { type: String, required: false },
    categories: [{ type: String }],
    items: [items]
})

const cloze = new mongoose.Schema({
    description: { type: String, required: false },
    preview: { type: String, required: false },
    sentence: { type: String, required: false },
    options: [{ type: String }]
})

const subQuestions = new mongoose.Schema({
    description: { type: String, required: false },
    options: [{ type: String }]
})

const comprehension = new mongoose.Schema({
    description: { type: String, required: false },
    paragraph: { type: String, required: false },
    subQuestion: [subQuestions]
})

const form_create = new mongoose.Schema({
    name: { type: String, required: false },
    questions: [Object]
})

const form_response = new mongoose.Schema({
    form_id: { type: String, required: true},
    email: { type: String, required: true},
    responses: [Object]
})

const user = new mongoose.Schema({
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    forms: [form_create],
    responses: [form_response]
})

const categorize_model = mongoose.model('categorize', categorize);
const cloze_model = mongoose.model('cloze', cloze);
const comprehension_model = mongoose.model('comprehension', comprehension);
const user_model = mongoose.model('user', user);

export { categorize_model, cloze_model, comprehension_model, user_model };