export class UpdateTodoItemCommand {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
  ) {}
}
