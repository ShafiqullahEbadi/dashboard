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

    if (!title || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    log

    const existingProject = await Project.findOne({ title });
    if (existingProject) {
      return res
        .status(400)
        .json({ message: "Project with this title already exists" });
    }

    // ✅ image MUST be base64 or URL
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: "projects",
    });

    const newProject = await Project.create({
      title,
      description,
      category,
      image: uploadResponse.secure_url,
    });

    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error in createProject Controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function updateProject(req, res) {
  try {
    const { title, description, image, category } = req.body;
    console.log(typeof image);
    console.log(image);

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (title) project.title = title;
    if (description) project.description = description;
    if (category) project.category = category;

    if (image) {
      
      
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: "projects",
      });
      project.image = uploadResponse.secure_url;
    }

    await project.save();
    res.status(200).json(project);
  } catch (error) {
    console.error("Error in updateProject Controller:", error);
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
