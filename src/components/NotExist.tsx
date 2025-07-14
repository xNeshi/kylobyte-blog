type NotExistProps = {
  children?: React.ReactNode;
};

export const NotExist = ({ children }: NotExistProps) => {
  return <p className="text-gray-500 text-[30px] mt-20">{children}</p>;
};

export default NotExist;
