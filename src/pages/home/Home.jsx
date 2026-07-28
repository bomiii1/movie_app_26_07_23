import { useEffect, useState } from "react";
import Loading from "../../components/Loading";

export default function Home() {
  useEffect(() => {});
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <Loading />;
  }

  return <div></div>;
}
