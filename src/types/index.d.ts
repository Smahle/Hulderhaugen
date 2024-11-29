// Global types used across the app
export type TCard = {
    title: string;
    description: string;
    deadline: Date;
    comments: Comment[];
  };
  
  export type Comment = {
    commentText: string | undefined;
    upvotes?: Upvote;
  };
  
  export type Upvote = {
    sum: number;
  };
  
  export type DraggedCard = {
    card: TCard | null;
    sourceArray?: string | null;
  };
  