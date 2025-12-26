import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    company_name: String,
    company_logo: String,
})

ex