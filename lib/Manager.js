const Employee = require("./Employee");

const employee1 = new Employee("cody", "1", "blah@gmail.com");
console.log(employee1);

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);

    this.officeNumber = officeNumber;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }

  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
