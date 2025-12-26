import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    company_name: String,
    company_logo: String,
})

export default mongoose.model("Company", CompanySchema);

