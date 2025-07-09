import { getBackgroundColor, getColorFromText } from "@/lib/utils";
import { Badge } from "./ui/badge";

type PostTagProps = {
  label: string;
};

const PostTag = ({ label }: PostTagProps) => {
  const textColor = getColorFromText(label);
  const bgColor = getBackgroundColor(textColor);

  return (
    <Badge
      className="text-[13px] rounded-full shadow-lg "
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </Badge>
  );
};

export default PostTag;
