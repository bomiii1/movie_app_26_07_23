import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[820px]">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="red"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
