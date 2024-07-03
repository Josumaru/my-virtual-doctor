import { NextPage } from "next";

interface Props {
  text: string;
  onClick: (text: string) => void;
}

const QuestionCard: NextPage<Props> = ({ text, onClick }) => {
  return (
    <div
      className="md:w-44 md:h-44 lg:w-52 lg:h-52 bg-neutral-100 hover:bg-neutral-50 flex justify-center text-primary rounded-lg border p-5"
      onClick={() => onClick(text)}
    >
      <p>{text}</p>
    </div>
  );
};

export default QuestionCard;
