"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import useGetProjects from "@/hooks/use-get-projects";
import useAddProject from "@/hooks/use-add-projects";
import useUpdateProject from "@/hooks/use-update-projects";
import useDeleteProject from "@/hooks/use-delete-projects";
import { Project } from "@/types/project";

const ProjectsPage: React.FC = () => {
  const { data: projects, isLoading, isError } = useGetProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const [form, setForm] = useState<{
    title: string;
    description: string;
    category: string;
    image?: File | string;
  }>({
    title: "",
    description: "",
    category: "",
    image: undefined,
  });

  const openAdd = () => {
    setForm({ title: "", description: "", category: "", image: undefined });
    setIsAddOpen(true);
  };

  const openEdit = (project: Project) => {
    setSelectedProject(project);
    setForm({
      title: project.title,
      description: project.description,
      link: project.link || "",
      technologies: (project.technologies || []).join(", "),
      image: project.image,
    });
    setIsEditOpen(true);
  };

  const openDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
  };

  const buildTechs = (csv: string) => csv.split(",").map((t) => t.trim()).filter(Boolean);

  const handleAdd = () => {
    const techs = buildTechs(form.technologies);
    let payload: any = { title: form.title, description: form.description, link: form.link, technologies: techs };
    if (form.image && form.image instanceof File) {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("link", form.link);
      fd.append("image", form.image);
      fd.append("technologies", JSON.stringify(techs));
      payload = fd;
    }
    addProject.mutate(payload, {
      onSuccess() {
        setIsAddOpen(false);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };

  const handleUpdate = () => {
    if (!selectedProject) return;
    const techs = buildTechs(form.technologies);
    let payload: any = { title: form.title, description: form.description, link: form.link, technologies: techs };
    if (form.image && form.image instanceof File) {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("link", form.link);
      fd.append("image", form.image);
      fd.append("technologies", JSON.stringify(techs));
      payload = fd;
    }
    updateProject.mutate({ projectData: payload, projectId: selectedProject._id }, {
      onSuccess() {
        setIsEditOpen(false);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };

  const handleDelete = () => {
    if (!selectedProject) return;
    deleteProject.mutate(selectedProject._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={openAdd}>Add Project</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
        </div>
      )}

      {isError && <div className="text-red-500">Failed to load projects</div>}

      {!isLoading && !isError && projects?.length === 0 && (
        <div className="text-gray-600">No projects found.</div>
      )}

      {!isLoading && !isError && projects?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p: Project) => {
            const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";
            const backendOrigin = apiBase.replace(/\/api\/?$/, "");
            const imgSrc = p.image?.startsWith("http") ? p.image : `${backendOrigin}${p.image}`;
            return (
              <Card key={p._id} className="overflow-hidden">
                <div className="h-44 w-full relative bg-muted">
                  <Image src={imgSrc || avatar} alt={p.title} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(p.technologies || []).map((t) => (
                      <Badge key={t} variant="outline">{t}</Badge>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <Button size="sm" onClick={() => openEdit(p)}>Edit</Button>
                    <Button size="sm" variant="destructive" onClick={() => openDelete(p)}>Delete</Button>
                    {p.link && (
                      <a className="ml-auto text-primary" href={p.link} target="_blank" rel="noreferrer">View</a>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* DIALOGS */}
      {[ 
        { open: isAddOpen, setOpen: setIsAddOpen, title: "Add Project", onSave: handleAdd },
        { open: isEditOpen, setOpen: setIsEditOpen, title: "Edit Project", onSave: handleUpdate },
        { open: isDeleteOpen, setOpen: setIsDeleteOpen, title: "Confirm Delete", onSave: handleDelete }
      ].map(({ open, setOpen, title, onSave }, idx) => (
        <Dialog key={idx} open={open} onOpenChange={setOpen}>
          <DialogContent className="w-full max-w-full sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {title !== "Confirm Delete" ? (
              <div className="space-y-4">
                <label className="block font-medium">Title</label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Project title" />
                <label className="block font-medium">Description</label>
                <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description" />
                <label className="block font-medium">Link</label>
                <Input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." />
                <label className="block font-medium">Technologies (comma separated)</label>
                <Input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Node, Mongo" />
                <div>
                  <label className="block font-medium">Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setForm({ ...form, image: e.target.files?.[0] })} />
                </div>
              </div>
            ) : (
              <p>Are you sure you want to delete {selectedProject?.title}?</p>
            )}

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={onSave}>{title === "Confirm Delete" ? "Delete" : "Save"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ProjectsPage;
