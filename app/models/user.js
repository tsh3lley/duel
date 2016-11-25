var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
    cookie: Number,
    history: [String],
    wins: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    ties: {type: Number, default: 0},
    games: {type: Number, default: 0}
});

module.exports = mongoose.model('User', UserSchema);