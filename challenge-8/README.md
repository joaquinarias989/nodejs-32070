## 🧐 Prerequisites

Before you start, you need to have the following things installed:

- [XAMPP](https://www.apachefriends.org/es/download.html)
- [SQLite](https://marketplace.visualstudio.com/items?itemName=alexcvzz.vscode-sqlite) (optional, for manage this database in VsCode)

## 💻 Run Locally

Go to the project folder whit

```
cd challenge-8
```

You must create the corresponding databases and tables to handle data persistence (Product table in MySQL - Messages table in SQLite3).
To do this, I have created a script, which is executed with the following command.
<b>⚠️<i>(Make sure you have Apache and MySql initialized in XAMPP)</i></b>

```
npm run create-tables
```

Run locally whit

```
npm run dev
```

## 🚩 Use

To manage products, open the following URL:

```
localhost:8080/Productos
```

To use the chat, click on the top right button, which contains the message icon
