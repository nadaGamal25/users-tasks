import mongoose,{ Schema, model } from "mongoose"

const taskSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    body: { 
        type: String 
    },
    listItems: [{ textBody: { type: String } }],
    type: { 
        type: String, 
        enum: ['text', 'list'], 
        required: true 
    },
    shared: { 
        type: String, 
        enum: ['public', 'private'],
        default: 'public' ,
        required: true 
    },
    category: { 
        type: mongoose.Types.ObjectId, 
        ref: 'Category', 
        required: true 
    },
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
  });
  
export const Task = model('Task', taskSchema);