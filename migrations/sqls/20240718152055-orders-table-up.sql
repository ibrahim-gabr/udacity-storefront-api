create table orders (
    ID serial primary key ,
    user_id bigint references users(ID) ,
    status varchar
);