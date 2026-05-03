export interface taskType{
    id:string;
    title: string;
    status:"TODO"|"IN_PROGRESS"|"DONE";
    assignedTo:string;
}
export interface createTaskType{
 title: string;
  assignedTo: string;
  description?: string;
  dueDate?: string;
}