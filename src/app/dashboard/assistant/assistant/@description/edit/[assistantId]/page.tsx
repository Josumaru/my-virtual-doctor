"use client";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ModelsCombobox from "@/components/models-combobox";
import { Button } from "@/components/ui/button";
import { searchAssistantAction, updateAssistantAction } from "@/lib/actions";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import prisma from "@/lib/db";

interface Params {
  params: {
    assistantId: string;
  };
}

const AssistantEditPage: NextPage<Params> = ({ params }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    image: "",
  });
  useEffect(() => {
    const fetchAssistant = async () => {
      const assistant = await searchAssistantAction(params.assistantId);
      if (assistant) {
        setFormData({
          name: assistant.name,
          model: assistant.model,
          description: assistant.description,
          image: assistant.image,
        });
      }
      setIsLoading(false);
    };
    fetchAssistant();
  }, [formData, params.assistantId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] || null;
      setSelectedFile(file);
      setFormData({ ...formData, image: file?.name || "" });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleModelChange = (model: string) => {
    setFormData({ ...formData, model });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("model", formData.model);
    data.append("description", formData.description);
    data.append("assistantId", params.assistantId)
    if (selectedFile) {
      data.append("image", selectedFile);
    } else {
      data.append("image", formData.image);
    }
    try {
    console.log(data)

      await updateAssistantAction(data);
      console.log("Add Assistant");
      toast({
        title: "Assistant Added",
        description: `New Assistant added, Dr. ${formData.name}`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setFormData({
        name: "",
        model: "",
        description: "",
        image: "",
      });
      router.push("/dashboard/assistant");
    } catch (error) {
      setIsError((error as Error).message || "An unknown error occurred");
      toast({
        title: "Error",
        description: isError,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="m-4">
        <label>Assistant Name</label>
        <Input
          name="name"
          placeholder="Dr. Kaguya Shinomiya"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="mt-4">
          <label className="pr-4">Select Model</label>
          <ModelsCombobox initialValue={formData.model} onChange={handleModelChange} />
        </div>
        <label>Description</label>
        <Input type="file" name="image" onChange={handleChange}/>
        <label>Description</label>
        <Textarea
          name="description"
          placeholder="Dr. Kaguya Shinomiya is a specialist..."
          value={formData.description}
          onChange={handleChange}
          className="h-52"
          required
        />
        <div className="flex justify-between pt-2">
          <Button type="reset" variant={"secondary"}>
            Reset
          </Button>
          <Button type="submit" className="w-full">
            {isLoading ? "Loading" : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AssistantEditPage;
