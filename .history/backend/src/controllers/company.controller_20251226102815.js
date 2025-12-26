import Company from "../models/Company.js";
import cloudinary from "../lib/cloudinary.js";

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
    const { company_name } = req.body;
    const file = req.file;

    if (!company_name || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const uploadResponse = cloudinary.uploader.upload_stream(
      { folder: "companies" },
      async (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).json({
            message: "Cloudinary upload failed",
            details: error.message,
          });
        }

        try {
          const company = await Company.create({
            company_name,
            company_logo: result.secure_url,
          });
          res.status(201).json(company);
        } catch (dbError) {
          console.error("Database Error in createCompany:", dbError);
          res
            .status(500)
            .json({ message: "Failed to save company to database" });
        }
      }
    );

    uploadResponse.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { company_name } = req.body;
    const file = req.file;

    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (company_name) company.company_name = company_name;

    if (file) {
      const uploadResponse = cloudinary.uploader.upload_stream(
        { folder: "companies" },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({
              message: "Cloudinary upload failed",
              details: error.message,
            });
          }

          try {
            // Optional: delete old logo from cloudinary
            if (company.company_logo) {
              const publicId = company.company_logo
                .split("/")
                .pop()
                .split(".")[0];
              await cloudinary.uploader.destroy(`companies/${publicId}`);
            }

            company.company_logo = result.secure_url;
            await company.save();
            res.status(200).json(company);
          } catch (dbError) {
            console.error("Database Error in updateCompany:", dbError);
            res
              .status(500)
              .json({ message: "Failed to update company in database" });
          }
        }
      );
      uploadResponse.end(file.buffer);
    } else {
      await company.save();
      res.status(200).json(company);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    if (company.company_logo) {
      const publicId = company.company_logo.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`companies/${publicId}`);
    }

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
