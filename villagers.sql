-- Create villagers table
CREATE OR REPLACE TABLE villagers (
	villager_id 	int NOT NULL AUTO_INCREMENT,
	trade_name 		varchar(45) NOT NULL,
	age 			int NOT NULL,
	status 			varchar(45) NOT NULL,
	PRIMARY KEY (villager_id),
	FOREIGN KEY (trade_name) REFERENCES trades(name)
);

-- Create items table
CREATE OR REPLACE TABLE items (
	item_id		int NOT NULL AUTO_INCREMENT,
	name		varchar(45) NOT NULL,
	cost 		int NOT NULL,
	amount 		int, 
	trade_name	varchar(45) NOT NULL,
	game_id		int NOT NULL,
	PRIMARY KEY (item_id),
	CONSTRAINT fk_trades_name FOREIGN KEY (trade_name) REFERENCES trades(name)
);

-- Create trades table
CREATE OR REPLACE TABLE trades (
	name		varchar(45) UNIQUE NOT NULL,
	description	varchar(255) NOT NULL,
	PRIMARY KEY (name)
);

-- Create discounts table
CREATE OR REPLACE TABLE discount_effects (
	discount_id	int NOT NULL AUTO_INCREMENT,
	name 		varchar(45) NOT NULL,
	`percent`	int NOT NULL,
	PRIMARY KEY (discount_id)
);

-- Create customers table
CREATE OR REPLACE TABLE customers (
	customer_id	int NOT NULL AUTO_INCREMENT,
	name		varchar(45) NOT NULL,
	PRIMARY KEY (customer_id)
);

-- Create transactions table
CREATE OR REPLACE TABLE transactions (
	transaction_id	int NOT NULL AUTO_INCREMENT,
	customer_id 	int NOT NULL,
	villager_id		int NOT NULL,
	discount_id		int,
	qty_sold		int NOT NULL,
	PRIMARY KEY (transaction_id),
	CONSTRAINT fk_customer_id FOREIGN KEY (customer_id) REFERENCES customers(customers_id),
	CONSTRAINT fk_villager_id FOREIGN KEY (villager_id) REFERENCES villagers(villager_id),
	CONSTRAINT fk__discounts_id FOREIGN KEY (discount_id) REFERENCES discount_effects (discount_id)
);

-- Create intersection: villager_has_items
CREATE OR REPLACE TABLE villager_has_items (
	villager_id		int NOT NULL,
	item_id			int NOT NULL,
	PRIMARY KEY (villager_id, item_id),
	CONSTRAINT fk_villager_items_villager FOREIGN KEY (villager_id) REFERENCES villagers(villager_id),
	CONSTRAINT fk_villager_items_item FOREIGN KEY (item_id) REFERENCES items(item_id)
);

-- Create intersection: transaction_has_items
CREATE OR REPLACE TABLE transaction_has_items (
	transaction_id	int NOT NULL,
	item_id			int NOT NULL,
	PRIMARY KEY (transaction_id, item_id),
	CONSTRAINT fk_transaction_items_transaction FOREIGN KEY (transaction_id) REFERENCES transactions(transaction_id),
	CONSTRAINT fk_transaction_items_item FOREIGN KEY (item_id) REFERENCES items(item_id)
);

