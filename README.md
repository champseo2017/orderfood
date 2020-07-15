## Create db
## Tbl_users
CREATE TABLE Tbl_users (
    Users_userid int unsigned NOT NULL AUTO_INCREMENT,
    Users_email varchar(50) NOT NULL,
    Users_phonenumber varchar(50) NOT NULL,
    Users_password varchar(100) NOT NULL,
    Users_image varchar(100) NOT NULL DEFAULT '',
    Users_role enum('admin', 'shopstore') NOT NULL DEFAULT 'shopstore',
    Users_actives enum('active', 'inactive') NOT NULL DEFAULT 'inactive',
    Users_createat datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Users_userid),
    INDEX (Users_userid,Users_email,Users_createat,Users_role)
);

## Tbl_users Detail
CREATE TABLE Tbl_users_details (
    Users_detail_id int unsigned NOT NULL AUTO_INCREMENT,
    Users_userid int NOT NULL,
    Users_detail_password varchar(100),
    Users_detail_confirmpassword varchar(100),
    Users_detail_tokenqrcode varchar(100),
    Users_detail_image varchar(100) DEFAULT '',
    Users_detail_shopname varchar(100) DEFAULT '',
    Users_detail_locality varchar(100) DEFAULT '',
    Users_detail_district varchar(100) DEFAULT '',
    Users_detail_province varchar(100) DEFAULT '',
    Users_detail_last_update datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (Users_detail_id),
   FOREIGN KEY (Users_detail_id) REFERENCES tbl_users(Users_userid),
    INDEX (Users_detail_id,Users_userid,Users_detail_shopname,Users_detail_last_update)
);

## Db structure
tbl_product_store->tbl_users->tbl_category->tbl_order_item->tbl_order->tbl-Options_food
tbl_order_table->tbl_product_store->tbl_category