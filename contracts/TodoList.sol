//SPDX-Lisence-Identifier: MIT
pragma solidity ^0.8.28;

contract TodoList {
    // 1. Todo Status Enum
    enum Status { Pending, InProgress, Completed }

    // 2. Todo Struct
    struct Todo {
        uint id;
        string content;
        Status status;
    }

    // 3. Mapping and Array
    mapping(uint => Todo) public todos;
    uint[] public todoIds;
    uint private nextId = 1;

    // 5. Event
    event TodoAdded(uint id, string content);

    // 4a. Add Todo
    function addTodo(string memory _content) public {
        todos[nextId] = Todo(nextId, _content, Status.Pending);
        todoIds.push(nextId);
        emit TodoAdded(nextId, _content);
        nextId++;
    }

    // 4b. Update Status
    function updateStatus(uint _id, Status _status) public {
        require(_id > 0 && _id < nextId, "Todo does not exist.");
        todos[_id].status = _status;
    }

    // 4c. Get Todo
    function getTodo(uint _id) public view returns (uint, string memory, Status) {
        require(_id > 0 && _id < nextId, "Todo does not exist.");
        Todo memory todo = todos[_id];
        return (todo.id, todo.content, todo.status);
    }
}