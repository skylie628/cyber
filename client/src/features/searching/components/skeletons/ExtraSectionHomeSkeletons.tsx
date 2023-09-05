import Skeleton from "react-loading-skeleton";
const ExtraSectionHomeSkeletons = (props: Record<string, any>) => {
  return (
    <>
      <div className="w-full xs:h-[20rem] lg:h-[24rem]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="w-full xs:h-[20rem] lg:h-[24rem]">
        <Skeleton className="h-full w-full" />
      </div>
    </>
  );
};
export default ExtraSectionHomeSkeletons;
