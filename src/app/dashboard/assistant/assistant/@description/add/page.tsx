"use client";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ModelsCombobox from "@/components/models-combobox";
import { Button } from "@/components/ui/button";
import { addAssistantAction } from "@/lib/actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

interface Props {}

const AssistantAddPage: NextPage<Props> = ({}) => {
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    description: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    console.log(formData);
  };

  const handleModelChange = (model: string) => {
    setFormData({ ...formData, model });
    console.log(formData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("model", formData.model);
    data.append("description", formData.description);
    if (selectedFile) {
      data.append("image", selectedFile);
    }
    try {
      await addAssistantAction(data);
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
    <div className="m-4">
      <form onSubmit={handleSubmit}>
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
          <ModelsCombobox onChange={handleModelChange}/>
        </div>
        <label>Description</label>
        <Input type="file" name="image" onChange={handleChange} required />
        <label>Description</label>
        <Textarea
          name="description"
          placeholder="Dr. Kaguya Shinomiya is a specialist..."
          value={formData.description}
          onChange={handleChange}
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

export default AssistantAddPage;
