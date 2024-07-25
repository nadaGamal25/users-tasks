import mongoose,{ Schema, model } from "mongoose"

const categorySchema = new Schema({
    name: { 
        type: String,
        required: true 
    },
    user: { 
        type: mongoose.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
  });
  
export const Category = model('Category', categorySchema);