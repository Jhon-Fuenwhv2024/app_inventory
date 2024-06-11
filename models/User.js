const {schema, models} = require.monngose

const UserSchema = Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'teacher']
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

module.exports = models('User', UserSchema);