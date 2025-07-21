import Login from "@/components/Account/login";
import Register from "@/components/Account/register";

interface PageProps {
  params: {
    slug: string;
  };
}

const Account = ({ params }: PageProps) => {
  const { slug } = params;

  return <> {slug === "login" ? <Login /> : <Register />} </>;
};

export default Account;
