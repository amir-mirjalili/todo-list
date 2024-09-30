export class TodoItem {
  constructor(
    public id: string,
    public todoList: string,
    public title: string,
    public description: string,
    public priority: number,
  ) {}
}
