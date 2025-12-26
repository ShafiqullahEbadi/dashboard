import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    company_name: String,
    company_logo: String,
    company_description: String,
    company_address: String,
    company_phone: String,
    company_email: String,
    company_website: String,
    company_status: String,
    company_created_at: Date,
    company_updated_at: Date,
})