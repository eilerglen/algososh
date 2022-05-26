import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

type TForm = {
  name: string;
  value: string;
};
export const StringComponent: React.FC = () => {
  const [form, setForm] = React.useState({});
  console.log(form);

  const onChange = (event: React.ChangeEvent<TForm>) => {
    setForm({ ...form, [event.target.value]: event.target.value });
  };
  return (
    <SolutionLayout title="Строка">
      <div>
        <input type="text" onChange={onChange} />
        <button> Развернуть</button>
      </div>
      <div>
        {/* {form} */}
      </div>
    </SolutionLayout>
  );
};
