export class CreateTodoItemCommand {
  constructor(
    public title: string,
    public description: string,
    public todoListId: string,
  ) {}
}
