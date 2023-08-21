CREATE TABLE tproducto (
    id_producto INT PRIMARY KEY,
    id_tipo INT, /*Escritorio, limpieza, carnes, frutas,etc*/
    descripcion VARCHAR(36),
    precio_compra double,
    precio_venta double,
    cantidad int,
    activo bit
);

insert into tproducto(id_producto, id_tipo, descripcion, precio_compra, precio_venta, cantidad,activo) values (1, 1, 'Muy waso', 400.00, 300.00, 5,1);
insert into tproducto(id_producto, id_tipo, descripcion, precio_compra, precio_venta, cantidad,activo) values (2, 2, 'Es muy buena', 500.00, 100.00, 2,1);
insert into tproducto(id_producto, id_tipo, descripcion, precio_compra, precio_venta, cantidad,activo) values (3, 3, 'Mala', 700.00, 200.00, 3,1);
insert into tproducto(id_producto, id_tipo, descripcion, precio_compra, precio_venta, cantidad,activo) values (4, 4, 'Bonito', 800.00, 300.00, 7,1);

select * from tproducto;
