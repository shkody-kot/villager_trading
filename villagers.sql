-- Group 51: Ready for the SQL
-- Members: Ira Belyaeva, Kierra Young
-- -----------------------------------
-- Create trades table
-- -----------------------------------
CREATE OR REPLACE TABLE trades (
	name		varchar(45) UNIQUE NOT NULL,
	description	varchar(255) NOT NULL,
	PRIMARY KEY (name)
);

-- -----------------------------------
-- Create villagers table
-- -----------------------------------
CREATE OR REPLACE TABLE villagers (
    name			varchar(45) NOT NULL,
	villager_id 	int NOT NULL AUTO_INCREMENT,
	trade_name 		varchar(45) NOT NULL,
	age 			int NOT NULL,
	status 			varchar(45) NOT NULL,
	PRIMARY KEY (villager_id),
	FOREIGN KEY (trade_name) REFERENCES trades(name)
);

-- -----------------------------------
-- Create items table
-- -----------------------------------
CREATE OR REPLACE TABLE items (
	item_id		int NOT NULL AUTO_INCREMENT,
	name		varchar(45) NOT NULL,
	cost 		int NOT NULL,
	amount 		int, 
	trade_name	varchar(45) NOT NULL,
	PRIMARY KEY (item_id),
	CONSTRAINT fk_trades_name FOREIGN KEY (trade_name) REFERENCES trades(name)
);

-- -----------------------------------
-- Create discounts table
-- -----------------------------------
CREATE OR REPLACE TABLE discount_effects (
	discount_id	int NOT NULL AUTO_INCREMENT,
	name 		varchar(45) NOT NULL,
	`percent`	int NOT NULL,
	PRIMARY KEY (discount_id)
);

-- -----------------------------------
-- Create customers table
-- -----------------------------------
CREATE OR REPLACE TABLE customers (
	customer_id	int NOT NULL AUTO_INCREMENT,
	name		varchar(45) NOT NULL,
	PRIMARY KEY (customer_id)
);

-- -----------------------------------
-- Create transactions table
-- -----------------------------------
CREATE OR REPLACE TABLE transactions (
	transaction_id	int NOT NULL AUTO_INCREMENT,
	customer_id 	int NOT NULL,
	villager_id		int NOT NULL,
	discount_id		int,
	total_price		int NOT NULL,
	PRIMARY KEY (transaction_id),
	CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
	CONSTRAINT fk_villager_id FOREIGN KEY (villager_id) REFERENCES villagers(villager_id),
	CONSTRAINT fk__discounts_id FOREIGN KEY (discount_id) REFERENCES discount_effects (discount_id)
);

-- -------------------------------------------
-- Create intersection: villager_has_items
-- -------------------------------------------
CREATE OR REPLACE TABLE villager_has_items (
	villager_id		int NOT NULL,
	item_id			int NOT NULL,
	PRIMARY KEY (villager_id, item_id),
	CONSTRAINT fk_villager_items_villager FOREIGN KEY (villager_id) REFERENCES villagers(villager_id) ON DELETE CASCADE,
	CONSTRAINT fk_villager_items_item FOREIGN KEY (item_id) REFERENCES items(item_id) ON DELETE CASCADE
);

-- -------------------------------------------
-- Create intersection: transaction_has_items
-- -------------------------------------------
CREATE OR REPLACE TABLE transaction_has_items (
	transaction_id	int NOT NULL,
	item_id			int NOT NULL,
	quantity		int NOT NULL,
	PRIMARY KEY (transaction_id, item_id),
	CONSTRAINT fk_transaction_items_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
	CONSTRAINT fk_transaction_items_item FOREIGN KEY (item_id) REFERENCES items(item_id)
);

-- -------------------------------------------
-- Insert sample data: trades
-- -------------------------------------------
INSERT INTO trades (name, description)
VALUES ("Armorer", "The armorer is a villager who sells armor and a shield, including enchanted diamond armor, in exchange for emeralds. The armorer is dressed in brown clothes, gloves are on his hands, and a goggle mask is on his head."),
("Farmer", "A farmer is one of the villagers who are engaged in growing various crops to supply the village with food. The farmer wears brown clothes with a belt, a straw hat on his head, and sells apples, bread, and other foods."),
("Fletcher", "The fletcher is a hunter who wears a brown hunting hat with a feather, an arrow in his belt, and a buckle on his belt that will change color depending on his skill. They sell arrows, flint, and other related materials."),
("Cleric", "The cleric is a potion maker who sells rare magic items, including bottles of potions and experience. They wear a pink-colored robe with gold-colored trim.");

