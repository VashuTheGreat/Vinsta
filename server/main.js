const mysql = require('mysql2/promise');
const express = require('express');

const app = express();
const PORT = 3000;
app.use(express.json());

class handleDB {
  async saveUser(data) {
    console.log("data", data);

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Vansh@1234mysql',
      database: 'user_branch'
    });

    const insertQuery = `
        INSERT INTO Users (profile_image, email, UserName, Password)
        VALUES (" ", ?, ?, ?)
    `;

    await connection.query(insertQuery, [
      data.email,
      data.username,
      data.password
    ]);

    const [rows] = await connection.query("SELECT * FROM Users");
    console.log(rows);

    await connection.end();
  }


async loginUser(data) {
     console.log("Login_data", data);

    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Vansh@1234mysql',
      database: 'user_branch'
    });

const query = `
  SELECT * FROM Users 
  WHERE (UserName = ? OR email = ?) AND Password = ?
  LIMIT 1
`;


const [rows]=await connection.query(query,[data.usernameOrEmail,data.usernameOrEmail,data.password])
   console.log(rows[0].id)
await connection.end();



if(rows.length===0) return 0;
else return rows[0].id;
}




async deleteMedia(mediaId){
       const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Vansh@1234mysql',
      database: 'user_branch'
    });

        const [result] = await connection.query('DELETE FROM Users_media WHERE id = ?', [mediaId]);
await connection.end();

if(result.affectedRows===0) return 0;
else return 1;
}


async setProfileImage({ id, profile_image }) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Vansh@1234mysql',
            database: 'user_branch'
        });

        const updateQuery = `
            UPDATE Users 
            SET profile_image = ? 
            WHERE id = ?
        `;

        await connection.query(updateQuery, [profile_image, id]);
        await connection.end();
    }




    async getUserInfo(id) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Vansh@1234mysql',
            database: 'user_branch'
        });

        const [rows] = await connection.query(
            `SELECT * FROM Users WHERE id = ?`, [id]
        );

        await connection.end();

        return rows[0]; // return single user
    }




    async uploadMedia({ user_id, media, abt_media, description , likes, comments, type }) {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Vansh@1234mysql',
            database: 'user_branch'
        });

        const insertQuery = `
            INSERT INTO Users_media 
            (user_id, media, abt_media, description , likes, comments, type)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        await connection.query(insertQuery, [
            user_id, media, abt_media, description , likes, JSON.stringify(comments), type
        ]);

        await connection.end();
    }





    async getUserMediaById(user_id){
         const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Vansh@1234mysql',
            database: 'user_branch'
        });


        const query=`SELECT*FROM Users_media WHERE user_id = ?`;
        const [rows]=await connection.query(query,[user_id]);

        await connection.end();

        return rows;
    }




    async getMediaIdByUri(uri){
        const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vansh@1234mysql',
        database: 'user_branch'
    });

    const query = `SELECT * FROM Users_media WHERE media = ? LIMIT 1`;
    const [rows] = await connection.query(query, [uri]);

    await connection.end();
    return rows[0];  // assuming media is unique per URI

    }



    async updateMediaById({ id, col, val }) {
    const allowedCols = ['media', 'abt_media', 'description ', 'likes', 'comments', 'type']; // ✅ only allow specific columns

    if (!allowedCols.includes(col)) {
        throw new Error("Invalid column name");
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vansh@1234mysql',
        database: 'user_branch'
    });

    const query = `UPDATE Users_media SET ${col} = ? WHERE id = ?`;
    const [result] = await connection.query(query, [val, id]);

    await connection.end();
    return result;
}



    async updateUserInfoById({ id, col, val }) {
    const allowedCols = ['media', 'abt_media', 'description ', 'likes', 'comments', 'type']; // ✅ only allow specific columns

    if (!allowedCols.includes(col)) {
        throw new Error("Invalid column name");
    }

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Vansh@1234mysql',
        database: 'user_branch'
    });

    const query = `UPDATE Users_media SET ${col} = ? WHERE id = ?`;
    const [result] = await connection.query(query, [val, id]);

    await connection.end();
    return result;
}


}

const dbHandler = new handleDB();

app.post('/register', async (req, res) => {
  const data = req.body;

  try {
    if (
      !data.username || data.username.trim() === "" ||
      !data.email || data.email.trim() === "" ||
      !data.password || data.password.trim() === ""
    ) {
      throw new Error("Missing required fields");
    }

    const data2 = {
      email: data.email.trim(),
      username: data.username.trim(),
      password: data.password.trim()
    };

    console.log("data2 : ", data2);
    await dbHandler.saveUser(data2);

    res.status(201).json({
      message: 'User Created Successfully',
      data: { username: data2.username, email: data2.email }
    });
  } catch (e) {
    res.status(500).json({
      message: "Couldn't create user or user already exists"
    });

    console.error(e);
  }
});





app.post('/login',async (req,res)=>{
    const data=req.body;
    try{
      const result= await dbHandler.loginUser(data)
      if(result===0) return res.status(404).json({message:"User not found."})

        return res.status(200).json({
            message:"Login successful.",
            id:result

        }
    
    )
    }
    catch(e){
        console.error(error);
        return res.status(500).json({message:"Internal server error."})
    }
})


app.delete('/delete-media/:id', async (req, res) => {
    const mediaId=req.params.id;


    try{
        const result=await dbHandler.deleteMedia(mediaId);
        if(result===0) return res.status(404).json({message:"Media not found"});

        res.status(200).json({message:'media deleted successfully'})


    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Error in deleting media"})
    }
})




app.post('/profileImage', async (req, res) => {
    const { id, profile_image } = req.body;

    if (!id || !profile_image) {
        return res.status(400).json({ message: "id and profile_image are required" });
    }

    try {
        await dbHandler.setProfileImage({ id, profile_image });

        res.status(200).json({
            message: "Profile image updated successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong while updating the profile image"
        });
    }
});



app.get('/userInfo/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const info = await dbHandler.getUserInfo(id);

        if (!info) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User info fetched successfully",
            info: info
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Something went wrong while fetching user info"
        });
    }
});




app.post('/uploadMedia',async(req,res)=>{
        const { user_id, media, abt_media, description , likes = 0, comments = "[]", type } = req.body;
  if (!user_id || !media || !type) {
        return res.status(400).json({ message: "user_id, media, and type are required" });
    }
    
    try {
        await dbHandler.uploadMedia({ user_id, media, abt_media, description , likes, comments, type });
        res.status(201).json({ message: "Media uploaded successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to upload media" });
    }
})



app.get('/userMedia/:id',async(req,res)=>{
    const user_id=req.params.id;

    try{
        const userMedia=await dbHandler.getUserMediaById(user_id);
 if (userMedia.length === 0) {
            return res.status(404).json({ message: "No media found for this user" });
        }


                res.status(200).json({ userMedia });


    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving user media" });
    }

})




app.get('/mediaByUri/:uri', async (req, res) => {
    const uri = decodeURIComponent(req.params.uri);  // decode back to original URI
    try {
        const mediaId = await dbHandler.getMediaIdByUri(uri);

        if (!mediaId) {
            return res.status(404).json({ message: "Media not found for given URI" });
        }

        res.status(200).json({ mediaId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching media" });
    }
});





app.post('/UpdateMedia', async (req, res) => {
    const { id, col, val } = req.body;

    if (!id || !col || val === undefined) {
        return res.status(400).json({ message: "id, col, and val are required" });
    }

    try {
        const result = await dbHandler.updateMediaById({ id, col, val });
        res.status(200).json({ message: "Media updated", result });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Failed to update media" });
    }
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
