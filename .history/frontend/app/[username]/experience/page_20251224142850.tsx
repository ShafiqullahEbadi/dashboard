"use client";

import useGetMessages from "@/hooks/use-get-messages";
import React, { useState } from "react";
import { axiosInstance } from "@/lib/api-services";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Message = {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
};

const MessagesPage: React.FC = () => {
  const { data: messages } = useGetMessages();
  const qc = useQueryClient();
  const list = (messages as Message[]) ?? [];

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!deletingId) return;
    try {
      await axiosInstance.delete(`/message/${deletingId}`);
      qc.invalidateQueries({ queryKey: ["messages"] });
      setDeletingId(null);
    } catch (err) {
      console.error("Failed to delete message", err);
      alert("Failed to delete message");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No messages have been received yet.
        </p>
      ) : (
        <div className="space-y-4">
          {list.map((msg: Message, idx: number) => (
            <div
              key={msg._id ?? idx}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-slate-800">
                    {msg.firstName} {msg.lastName}
                  </p>
                  <p className="text-xs text-slate-500">{msg.email}</p>
                </div>
              </div>

              <p className="italic text-sm mt-3 text-slate-600">
                {msg.subject}
              </p>
              <p className="mt-2 text-slate-700 leading-relaxed">
                {msg.message}
              </p>

              <div className="mt-4 flex justify-end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      onClick={() => setDeletingId(msg._id ?? null)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Delete this message?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. The message from{" "}
                        <span className="font-medium">
                          {msg.firstName} {msg.lastName}
                        </span>{" "}
                        will be permanently removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => setDeletingId(null)}
                        className="rounded-lg"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        className="bg-red-600 hover:bg-red-700 rounded-lg"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
