type FormErrorMessageProps = React.ComponentPropsWithoutRef<"p" | "div"> & {
  error: Record<string, string> | undefined;
  errorFor: string;
  isMultiLine?: boolean;
};

export const FormErrorMessage = ({
  error,
  errorFor,
  isMultiLine = false,
  ...props
}: FormErrorMessageProps) => {
  const errorMessage = error?.[errorFor];

  return (
    <>
      {isMultiLine
        ? errorMessage && (
            <div
              {...props}
              className="text-red-500 text-[11px] mphone:text-[14px] mt-1"
            >
              {errorMessage.split(". ").map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )
        : errorMessage && (
            <p
              {...props}
              className="text-red-500 text-[11px] mphone:text-[14px] mt-1"
            >
              {errorMessage}
            </p>
          )}
    </>
  );
};

export default FormErrorMessage;
