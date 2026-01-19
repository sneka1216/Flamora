import useAccount from "@/utils/hooks/useAccount";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  guest: boolean;
  setGuest: (guest: boolean) => void;
};
const GustUserConsent = ({ guest, setGuest }: Props) => {
  const { guestUserLogin } = useAccount();
  const consentData = [
    "Your cart and activity may be saved temporarily Some features may be limited our data will only be stored for improving your experience",
  ];
  const router = useRouter();
  return (
    <div
      className={`${
        guest ? "hidden" : "block"
      } w-130  absolute  border top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 shadow-lg flex flex-col items-center `}
    >
      <div className="m-2 text-lg font-semibold">
        <p>Guest User Consent</p>
      </div>

      <div className="border-sm">
        {consentData?.map((i: string, index: number) => (
          <p key={index} className="text-sm ">
            {i}
          </p>
        ))}
      </div>
      <div className="m-2">
        <button
          type="button"
          onClick={() => {
            setGuest(true);
            guestUserLogin();
            router.push("/");
          }}
          className="w-50 bg-black p-2 text-white text-sm cursor-pointer"
        >
          GUEST LOGIN
        </button>
      </div>
      <p onClick={() => setGuest(true)} className="text-sm">
        REGISTER OR LOGIN
      </p>
    </div>
  );
};

export default GustUserConsent;
