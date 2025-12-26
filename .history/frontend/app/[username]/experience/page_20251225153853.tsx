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
import useGetExperiences from "@/hooks/use-get-Experiences";
import { Experience } from "@/types/Experience";
import useAddExperience from "@/hooks/use-add-experience";
import useUpdateExperience from "@/hooks/use-update-experience";
import useDeleteExperience from "@/hooks/use-delete-experience";
import useGetExperience from "@/hooks/use-get-experience";
import { Experience } from "@/types/experiece";

const ExperiencesPage: React.FC = () => {
  const { data: Experiences, isLoading, isError } = useGetExperience();
  const addExperience = useAddExperience();
  const updateExperience = useUpdateExperience();
  const deleteExperience = useDeleteExperience();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

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
    setForm({ title: "", description: "", company: "", technologies: "", startDate: "", endDate: "" });
    setIsAddOpen(true);
  };

  const openEdit = (Experience: Experience) => {
    setSelectedExperience(Experience);
    setForm({
      title: Experience.title,
      description: Experience.description,
      company: Experience.company,
      technologies: Experience.technologies,
      startDate: Experience.startDate,
      endDate: Experience.endDate,
    });
    setIsEditOpen(true);
  };

  const openDelete = (Experience: Experience) => {
    setSelectedExperience(Experience);
    setIsDeleteOpen(true);
  };

  const handleAdd = () => {
    if (!form.image || !(form.image instanceof File)) {
      alert("Image is required");
      return;
    }

    const payload = {
      title: form.title,
      description: form.description,
      category: form.category,
      technologies: from, // Base64 string
    };

      addExperience.mutate(payload, {
        onSuccess() {
          setIsAddOpen(false);
          queryClient.invalidateQueries({ queryKey: ["experience"] });
        },
      });
    };

    reader.readAsDataURL(form.image);
  };

  const handleUpdate = () => {
    if (!selectedExperience) return;

    if (form.image instanceof File) {
      const reader = new FileReader();

      reader.onloadend = () => {
        updateExperience.mutate(
          {
            ExperienceId: selectedExperience._id,
            ExperienceData: {
              title: form.title,
              description: form.description,
              category: form.category,
              image: reader.result, // ✅ base64
            },
          },
          {
            onSuccess() {
              setIsEditOpen(false);
              queryClient.invalidateQueries({ queryKey: ["Experiences"] });
            },
          }
        );
      };

      reader.readAsDataURL(form.image);
    } else {
      updateExperience.mutate(
        {
          ExperienceId: selectedExperience._id,
          ExperienceData: {
            title: form.title,
            description: form.description,
            category: form.category,
          },
        },
        {
          onSuccess() {
            setIsEditOpen(false);
            queryClient.invalidateQueries({ queryKey: ["Experiences"] });
          },
        }
      );
    }
  };

  const handleDelete = () => {
    if (!selectedExperience) return;
    deleteExperience.mutate(selectedExperience._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["Experiences"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Reel</h1>
        <Button onClick={openAdd}>Add Reel</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
        </div>
      )}

      {isError && <div className="text-red-500">Failed to load reel</div>}

      {!isLoading && !isError && Experiences?.length === 0 && (
        <div className="text-gray-600">No reel found.</div>
      )}

      {!isLoading && !isError && Experiences?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Experiences.map((p: Experience) => {
            const apiBase =
              process.env.NEXT_PUBLIC_API_BASE_URL ||
              "http://localhost:5000/api";
            const backendOrigin = apiBase.replace(/\/api\/?$/, "");
            const imgSrc = p.image?.startsWith("http")
              ? p.image
              : `${backendOrigin}${p.image}`;
            return (
              <Card key={p._id} className="overflow-hidden">
                <div className="h-44 w-full relative bg-muted">
                  <Image
                    src={imgSrc}
                    alt={p.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {p.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2 items-center">
                    <Button size="sm" onClick={() => openEdit(p)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDelete(p)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
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
              <div className="space-y-4">
                <label className="block font-medium">Title</label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Experience title"
                />

                <div>
                  <label className="block font-medium">Image</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files?.[0] })
                    }
                  />
                </div>
              </div>
            ) : (
              <p>Are you sure you want to delete {selectedExperience?.title}?</p>
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
