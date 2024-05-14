import mongoose from 'mongoose';
// Define a schema for the form data
const groomSchema = new mongoose.Schema({
  gender: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  martialStatus: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  height: { type: Number, required: true },

  qualification: { type: String },
  collegeUniversity: { type: String },
  job: { type: String, },
  income: { type: String},
  religion: { type: String, required: true },
  sect: { type: String, required: true },
  cast: { type: String, required: true },
  home: { type: String, required: true },
  size: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String },
  migration: { type: String, required: true },
  nationality: { type: String, required: true },
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  brothers: { type: Number},
  sisters: { type: Number },
  marriedBrothers: { type: Number },
  marriedSisters: { type: Number  },
  requirements:{
    requiredAge:{ type: Number },
    requiredHeight:{ type: Number },
    requiredCity:{ type: String, required: true },
    requiredCast:{ type: String, required: true },
    requiredQualification:{ type: String, required: true },
    requiredSect:{ type: String, required: true },
  },
  photo: { data: Buffer, contentType: String } // Photo field to store image data and content type
});


// Create a model based on the schema
export default mongoose.model("groom", groomSchema);
