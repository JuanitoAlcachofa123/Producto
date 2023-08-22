const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());

const conexion = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'jhonalex1238',
    database: 'practicas'
}
);

conexion.connect((err)=>{
    if(err){
        throw err;
    }else {
        console.log('Conexion exitosa');
    }
});


app.post('/prod', (req, res) => {
    data = {
        id_tipo: req.body.id_tipo,
        descripcion: req.body.descripcion,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        cantidad: req.body.cantidad,
        activo: 1 // Por ejemplo, se puede establecer en 1 por defecto
    };

    generaNuevoId((err, newId) => {
        if (err) {
            res.json({ mensaje: 'Error inesperado' });
        } else {
            data.id_producto = newId;

            let sql = "INSERT INTO tproducto SET ?";
            conexion.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.json({ mensaje: 'Error inesperado' });
                } else {
                    res.json(result);
                }
            });
        }
    });
});

function generaNuevoId(callback) {
    // Consulta a la base de datos para obtener el último ID (esto es un ejemplo simplificado)
    let getLastIdQuery = "SELECT MAX(id_producto) AS lastId FROM tproducto";
    conexion.query(getLastIdQuery, (err, result) => {
        if (err) {
            console.log(err.message);
            callback(err, null);
        } else {
            let lastId = result[0].lastId || 0;
            let newId = lastId + 1;
            callback(null, newId);
        }
    });
}

app.get('/prod' , (req, res)=>{
    console.log('sql');
let sql= 'Select id_producto, id_tipo, descripcion, precio_compra, precio_venta, cantidad from tproducto';
conexion .query(sql,(err,resul)=>{
if(err){
    console.log(err.message);
    res.json({mensaje: 'Error inesperado'});
}else{
    res.json(resul);
}
});
});

app.delete('/prod/:id_producto', (req, res) => {
    const idProducto = req.params.id_producto;
    let sql = 'DELETE FROM tproducto WHERE id_producto = ?';
    
    conexion.query(sql, [idProducto], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Producto no encontrado' });
            } else {
                res.json({ mensaje: 'Producto eliminado exitosamente' });
            }
        }
    });
});

app.put('/prod/:id_producto', (req, res) => {
    const idProducto = req.params.id_producto;
    const newData = {
        id_tipo: req.body.id_tipo,
        descripcion: req.body.descripcion,
        precio_compra: req.body.precio_compra,
        precio_venta: req.body.precio_venta,
        cantidad: req.body.cantidad
    };
    
    let sql = 'UPDATE tproducto SET ? WHERE id_producto = ?';
    
    conexion.query(sql, [newData, idProducto], (err, result) => {
        if (err) {
            console.log(err.message);
            res.json({ mensaje: 'Error inesperado' });
        } else {
            if (result.affectedRows === 0) {
                res.json({ mensaje: 'Producto no encontrado' });
            } else {
                res.json({ mensaje: 'Producto actualizado exitosamente' });
            }
        }
    });
});


app.listen(3000, ()=>{
    console.log('Servidor OK en puerto 3000');
});

