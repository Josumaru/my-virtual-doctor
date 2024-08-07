"use server";
import { auth, signOut } from "@/auth";
import prisma from "./db";
import { put } from "@vercel/blob";

const url = process.env.VIDO_API;

const UpdateNewUserAction = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    let imageUrl = formData.get("imageUrl") as string;
    const imageFile = formData.get("image") as File | null;

    if (imageFile) {
      const uploadResult = await put(imageFile.name, imageFile, {
        access: "public",
      });
      imageUrl = uploadResult.url;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name,
        image: imageUrl,
      },
    });
    
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user:", error);
    throw new Error("Failed to update user");
  }
};

const addAssistantAction = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const model = formData.get("model") as string;
    const description = formData.get("description") as string;
    const image = formData.get("image") as File;

    let { url } = await put(image.name, image, {
      access: "public",
    });

    const assistant = await prisma.assistant.create({
      data: {
        name: name,
        model: model,
        description: description,
        image: url,
      },
    });
    return assistant;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const getAssistantAction = async () => {
  const assistant = await prisma.assistant.findMany({
    orderBy: {
      point: "desc"
    }
  });
  return assistant
};

const searchAssistantAction = async (assistantId: string) => {
  return await prisma.assistant.findFirst({
    where: {
      assistantId: assistantId,
    },
  });
};

const deleteAssistantAction = async (assistantId: string | undefined) => {
  return await prisma.assistant.delete({
    where: {
      assistantId: assistantId,
    },
  });
};

const deleteQuestionAction = async (questionId: string | undefined) => {
  return await prisma.question.delete({
    where: {
      questionId: questionId,
    },
  });
};

const updateAssistantAction = async (formData: FormData) => {
  try {
    const name = formData.get("name") as string;
    const model = formData.get("model") as string;
    const description = formData.get("description") as string;
    const assistantId = formData.get("assistantId") as string;

    let url = formData.get("image") as string;
    const imageFile = formData.get("image") as File | null;

    if (imageFile) {
      const uploadResult = await put(imageFile.name, imageFile, {
        access: "public",
      });
      url = uploadResult.url;
    }

    const assistant = await prisma.assistant.update({
      where: { assistantId: assistantId },
      data: {
        name: name,
        model: model,
        description: description,
        image: url,
      },
    });
    return assistant;
  } catch (error) {
    return error;
  }
};

const updateQuestionAction = async (formData: FormData) => {
  try {
    const answer = formData.get("answer") as string;
    const pending = formData.get("pending") as string;
    const questionId = formData.get("questionId") as string;
    console.log(formData);

    const assistant = await prisma.question.update({
      where: { questionId: questionId },
      data: {
        pending: pending == "true" ? true : false,
        answer: answer,
      },
    });
    return assistant.answer;
  } catch (error) {
    return error;
  }
};

const forwardQuestionAction = async (questionId: string, assistantId: string) => {
  try {
    const question = await prisma.question.update({
      where: { questionId: questionId },
      data: {
        pending: false,
      },
    });
    const assistant = await prisma.assistant.findFirst({
      where: {
        assistantId: assistantId,
      }
    })
    const point = assistant?.point! + 15
    
    await prisma.assistant.update({
      where: {assistantId: assistantId},
      data: {
        point: point
      }
    })
    return question.answer;
  } catch (error) {
    console.log(error);

    return error;
  }
};

const getQuestionsAction = async (userId: string, assistantId: string) =>
  await prisma.question.findMany({
    where: {
      userId: userId,
      assistantId: assistantId,
    },
    include: {
      user: {},
      assistant: {},
    },
    orderBy: [
      {
        createdAt: "asc",
      },
    ],
  });

const getAllQuestionsAction = async () =>{
  return await prisma.question.findMany({
    include: {
      user: {},
      assistant: {},
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
}

const getQuestionAction = async (questionId: string) =>
  await prisma.question.findFirst({
    where: {
      questionId: questionId,
    },
    include: {
      assistant: {},
      user: {},
    },
  });

const addQuestionAction = async (
  assistantId: string,
  userId: string,
  question: string
) => {
  let questionId;
  const questionData = await prisma.question.create({
    data: {
      assistantId: assistantId,
      userId: userId,
      question: question,
    },
  });
  questionId = questionData.questionId;

  const data = {
    data: question,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url!, options)
    .then((response) => response.json())
    .catch((error) => console.error("Error:", error));

  const questionUpdate = await prisma.question.update({
    where: {
      questionId: questionId,
    },
    data: {
      answer: response.result.replace("**Cute Response:**", "").replace("**Tsundere Response:**",""),
    },
  });
  return questionUpdate;
};

const getUserAction = async () => {
  const session = await auth();
  const user = session?.user;
  return user;
};

const logoutAction = async () => {
  await signOut();
};

export {
  addAssistantAction,
  getAssistantAction,
  deleteAssistantAction,
  searchAssistantAction,
  updateAssistantAction,
  getQuestionsAction,
  addQuestionAction,
  getUserAction,
  logoutAction,
  getQuestionAction,
  deleteQuestionAction,
  updateQuestionAction,
  forwardQuestionAction,
  getAllQuestionsAction,
  UpdateNewUserAction,
};
