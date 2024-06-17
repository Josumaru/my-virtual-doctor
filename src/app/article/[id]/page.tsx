import { NextPage } from "next";

interface Props {
  params: {
    id: string;
  };
}

const ArticleIdPage: NextPage<Props> = ({ params }) => {
  return <div>{params.id}</div>;
};

export default ArticleIdPage;
