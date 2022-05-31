// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract UserList {
    uint256 public userCount = 0;

    struct Task {
        uint256 id;
        string content;
        bool completed;
    }

    mapping(uint256 => Task) public tasks;

    constructor() public {
        createTask("Checkout redcrix");
    }

    function createTask(string memory _content) public {
        userCount++;
        tasks[userCount] = Task(userCount, _content, false);
    }
}
