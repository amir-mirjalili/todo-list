export class TodoItem {
  constructor(
    public title: string,
    public description: string,
    public priority: number,
    public todoListId: string,
  ) {}
}
