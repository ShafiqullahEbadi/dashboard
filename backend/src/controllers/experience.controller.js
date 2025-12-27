import Experience from "../models/Experience.js";

export const addExperienceController = async (req, res) => {
  try {
    const { title, company, description, technologies, startDate, endDate } =
      req.body;

    if (
      !title ||
      !company ||
      !description ||
      !technologies ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExperience = new Experience({
      title,
      company,
      description,
      technologies,
      startDate,
      endDate,
    });

    await newExperience.save();

    res.status(201).json(newExperience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllExperienceController = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({createdAt: -1});
    res.status(200).json(experiences);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateExperienceController = async (req, res) => {
  try {
    const { title, company, description, technologies, startDate, endDate } =
      req.body;
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      {
        title,
        company,
        description,
        technologies,
        startDate,
        endDate,
      },
      { new: true }
    );
    res.status(200).json(experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteExperienceController = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json(experience);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
