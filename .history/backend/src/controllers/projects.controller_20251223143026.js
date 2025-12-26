import Project from "../models/Project.js";
import cloudinary from "../lib/cloudinary.js";

export async function getProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).send(projects);
  } catch (error) {
    console.error("Error in getProjects Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createProject(req, res) {
  try {
    const { title, description, image, category } = req.body;
    if (
      !title ||
      !description ||
      !image || 
      !category
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const existingProject = await Project.findOne({ link });
    if (existincloudinarygProject) {
      return res
        .status(400)
        .send({ message: "Project with this link already exists" });
    }

    let imageUrl;
    if (image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newProject = await Project.create({
      title,
      description,
      image: imageUrl,
      category: category,
    });

    res.status(201).send(newProject);
  } catch (error) {
    console.error("Error in createProject Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateProject(req, res) {
  try {
    const { title, description, link, image, technologies } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send({ message: "Project not found" });
    }

    const updatedImage = await cloudinary.uploader.upload(image);

    const updatedProject = await project.save();
    if (!updatedProject) {
      return res.status(404).send({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error in updateProject Controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteProject(req, res) {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).send({ message: "Project not found" });
    }
    
    if (deletedProject.image) {
      await cloudinary.uploader.destroy(deletedProject.image);
    }

    res.status(200).send({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error while deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
