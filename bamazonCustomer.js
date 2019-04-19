var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "mama546494",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    //console.log("connected as id " + connection.threadId);
    
    //mainInquirer();
    //queryAllSongs();
    //queryDanceSongs();
    //connection.end();
});

function mainInquirer() {
    inquirer.prompt([
        {
            type: "input",
            name: "mainQ",
            message: "Enter the id of the product you would like to purchase",
        },
        {
            type: "input",
            name: "secondQ",
            message: "How many would you like to buy (quantity): "

        }
    ]).then(function (ans) {
        var chosen_id = parseInt(ans.mainQ);
        var chosen_quantity = parseInt(ans.secondQ);
        checkQuantity(chosen_id, chosen_quantity);

        //connection.end();
    });
}

function displayProducts() {

    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("id: " + res[i].item_id + " | name: " + res[i].product_name + " | price: " + res[i].price);
        }
    });

}

function checkQuantity(id, quantity) {
    connection.query("SELECT * FROM products WHERE item_id = " + id, function (err, res) {
        if (quantity > parseInt(res[0].stock_quantity)) {
            console.log("Insufficient Quantity!");
        } else {
            var newAmount = parseInt(res[0].stock_quantity) - quantity;
            var cost = quantity * res[0].price;
            connection.query("UPDATE products SET stock_quantity = " + newAmount + " WHERE item_id = " + id, function (err, res) {
                
            });
            console.log("The New Quantity Remaining is: " + newAmount);
            console.log("The total price of your purchase is: $" + cost);
            connection.end();
        }

    });
}
displayProducts();
mainInquirer();





