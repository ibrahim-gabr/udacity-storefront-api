create table orders_products (
                                 product_id bigint references products(ID) ,
                                 order_id bigint references orders(ID) ,
                                 quantity integer
);