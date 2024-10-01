export class CreateTodoItemCommand {
  constructor(
    public title: string,
    public description: string,
    public priority: number,
    public todoListId: string,
  ) {}
}
