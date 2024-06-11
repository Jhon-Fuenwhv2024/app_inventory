const { schema, models } = require.monngose

const InventorySchema = Schema({

    serial: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    equipmentPhoto: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    dateBuy: {
        type: Date,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userRole: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    brandDefined: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    statusEquipmentDefined: {
        type: Schema.Types.ObjectId,
        ref: 'StatusEquipment',
        required: true
    },
    typeEquipmentDefined: {
        type: Schema.Types.ObjectId,
        ref: 'TypeEquipment',
        required: true
    }

});


module.exports = models('Inventory', InventorySchema);