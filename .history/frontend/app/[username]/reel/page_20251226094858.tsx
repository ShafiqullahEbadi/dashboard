"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import useAddExperience from "@/hooks/use-add-experience";
import useUpdateExperience from "@/hooks/use-update-experience";
import useDeleteExperience from "@/hooks/use-delete-experience";
import useGetExperience from "@/hooks/use-get-experience";
import { Experience } from "@/types/experiece";
import useGetReel from "@/hooks/use-get-reel";
import useAddReel from "@/hooks/use-add-reel";
import useUpdateReel from "@/hooks/use-update-reel";

const ReelPage: React.FC = () => {
  const { data: reels, isLoading, isError } = useGetReel();
  const addReel = useAddReel();
  const updateReel = useUpdateReel();
  const deleteReel = useDeleteReel();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);

  const [form, setForm] = useState<{
    title: string;
    description: string;
    company: string;
    technologies: string;
    startDate: string;
    endDate: string;
  }>({
    title: "",
    description: "",
    company: "",
    technologies: "",
    startDate: "",
    endDate: "",
  });

  const openAdd = () => {
    setForm({
      title: "",
      description: "",
      company: "",
      technologies: "",
      startDate: "",
      endDate: "",
    });
    setIsAddOpen(true);
  };

  const openEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setForm({
      title: experience.title,
      description: experience.description,
      company: experience.company,
      technologies: experience.technologies.join(", "),
      startDate: experience.startDate,
      endDate: experience.endDate,
    });
    setIsEditOpen(true);
  };

  const openDelete = (experience: Experience) => {
    setSelectedExperience(experience);
    setIsDeleteOpen(true);
  };

  const handleAdd = () => {
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    addExperience.mutate(payload, {
      onSuccess() {
        setIsAddOpen(false);
        queryClient.invalidateQueries({ queryKey: ["experience"] });
      },
    });
  };

  const handleUpdate = () => {
    if (!selectedExperience) return;

    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    updateExperience.mutate(
      {
        experience: payload,
        selectedExperience: selectedExperience,
      },
      {
        onSuccess() {
          setIsEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ["experience"] });
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedExperience || !selectedExperience._id) return;
    deleteExperience.mutate(selectedExperience._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["experience"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Experience</h1>
        <Button onClick={openAdd}>Add Experience</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
        </div>
      )}

      {isError && <div className="text-red-500">Failed to load experience</div>}

      {!isLoading && !isError && experiences?.length === 0 && (
        <div className="text-gray-600">No experience found.</div>
      )}

      {!isLoading && !isError && experiences?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {experiences.map((exp: Experience) => (
            <Card key={exp._id} className="p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary mt-1">
                  {exp.company}
                </p>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {exp.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openEdit(exp)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => openDelete(exp)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* DIALOGS */}
      {[
        {
          open: isAddOpen,
          setOpen: setIsAddOpen,
          title: "Add Experience",
          onSave: handleAdd,
        },
        {
          open: isEditOpen,
          setOpen: setIsEditOpen,
          title: "Edit Experience",
          onSave: handleUpdate,
        },
        {
          open: isDeleteOpen,
          setOpen: setIsDeleteOpen,
          title: "Confirm Delete",
          onSave: handleDelete,
        },
      ].map(({ open, setOpen, title, onSave }, idx) => (
        <Dialog key={idx} open={open} onOpenChange={setOpen}>
          <DialogContent className="w-full max-w-full sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {title !== "Confirm Delete" ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Senior Developer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Company</label>
                  <Input
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    placeholder="e.g. Google"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    placeholder="Describe your role and achievements"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Technologies (comma separated)
                  </label>
                  <Input
                    value={form.technologies}
                    onChange={(e) =>
                      setForm({ ...form, technologies: e.target.value })
                    }
                    placeholder="e.g. React, Node.js, TypeScript"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Input
                      value={form.startDate}
                      onChange={(e) =>
                        setForm({ ...form, startDate: e.target.value })
                      }
                      placeholder="e.g. Jan 2020"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Input
                      value={form.endDate}
                      onChange={(e) =>
                        setForm({ ...form, endDate: e.target.value })
                      }
                      placeholder="e.g. Present"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <p>
                Are you sure you want to delete {selectedExperience?.title} at{" "}
                {selectedExperience?.company}?
              </p>
            )}

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={onSave}>
                {title === "Confirm Delete" ? "Delete" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ExperiencesPage;
