import PostTag from "@/components/PostTag";
import { inter } from "../../../../public/font";

export default function BlogPostPage() {
  return (
    <>
      <article className="flex flex-col justify-center p-6  min-[1280px]:px-0 gap-3 tablet:gap-5">
        <h3 className="text-[14px] text-[var(--date-foreground)] font-semibold">
          Sunday, 1 Jan 2023
        </h3>
        <h1 className={`${inter.className} text-[23px] font-bold`}>
          Grid system for better Design User Interface
        </h1>
        <div className="flex items-center gap-2 mb-1">
          <PostTag label="UX" />
          <PostTag label="Design" />
          <PostTag label="Presentations" />
        </div>
        <div className="w-full aspect-[9/5] bg-red-200"></div>
        <p>
          Designing user interfaces that are both visually appealing and highly
          functional is a challenge faced by many developers and designers. One
          of the foundational principles that can help achieve this balance is
          the use of a grid system. Grids provide structure, consistency, and
          alignment, making it easier to organize content and create harmonious
          layouts.
        </p>
        <p>
          The concept of grids in design dates back to print media, where
          newspapers and magazines relied on column-based layouts to present
          information clearly. In the digital age, grid systems have evolved to
          accommodate responsive design, ensuring that interfaces look great on
          devices of all sizes. By dividing the page into columns and rows,
          designers can place elements with precision and maintain a sense of
          order throughout the interface.
        </p>
        <p>
          There are several types of grid systems commonly used in UI design.
          The most popular is the 12-column grid, which offers flexibility and
          adaptability for various screen sizes. Designers can combine columns
          to create wider content areas or keep them separate for more granular
          control. Other grid types include modular grids, hierarchical grids,
          and baseline grids, each serving different design needs.
        </p>
        <p>
          Implementing a grid system in your workflow can streamline the design
          process. It helps establish clear relationships between elements,
          guides the user's eye through the content, and ensures that spacing
          and alignment remain consistent. Tools like CSS Grid and Flexbox have
          made it easier than ever to create complex layouts without sacrificing
          responsiveness.
        </p>
        <p>
          In addition to structure, grids also contribute to the overall
          aesthetic of a user interface. Well-aligned elements create a sense of
          professionalism and trust, while inconsistent spacing can make a
          design feel chaotic and unpolished. By adhering to a grid, designers
          can experiment with creative layouts while maintaining a solid
          foundation.
        </p>
        <p>
          In conclusion, mastering grid systems is essential for anyone involved
          in UI design. Whether you're building a simple landing page or a
          complex web application, grids provide the framework needed to create
          beautiful, user-friendly interfaces. Start incorporating grids into
          your projects today and experience the difference they can make in
          your design process.
        </p>
      </article>
    </>
  );
}
