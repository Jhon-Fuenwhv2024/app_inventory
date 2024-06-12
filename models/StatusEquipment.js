const { Schema, model} = require('mongoose')

const StatusEquipmentSchema = Schema({

    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive']
    },
    created_at: {
        type: Date,
        required: true
    },
    updated_at: {
        type: Date,
        required: true
    },
});

module.exports = model('StatusEquipment', StatusEquipmentSchema);