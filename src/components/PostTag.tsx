import { getBackgroundColor, getColorFromText } from "@/lib/utils";
import { Badge } from "./ui/badge";

type PostTagProps = {
  label: string;
  className?: string;
};

const PostTag = ({ label, className }: PostTagProps) => {
  const textColor = getColorFromText(label);
  const bgColor = getBackgroundColor(textColor);

  return (
    <Badge
      className={`text-[13px] rounded-full shadow-lg ${className}`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      {label}
    </Badge>
  );
};

export default PostTag;
