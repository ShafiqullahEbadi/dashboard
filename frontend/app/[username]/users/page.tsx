"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useGetUsers from "@/hooks/use-get-users";
import useSignUp from "@/hooks/use-sign-up";
import { useQueryClient } from "@tanstack/react-query";
import useEditUser from "@/hooks/use-edite-user";
import useDeleteUser from "@/hooks/use-delete-user";

const UsersPage = () => {
  const { data: users, isLoading, isError } = useGetUsers();
  const addUser = useSignUp();
  const editUser = useEditUser();
  const deleteUser = useDeleteUser();
  const queryClient = useQueryClient();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const [editedUser, setEditedUser] = useState({
    fullName: "",
    email: "",
  });
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  // Validation errors
  const [addErrors, setAddErrors] = useState<any>({});
  const [editErrors, setEditErrors] = useState<any>({});

  // ------------------- VALIDATION FUNCTIONS -------------------
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateAddUser = () => {
    const errors: any = {};
    if (!user.fullName.trim()) errors.fullName = "Full name is required.";
    if (!user.email.trim()) errors.email = "Email is required.";
    else if (!validateEmail(user.email))
      errors.email = "Please enter a valid email.";
    if (!user.password.trim()) errors.password = "Password is required.";
    else if (user.password.length < 6)
      errors.password = "Password must be at least 6 characters.";
    setAddErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEditUser = () => {
    const errors: any = {};
    if (!editedUser.fullName.trim()) errors.fullName = "Full name is required.";
    if (!editedUser.email.trim()) errors.email = "Email is required.";
    else if (!validateEmail(editedUser.email))
      errors.email = "Please enter a valid email.";
    setEditErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ------------------- CRUD HANDLERS -------------------
  const openEditModal = (user: any) => {
    setSelectedUser(user);
    setEditedUser(user);
    setEditErrors({});
    setIsEditOpen(true);
  };

  const openDeleteModal = (user: any) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleAddUser = () => {
    if (!validateAddUser()) return;

    addUser.mutate(user, {
      onSuccess: () => {
        setIsAddUserOpen(false);
        setUser({ fullName: "", email: "", password: "" });
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
      onError: (error) => console.error("Error adding user:", error),
    });
  };

  const handleEditSave = () => {
    if (!validateEditUser()) return;

    editUser.mutate(
      { editedData: editedUser, selectedUser },
      {
        onSuccess: () => {
          setIsEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
      }
    );
  };

  const handleDeleteConfirm = () => {
    deleteUser.mutate(selectedUser._id, {
      onSuccess: () => {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    });
  };

  // ------------------- ENTER KEY SUPPORT -------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid triggering while typing inside inputs
      if (e.key === "Enter" && e.target instanceof HTMLElement && e.target.tagName !== "INPUT") {
        if (isEditOpen) handleEditSave();
        if (isAddUserOpen) handleAddUser();
        if (isDeleteOpen) handleDeleteConfirm();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEditOpen, isAddUserOpen, isDeleteOpen, editedUser, user, selectedUser]);

  // ------------------- UI -------------------
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Users</h1>
        <Button onClick={() => setIsAddUserOpen(true)}>Add User</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      )}

      {isError && (
        <p className="text-red-500 font-medium">
          Failed to load users. Please try again later.
        </p>
      )}

      {!isLoading && !isError && users && users.length === 0 && (
        <p className="text-gray-600">No members found.</p>
      )}

      {!isLoading && !isError && (
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: any, index: number) => (
                <TableRow
                  key={user._id}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-gray-900"
                      : "bg-gray-50 dark:bg-gray-800"
                  }
                >
                  <TableCell className="font-medium">{user._id}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openEditModal(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => openDeleteModal(user)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* ------------------- EDIT USER MODAL ------------------- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block font-medium">Full Name</label>
            <Input
              value={editedUser.fullName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, fullName: e.target.value })
              }
              placeholder="Enter new full name"
            />
            {editErrors.fullName && (
              <p className="text-red-500 text-sm">{editErrors.fullName}</p>
            )}

            <label className="block font-medium">Email</label>
            <Input
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              placeholder="Enter new email"
            />
            {editErrors.email && (
              <p className="text-red-500 text-sm">{editErrors.email}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- ADD USER MODAL ------------------- */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <label className="block font-medium">Full Name</label>
            <Input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder="Enter Full Name"
            />
            {addErrors.fullName && (
              <p className="text-red-500 text-sm">{addErrors.fullName}</p>
            )}

            <label className="block font-medium">Email</label>
            <Input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter Email"
            />
            {addErrors.email && (
              <p className="text-red-500 text-sm">{addErrors.email}</p>
            )}

            <label className="block font-medium">Password</label>
            <Input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter Password"
            />
            {addErrors.password && (
              <p className="text-red-500 text-sm">{addErrors.password}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ------------------- DELETE CONFIRMATION ------------------- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete {selectedUser?.fullName}?</p>
          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersPage;
