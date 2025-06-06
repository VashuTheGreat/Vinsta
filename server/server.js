const mysql = require('mysql2/promise');
const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        console.log('Received JSON:', data);

        const { user_name, email, password } = data;

        const connection = await mysql.createConnection({
          host: 'localhost',
          user: 'root',
          password: 'Vansh@1234mysql',
          database: 'user_branch'
        });

        const insertQuery = `
          INSERT INTO user_info (user_name, email, password)
          VALUES (?, ?, ?)
        `;
        await connection.query(insertQuery, [user_name, email, password]);

        const [rows] = await connection.query('SELECT * FROM user_info');
        console.log(rows);

        await connection.end();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'User added successfully', users: rows }));
      } catch (err) {
        console.error('Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });

  } else if (req.method === 'GET' && req.url.startsWith('/getdata')) {
    try {
      const queryObject = url.parse(req.url, true).query;
      const { user_name, password } = queryObject;
      console.log("received: "+ user_name+" "+password);

      if (!user_name || !password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Missing user_name or password' }));
      }

      const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vansh@1234mysql',
        database: 'user_branch'
      });

      const selectQuery = `SELECT COUNT(*) AS count FROM user_info WHERE user_name = ? AND password = ?`;
      const [rows] = await connection.query(selectQuery, [user_name, password]);

      await connection.end();

      const success = rows[0].count > 0 ? 1 : 0;

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success }));
      console.log("Success : ",success)
    } catch (err) {
      console.error('Error:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Send a POST request to insert data into MySQL');
  }
});

server.listen(3000, () => {
  console.log('Server is started at http://localhost:3000');
});
