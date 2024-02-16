import { Document } from 'mongoose';

export default interface IWorkStationsPoleEmploi extends Document {
    name: String;
    codeROME: String;
    nafCodes: [String];
    definition: String;
    jobAccess: String;
    jobs: [Object];
    jobContext: [Object];
    skills: [Object];
    KnowHow: [Object];
}
