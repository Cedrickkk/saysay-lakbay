import { FieldApi } from "@tanstack/react-form";

export default function FieldInfo({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: FieldApi<any, any, any, any>;
}) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors ? (
        <p className="text-xs text-destructive">
          {field.state.meta.errors.join(", ")}
        </p>
      ) : null}
    </>
  );
}
