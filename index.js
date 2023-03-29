const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "manager",
  },
  console.log(`Connected to the manager database. \n`)
);

db.connect(function (err) {
  if (err) {
    console.log(err);
  }
});

async function question() {
  const answers = await inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Select an option",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((res) => {
      if (res.choice === "view all departments") {
        viewDept();
      }
      if (res.choice === "view all roles") {
        viewRoles();
      }
      if (res.choice === "view all employees") {
        viewEmps();
      }
      if (res.choice === "add a department") {
        addDept();
      }
      if (res.choice === "add a role") {
        addRole();
      }
      if (res.choice === "add an employee") {
        addEmp();
      }
      if (res.choice === "update an employee role") {
        updateEmp();
      }
    });
}

question();

const viewDept = () => {
  db.query("SELECT * FROM departments", (results, err) => {
    if(err) {
      console.log(err)
    }
    console.log(results)})
}

const viewRoles = () => {
  db.query("SELECT * FROM roles", (results, err) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
};

const viewEmps = () => {
  db.query("SELECT * FROM employees", (results, err) => {
    if (err) {
      console.log(err);
    }
    console.log(results);
  });
};

const addDept = () => {
  inquirer
    .prompt([
      {
        message: "Department name",
        type: "input",
        name: "name",
      },
    ])
    .then((department) => {
      db.query("INSERT INTO departments SET ?", department);
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        message: "Title",
        type: "input",
        name: "title",
      },
      {
        message: "Salary",
        type: "input",
        name: "salary",
      },
      {
        message: "Department ID",
        type: "input",
        name: "department_id",
      },
    ])
    .then((role) => {
      db.query("INSERT INTO roles SET ?", role);
    });
};

const addEmp = () => {
  inquirer
    .prompt([
      {
        message: "First name",
        type: "input",
        name: "first_name",
      },
      {
        message: "Last name",
        type: "input",
        name: "last_name",
      },
      {
        message: "Role ID",
        type: "input",
        name: "role_id",
      },
      {
        message: "Do they have a manager",
        type: "list",
        choices: ["yes", "no"],
        name: "managerStatus",
      },
      // {
      //   message: "Employee's manager",
      //   type: "input",
      //   name: "manager_id"
      // }
    ])
    .then((emp) => {
      if (emp.managerStatus === "yes") {
        delete emp.managerStatus;
        inquirer
          .prompt([
            {
              message: "Manager's ID",
              type: "input",
              name: "manager_id",
            },
          ])
          .then((manager) => {
            emp.manager_id = manager.manager_id;
            db.query("INSERT INTO employees SET ?", emp);
          });
      } else {
        delete emp.managerStatus;
        db.query("INSERT INTO employees SET ?", emp);
      }
    });
};

const updateEmp = () => {
  inquirer
    .prompt([
      {
        message: "Select employee to update",
        type: "input",
        name: "id",
      },
      {
        message: "Select their new role ID",
        type: "input",
        name: "role_id",
      },
    ])
    .then((emp) => {
      db.query(`UPDATE employees SET role_id = ${emp.role_id} WHERE id = ${emp.id}`)
    })
};
