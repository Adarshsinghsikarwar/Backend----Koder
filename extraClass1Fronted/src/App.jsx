import { useEffect } from "react";
import { useState } from "react";
// import { api } from "./api/apiConfig";

const App = () => {
  const [data, setData] = useState("");

  async function getNote() {
    const data1 = await api.get("/notes");
    setData(data1.data.message);
  }

  useEffect(() => {
    getNote();
  }, []);
  return <div className="text-3xl">{data}</div>;
};

export default App;
