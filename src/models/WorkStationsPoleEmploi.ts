import { Schema, model } from 'mongoose';
import IWorkStationsPoleEmploi from '../interfaces/WorkStationsPoleEmploi';

const WorkStationsPoleEmploiSchema = new Schema<IWorkStationsPoleEmploi>({
    name: String,
    codeROME: String,
    nafCodes: [String],
    definition: String,
    jobAccess: String,
    jobs: [Object],
    jobContext: [Object],
    skills: [Object],
    KnowHow: [Object]
});

const WorkStationsPoleEmploi = model<IWorkStationsPoleEmploi>('WorkStationsPoleEmploi', WorkStationsPoleEmploiSchema);
export default WorkStationsPoleEmploi;
