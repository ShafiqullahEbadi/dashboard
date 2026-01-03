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

interface Reel {
  _id: string;
  title: string;
  reel: string;
  thumbnail: string;
}

const ReelPage: React.FC = () => {
  const { data: reels, isLoading, isError } = useGetReel();
  const addReel = useAddReel();
  const updateReel = useUpdateReel();
  const deleteReel = useDeleteReel();
  const queryClient = useQueryClient();

  const [playingId, setPlayingId] = useState<string | null>(null);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);

  const [form, setForm] = useState<{
    title: string;
    video: File | null;
    thumbnail: File | null;
  }>({
    title: "",
    video: null,
    thumbnail: null,
  });

  const openAdd = () => {
    setForm({ title: "", video: null, thumbnail: null });
    setIsAddOpen(true);
  };

  const openEdit = (reel: Reel) => {
    setSelectedReel(reel);
    setForm({ title: reel.title, video: null, thumbnail: null });
    setIsEditOpen(true);
  };

  const openDelete = (reel: Reel) => {
    setSelectedReel(reel);
    setIsDeleteOpen(true);
  };

  const handleAdd = () => {
    if (!form.title || !form.video || !form.thumbnail) return;

    addReel.mutate(
      {
        title: form.title,
        video: form.video,
        thumbnail: form.thumbnail,
      },
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
          thumbnail: form.thumbnail || undefined,
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
    if (!selectedReel) return;

    deleteReel.mutate(selectedReel._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["reel"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Motion Reels</h1>
        <Button onClick={openAdd}>Add New Reel</Button>
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p className="text-red-500">Failed to load reels</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reels?.map((reel: Reel) => (
          <Card key={reel._id} className="p-4 space-y-3">
            {/* PLAYABLE THUMBNAIL */}
            <div className="aspect-video rounded overflow-hidden bg-black relative">
              {playingId === reel._id ? (
                <video
                  src={reel.reel}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  onEnded={() => setPlayingId(null)}
                />
              ) : (
                <>
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Play overlay */}
                  <button
                    onClick={() => setPlayingId(reel._id)}
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                  >
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-xl font-bold">
                      ▶
                    </div>
                  </button>
                </>
              )}
            </div>

            <h3 className="font-semibold">{reel.title}</h3>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => openEdit(reel)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => openDelete(reel)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* DIALOGS */}
      {[
        { open: isAddOpen, setOpen: setIsAddOpen, title: "Add Reel", onSave: handleAdd },
        { open: isEditOpen, setOpen: setIsEditOpen, title: "Edit Reel", onSave: handleUpdate },
        { open: isDeleteOpen, setOpen: setIsDeleteOpen, title: "Confirm Delete", onSave: handleDelete },
      ].map(({ open, setOpen, title, onSave }, idx) => (
        <Dialog key={idx} open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            {title !== "Confirm Delete" ? (
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                />

                <Input
                  type="file"
                  accept="video/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      video: e.target.files?.[0] || null,
                    })
                  }
                />

                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setForm({
                      ...form,
                      thumbnail: e.target.files?.[0] || null,
                    })
                  }
                />
              </div>
            ) : (
              <p>Are you sure you want to delete "{selectedReel?.title}"?</p>
            )}

            <DialogFooter className="flex gap-2">
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

export default ReelPage;