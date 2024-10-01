export class TodoItem {
  constructor(
    public title: string,
    public description: string,
    public priority: number = 0,
    public todoListId: string,
  ) {}
}
