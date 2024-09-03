const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  alumniId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Alumni' },
  alumni_name:{type:String,required:true,ref:'Alumni'},
  amount: { type: Number, required: true },
  message: { type: String },
}, {
  timestamps: true,
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;