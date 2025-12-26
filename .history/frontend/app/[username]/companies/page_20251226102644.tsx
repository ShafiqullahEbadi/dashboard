"use client";
import React, { useState } from "react";
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
import useGetReel from "@/hooks/use-get-reel";
import useAddReel from "@/hooks/use-add-reel";
import useUpdateReel from "@/hooks/use-update-reel";
import useDeleteReel from "@/hooks/use-delete-reel";
import useGetCompany from "@/hooks/use-get-company";
import useAddCompany from "@/hooks/use-add-company";

interface Reel {
  _id: string;
  title: string;
  reel: string;
}

const CompanyPage: React.FC = () => {
  const { data: companies, isLoading, isError } = useGetCompany();
  const addCompany = useAddCompany();
  const updateCompany = useUpdateCompany();
  const deleteCompany = useDeleteCompany();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  const [form, setForm] = useState<{
    title: string;
    video: File | null;
  }>({
    title: "",
    video: null,
  });

  const openAdd = () => {
    setForm({
      title: "",
      video: null,
    });
    setIsAddOpen(true);
  };

  const openEdit = (reel: Reel) => {
    setSelectedReel(reel);
    setForm({
      title: reel.title,
      video: null,
    });
    setIsEditOpen(true);
  };

  const openDelete = (reel: Reel) => {
    setSelectedReel(reel);
    setIsDeleteOpen(true);
  };

  const handleAdd = () => {
    if (!form.title || !form.video) return;

    addReel.mutate(
      { title: form.title, video: form.video },
      {
        onSuccess() {
          setIsAddOpen(false);
          queryClient.invalidateQueries({ queryKey: ["reel"] });
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!selectedReel) return;

    updateReel.mutate(
      {
        reelId: selectedReel._id,
        reelData: {
          title: form.title,
          video: form.video || undefined,
        },
      },
      {
        onSuccess() {
          setIsEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ["reel"] });
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedReel || !selectedReel._id) return;
    deleteReel.mutate(selectedReel._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["reel"] });
      },
    });
  };

  const hasReel = reels && reels.length > 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Motion Reel</h1>
        <Button onClick={openAdd} disabled={hasReel}>
          {hasReel ? "Reel Already Exists" : "Add New Reel"}
        </Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
        </div>
      )}

      {isError && <div className="text-red-500">Failed to load reels</div>}

      {!isLoading && !isError && reels?.length === 0 && (
        <div className="text-gray-600">No reels found. Please add one.</div>
      )}

      {!isLoading && !isError && reels?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reels.map((reel: Reel) => (
            <Card key={reel._id} className="p-4 flex flex-col gap-4">
              <div className="aspect-video bg-black rounded-md overflow-hidden">
                <video
                  src={reel.reel}
                  className="w-full h-full object-cover"
                  controls
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{reel.title}</h3>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openEdit(reel)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => openDelete(reel)}
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
          title: "Add Reel",
          onSave: handleAdd,
        },
        {
          open: isEditOpen,
          setOpen: setIsEditOpen,
          title: "Edit Reel",
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
              <div className="space-y-4 p-1">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. My Motion Reel 2024"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Video File{" "}
                    {title === "Edit Reel" && "(Leave empty to keep current)"}
                  </label>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        video: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <p>
                Are you sure you want to delete the reel "{selectedReel?.title}
                "?
              </p>
            )}

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={onSave}
                disabled={title === "Add Reel" && (!form.title || !form.video)}
              >
                {title === "Confirm Delete" ? "Delete" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default ReelPage;
