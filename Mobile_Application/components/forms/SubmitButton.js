import React from "react";
import { useFormikContext } from "formik";

import ButtonRoundCorner from "../ButtonRoundCorner";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <ButtonRoundCorner title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
