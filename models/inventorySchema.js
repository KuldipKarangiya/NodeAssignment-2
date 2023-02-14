const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    inventory_name: {
      type: String,
      required: true,
    },
    inventory_category: {
      type: String,
      required:true,
    },
    expiry_time : {
        type: Number,
        required : true
    },
    quantity : {
        type:Number,
        required : true
    },
    manufacturing_time : {
        type : Number,
        required : true
    },
    inventory_image : {
        type : Buffer,
        required : true,
        contentType: String
    }

  });

 const task =  mongoose.model('inventory', inventorySchema);

 module.exports = task;