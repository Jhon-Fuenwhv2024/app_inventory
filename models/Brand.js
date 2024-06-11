const {schema, models} = require.monngose

const BrandSchema = Schema({

    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive']
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

module.exports = models('Brand', BrandSchema);