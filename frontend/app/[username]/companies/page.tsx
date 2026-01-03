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
import useGetCompany from "@/hooks/use-get-company";
import useAddCompany from "@/hooks/use-add-company";
import useEditCompany from "@/hooks/use-edit-company";
import useDeleteCompany from "@/hooks/use-delete-company";
import Image from "next/image";

interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

const CompanyPage: React.FC = () => {
  const { data: companies, isLoading, isError } = useGetCompany();
  const addCompany = useAddCompany();
  const updateCompany = useEditCompany();
  const deleteCompany = useDeleteCompany();
  const queryClient = useQueryClient();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const [form, setForm] = useState<{
    name: string;
    logo: File | null;
  }>({
    name: "",
    logo: null,
  });

  const openAdd = () => {
    setForm({
      name: "",
      logo: null,
    });
    setIsAddOpen(true);
  };

  const openEdit = (company: Company) => {
    setSelectedCompany(company);
    setForm({
      name: company.company_name,
      logo: null,
    });
    setIsEditOpen(true);
  };

  const openDelete = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteOpen(true);
  };

  const handleAdd = () => {
    if (!form.name || !form.logo) return;

    addCompany.mutate(
      { name: form.name, logo: form.logo },
      {
        onSuccess() {
          setIsAddOpen(false);
          queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
      }
    );
  };

  const handleUpdate = () => {
    if (!selectedCompany) return;

    updateCompany.mutate(
      {
        id: selectedCompany._id,
        data: {
          name: form.name,
          logo: form.logo || undefined,
        },
      },
      {
        onSuccess() {
          setIsEditOpen(false);
          queryClient.invalidateQueries({ queryKey: ["companies"] });
        },
      }
    );
  };

  const handleDelete = () => {
    if (!selectedCompany || !selectedCompany._id) return;
    deleteCompany.mutate(selectedCompany._id, {
      onSuccess() {
        setIsDeleteOpen(false);
        queryClient.invalidateQueries({ queryKey: ["companies"] });
      },
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Companies</h1>
        <Button onClick={openAdd}>Add New Company</Button>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
          <div className="h-6 w-full bg-slate-200 animate-pulse" />
        </div>
      )}

      {isError && <div className="text-red-500">Failed to load companies</div>}

      {!isLoading && !isError && companies?.length === 0 && (
        <div className="text-gray-600">No companies found. Please add one.</div>
      )}

      {!isLoading && !isError && companies?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company: Company) => (
            <Card key={company._id} className="p-4 flex flex-col gap-4">
              <div className="aspect-video bg-muted rounded-md overflow-hidden relative flex items-center justify-center p-4">
                <Image
                  src={company.company_logo}
                  alt={company.company_name}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {company.company_name}
                </h3>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => openEdit(company)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => openDelete(company)}
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
          title: "Add Company",
          onSave: handleAdd,
        },
        {
          open: isEditOpen,
          setOpen: setIsEditOpen,
          title: "Edit Company",
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
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Google"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Logo File{" "}
                    {title === "Edit Company" &&
                      "(Leave empty to keep current)"}
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({
                        ...form,
                        logo: e.target.files ? e.target.files[0] : null,
                      })
                    }
                  />
                </div>
              </div>
            ) : (
              <p>
                Are you sure you want to delete the company "
                {selectedCompany?.company_name}
                "?
              </p>
            )}

            <DialogFooter className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={onSave}
                disabled={title === "Add Company" && (!form.name || !form.logo)}
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

export default CompanyPage;
