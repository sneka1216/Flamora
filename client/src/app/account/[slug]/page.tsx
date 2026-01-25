import Login from "@/components/Account/login";
import Register from "@/components/Account/register";
export const dynamicParams = true;
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Account = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <> {slug === "login" ? <Login /> : <Register />} </>;
};

export default Account;
