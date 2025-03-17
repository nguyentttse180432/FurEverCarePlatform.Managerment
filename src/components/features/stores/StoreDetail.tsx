import { Spin } from "antd";
import { useFetchStore } from "../../../hooks/store/useFetchStore";

type StoreDetailProps = {
  id: string;
};

const StoreDetail = ({ id }: StoreDetailProps) => {
  const { data: store, isLoading, error } = useFetchStore(id);

  if (isLoading) {
    return <Spin />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <h1>{store?.name}</h1>
      <p>{store?.hotline}</p>
    </>
  );
};

export default StoreDetail;
