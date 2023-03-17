-- Group 51: Ready for the SQL
-- Members: Ira Belyaeva, Kierra Young

-- -----------------------------------
-- Select relevant info from professions
-- -----------------------------------
SELECT * FROM professions;

-- -----------------------------------
-- Select info from villagers
-- -----------------------------------
SELECT villagers.name, villagers.trade_name, villagers.age, villagers.status, items.name
AS item_name
FROM villagers
INNER JOIN villager_has_items ON villagers.villager_id = villager_has_items.villager_id
INNER JOIN items ON villager_has_items.item_id = items.item_id
ORDER BY villagers.name DESC;

-- -----------------------------------
-- Select info from items
-- -----------------------------------
SELECT name, cost, amount, trade_name FROM items
GROUP BY trade_name
ORDER BY trade_name ASC;

-- -----------------------------------
-- Select info from discounts
-- -----------------------------------
SELECT name, `percent` FROM discounts;

-- -----------------------------------
-- Select info from customers
-- -----------------------------------
SELECT name FROM customers;

-- -----------------------------------
-- Select info from transactions
-- -----------------------------------
SELECT transactions.transaction_id, customers.name AS customer, 
villagers.name AS villager, discounts.name AS discount, transactions.total_price,
items.name AS item, transaction_has_items.quantity
FROM transactions
LEFT JOIN discounts ON transactions.discount_id = discounts.discount_id
LEFT JOIN villagers ON transactions.villager_id = villagers.villager_id
LEFT JOIN customers ON transactions.customer_id = customers.customer_id
LEFT JOIN transaction_has_items ON transactions.transaction_id = transaction_has_items.transaction_id
LEFT JOIN items ON transaction_has_items.item_id = items.item_id
ORDER BY transactions.transaction_id ASC;

-- -----------------------------------
-- Select info from transactions (dynamic search)
-- -----------------------------------

SELECT transactions.transaction_id, customers.name AS customer, 
villagers.name AS villager, discounts.name AS discount, transactions.total_price,
items.name AS item, transaction_has_items.quantity
FROM transactions
LEFT JOIN discounts ON transactions.discount_id = discounts.discount_id
LEFT JOIN villagers ON transactions.villager_id = villagers.villager_id
LEFT JOIN customers ON transactions.customer_id = customers.customer_id
LEFT JOIN transaction_has_items ON transactions.transaction_id = transaction_has_items.transaction_id
LEFT JOIN items ON transaction_has_items.item_id = items.item_id
WHERE customers.name LIKE [customer-name-typed]%
ORDER BY transactions.transaction_id ASC;

-- NOTE: items in [] are user-input into backend

-- -----------------------------------
-- Add a new item
-- -----------------------------------
INSERT INTO items (name, cost, amount, trade_name)
VALUES ([name-typed], [cost-typed], [amount-typed], [trade_name-dropdown]);

-- -----------------------------------
-- Update an existing item
-- -----------------------------------
UPDATE items
SET name = [name-dropdown], cost = [cost-typed], amount = [amount-typed]
WHERE item_id = (SELECT item_id FROM items WHERE name = [item_name-dropdown]);

-- -----------------------------------
-- Delete an item
-- -----------------------------------
DELETE * FROM items WHERE name = [name-dropdown];
-- -----------------------------------
-- Add a new discount
-- -----------------------------------
INSERT INTO discounts (name, `percent`)
VALUES ([name-typed], [discount_percent-typed]);

-- -----------------------------------
-- Add a new customer
-- -----------------------------------
INSERT INTO customers (name)
VALUES ([name-typed]);

-- -----------------------------------
-- Add a new profession
-- -----------------------------------
INSERT INTO professions (name, description)
VALUES ([name-typed], [description-typed]);

-- -----------------------------------
-- Add a new transaction
-- -----------------------------------
INSERT INTO transactions(customer_id, villager_id, discount_id, total_price)
VALUES ((SELECT customer_id FROM customers WHERE name = [customer_name-typed]),
(SELECT villager_id FROM villagers WHERE name = [villager_name-dropdown] OR IS NULL name),
(SELECT discount_id FROM discounts WHERE name = [discounts-dropdown] OR IS NULL name),
[total_price-calculated]);

INSERT INTO transaction_has_items (transaction_id, item_id, quantity)
VALUES ([transaction_id-stored], (SELECT item_id FROM items WHERE name = [item_name-dropdown]), [quantity-typed]);

-- -----------------------------------
-- Update an existing transaction
-- -----------------------------------
UPDATE transactions
SET villager_id = (SELECT villager_id FROM villagers WHERE name = [villager_name-dropdown] OR IS NULL name),
customer_id = (SELECT customer_id FROM customers WHERE name LIKE [customer_name-dropdown]),
discount_id = (SELECT discount_id FROM discounts WHERE name = [discounts-dropdown] OR IS NULL name),
total_price = [total_price-typed];

-- -----------------------------------
-- Update an existing transaction by adding items
-- -----------------------------------
INSERT INTO transaction_has_items (transaction_id, item_id)
VALUES (
(SELECT transaction_id FROM transactions 
	INNER JOIN customers ON customers.customer_id = transactions.customer_id
	WHERE customer.name LIKE [customer_name-typed]%), 
(SELECT item_id FROM items WHERE name = [item_name-dropdown]), [quantity-typed]);

-- -----------------------------------
-- Add a new villager
-- -----------------------------------
INSERT INTO villagers (name, trade_name, age, status)
VALUES ([name-typed], [trade-typed], [age-typed], [status-typed]);

INSERT INTO villager_has_items (villager_id, item_id)
VALUES ([villager_id-stored], (SELECT item_id FROM items WHERE name = [item_name-dropdown]));
-- -----------------------------------
-- Update an existing villager
-- -----------------------------------
UPDATE villagers 
SET name = [name-dropdown], trade_name = [trade-dropdown], age = [age-typed], status = [status-typed],
WHERE villager_id = (SELECT villager_id FROM villagers WHERE name = [name-dropdown]);

-- -----------------------------------
-- Cache query for dropdowns
-- -----------------------------------
SELECT name AS villager FROM villagers;
SELECT name AS customer FROM customers;
SELECT name AS discount FROM discounts;
SELECT name AS trade FROM professions;
SELECT name AS item FROM items;
SELECT transaction_id AS transaction FROM transactions;

		
