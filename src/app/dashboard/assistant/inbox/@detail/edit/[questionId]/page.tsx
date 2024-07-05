"use client";
import { NextPage } from "next";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ModelsCombobox from "@/components/models-combobox";
import { Button } from "@/components/ui/button";
import {
  getQuestionAction,
  searchAssistantAction,
  updateAssistantAction,
  updateQuestionAction,
} from "@/lib/actions";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import prisma from "@/lib/db";

interface Params {
  params: {
    questionId: string;
  };
}

const QuestionEditPage: NextPage<Params> = ({ params }) => {
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [formData, setFormData] = useState({
    answer: "",
    pending: true,
    assistantName: "",
  });
  useEffect(() => {
    const fetchQuestion = async () => {
      const question = await getQuestionAction(params.questionId);
      if (question) {
        setFormData({
          answer: question.answer!,
          pending: question.pending,
          assistantName: question.assistant.name
        });
      }
      setIsLoading(false);
    };
    fetchQuestion();
  }, [params.questionId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("answer", formData.answer);
    data.append("questionId", params.questionId);
    data.append("pending", false.toString());
    console.log(formData);

    try {
      await updateQuestionAction(data);
      toast({
        title: "Answer Forwarded",
        description: `Response from Dr. ${formData.assistantName} Forwarded successfully`,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      
      router.push(`/dashboard/assistant/inbox/${params.questionId}`);
    } catch (error) {
      setIsError((error as Error).message || "An unknown error occurred");
      toast({
        title: "Error while processing data",
        description: isError,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="m-4">
        <label>Answer</label>
        <Textarea
          name="answer"
          placeholder="Dr. Kaguya Shinomiya is a specialist..."
          value={formData.answer}
          onChange={handleChange}
          className="h-52"
          required
        />
        <div className="flex justify-between pt-2">
          <Button type="reset" variant={"secondary"} onClick={()=>{
            router.back();
          }}>
            Cancel
          </Button>
          <Button type="submit" className="w-full">
            {isLoading ? "Loading" : "Forward"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QuestionEditPage;
