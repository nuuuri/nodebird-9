import { ChangeEvent, useCallback, useState } from "react";

export const useInput = (initialValue: string | number) => {
  const [value, setValue] = useState(initialValue);

  const handler = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return { value, setValue, handler };
};
