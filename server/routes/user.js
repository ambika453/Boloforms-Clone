import express from "express";
import { categorize_model, cloze_model, comprehension_model, user_model } from "../mongodb/models/form.js";

const user_router = express.Router();

user_router.route('/get').get(async(req,res)=>{
    try{
        const users  = await user_model.find({})
        res.status(201).json({ success: true, data: users});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/:uid/get').get(async(req,res)=>{
    const uid = req.params.uid;
    try{
        const user  = await user_model.findOne({_id:uid })
        if (user) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'Response not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/post').post(async(req,res)=>{
    try{
        const { fname, lname, email, password, forms, responses } = req.body;

        const form = await user_model.create({ fname, lname, email, password, forms, responses });

        res.status(201).json({ success: true, data: form});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/:uid/update').put(async(req,res)=>{
    const _id = req.params.uid;
    try{
        const { fname, lname, email, password, forms, responses } = req.body;

        const update = { fname, lname, email, password, forms, responses };

        const updatedUser = await user_model.findOneAndUpdate({ _id: _id }, update, { new: true });

        if (updatedUser) {
            res.status(200).json({ success: true, data: updatedUser });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/:uid/delete').delete(async(req,res)=>{
    const _id = req.params.uid;
    try{
        const deletedUser = await user_model.findOneAndDelete({ _id: _id });

        if (deletedUser) {
            res.status(200).json({ success: true, data: deletedUser });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

export default user_router;