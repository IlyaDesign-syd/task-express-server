import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  auth0Id: { type: String, required: true, unique: true },
  projId: { type: String, required: true, unique: true },
  projName: { type: String, required: true },
  projDescription: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export const Project = mongoose.model('projects', projectSchema);