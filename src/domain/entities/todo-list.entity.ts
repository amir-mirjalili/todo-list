export class TodoList {
  public todoItems: string[];
  constructor(public title: string, public userId: string) {}

  changeTitle(newTitle: string) {
    this.title = newTitle;
  }

  pushItem(item: string) {
    this.todoItems.push(item);
  }
}
