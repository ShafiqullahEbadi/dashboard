import Company from "../models/Company.js";

export const getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createCompany = async (req, res) => {
    try {
        const { company_name, company_logo } = req.body;

        if ()
        const company = await Company.create({ company_name, company_logo });
        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    