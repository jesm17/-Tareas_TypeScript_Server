import mysql from 'mysql';

import keys from './key';

const pool = mysql.createPool(keys.database);

if (pool) {
    console.log('Database is Connected');
} else {
    console.log('Database is not connected');
}
export default pool;