-- -------------------------------------------
-- Insert sample data: items
-- -------------------------------------------
INSERT INTO items (name, cost, amount, trade_name)
VALUES ("Nether Wart", 1000, 70, (SELECT name FROM trades WHERE name = "Cleric")),
("Bread", 200, 100, (SELECT name FROM trades WHERE name = "Farmer")),
("Arrow", 300, 50, (SELECT name FROM trades WHERE name = "Fletcher")),
("Apple", 100, 200, (SELECT name FROM trades WHERE name = "Farmer")),
("Chestplate", 3000, 2, (SELECT name FROM trades WHERE name = "Armorer"));

-- -------------------------------------------
-- Insert sample data: villagers
-- -------------------------------------------
INSERT INTO villagers (name, trade_name, age, status)
VALUES ("Denni", (SELECT name FROM trades WHERE name = "Armorer"), 76, "deceased"),
("Ward", (SELECT name FROM trades WHERE name = "Farmer"), 56, "alive"),
("Bones", (SELECT name FROM trades WHERE name = "Farmer"), 23, "alive"),
("Wayfare", (SELECT name FROM trades WHERE name = "Fletcher"), 44, "alive"),
("Glaser", (SELECT name FROM trades WHERE name = "Cleric"), 32, "alive");

-- -------------------------------------------
-- Insert sample data: discount_effects
-- -------------------------------------------
INSERT INTO discount_effects (name, percent)
VALUES ("Hero", 30),
("RaidPrevention", 20),
("Bulk", 10);

-- -------------------------------------------
-- Insert sample data: customers
-- -------------------------------------------
INSERT INTO customers (name)
VALUES ("Steve"),
("Alex"),
("Kai"),
("Noor");

-- -------------------------------------------
-- Insert sample data: transactions
-- -------------------------------------------
INSERT INTO transactions (customer_id, villager_id, discount_id, total_price)
VALUES ((SELECT customer_id FROM customers WHERE name = "Steve"), (SELECT villager_id FROM villagers WHERE name = "Glaser"), (SELECT discount_id FROM discount_effects WHERE name = "Hero"), 3000),
((SELECT customer_id FROM customers WHERE name = "Kai"), (SELECT villager_id FROM villagers WHERE name = "Ward"), NULL, 2000),
((SELECT customer_id FROM customers WHERE name = "Noor"), (SELECT villager_id FROM villagers WHERE name = "Wayfare"), NULL, 7200);

-- -------------------------------------------
-- Insert sample data (intersection table): villager_has_items
-- -------------------------------------------
INSERT INTO villager_has_items (villager_id, item_id) 
VALUES ((SELECT villager_id FROM villagers WHERE name = "Ward"), (SELECT item_id FROM items WHERE name = "Bread")),
((SELECT villager_id FROM villagers WHERE name = "Ward"), (SELECT item_id FROM items WHERE name = "Apple")),
((SELECT villager_id FROM villagers WHERE name = "Denni"), (SELECT item_id FROM items WHERE name = "Chestplate")),
((SELECT villager_id FROM villagers WHERE name = "Wayfare"), (SELECT item_id FROM items WHERE name = "Nether Wart")),
((SELECT villager_id FROM villagers WHERE name = "Glaser"), (SELECT item_id FROM items WHERE name = "Arrow"));

-- -------------------------------------------
-- Insert sample data (intersection table): transaction_has_items
-- -------------------------------------------
INSERT INTO transaction_has_items (transaction_id, item_id, quantity)
VALUES ((SELECT transaction_id FROM transactions WHERE transaction_id = 2), (SELECT item_id FROM items WHERE name = "Bread"), 5),
((SELECT transaction_id FROM transactions WHERE transaction_id = 2), (SELECT item_id FROM items WHERE name = "Apple"), 10),
((SELECT transaction_id FROM transactions WHERE transaction_id = 1), (SELECT item_id FROM items WHERE name = "Chestplate"), 1),
((SELECT transaction_id FROM transactions WHERE transaction_id = 3), (SELECT item_id FROM items WHERE name = "Arrow"), 24);
