const TodoList = artifacts.require("./UserList.sol");

contract("UserList", (accounts) => {
  before(async () => {
    this.todoList = await TodoList.deployed();
  });

  it("deploys successfully", async () => {
    const address = await this.todoList.address;
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
  });

  it("lists tasks", async () => {
    const userCount = await this.todoList.userCount();
    const task = await this.todoList.tasks(userCount);
    assert.equal(task.id.toNumber(), userCount.toNumber());
    assert.equal(task.content, "Check out REDCRIX");
    assert.equal(task.completed, false);
    assert.equal(userCount.toNumber(), 1);
  });

  it("creates tasks", async () => {
    const result = await this.todoList.createTask("A new task");
    const userCount = await this.todoList.userCount();
    assert.equal(userCount, 2);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 2);
    assert.equal(event.content, "A new task");
    assert.equal(event.completed, false);
  });

  it("toggles task completion", async () => {
    const result = await this.todoList.toggleCompleted(1);
    const task = await this.todoList.tasks(1);
    assert.equal(task.completed, true);
    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), 1);
    assert.equal(event.completed, true);
  });
});
