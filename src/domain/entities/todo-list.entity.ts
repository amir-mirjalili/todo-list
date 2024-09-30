export class TodoList {
  constructor(
    public id: string,
    public title: string,
    public userId: string,
    public todoItems: [],
  ) {}

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }
}
