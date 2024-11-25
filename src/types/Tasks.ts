type AuthorId = number;

export type Author = {
   id: AuthorId;
   display_name: string;
};

export type Column = "To do" | "In progress" | "Done" | "Approved";

export type Task = {
   id: number;
   title: string;
   author_id: AuthorId;
   date_created: string;
   current_column: Column;
};

export type TaskData = {
   authors: Author[];
   columns: Column[];
   tasks: Task[];
};
