//Express.js is used to create server
const express = require('express');
//Path allows to know html, css files location
const path = require('path');
//Body parser allows to send and receive data
const bodyParser = require('body-parser');
//Knex allows to access database
const knex = require('knex');

//Make register user backlink. Connect database to server
const db = knex({
    //'pg' - because we use postgres
    client: 'pg',
    connection: {
        //Database host #
        host: '127.0.0.1',
        //PSQL user name
        user: 'postgres',
        //User's password
        password: 'master96',

        port: 5432,
        //Name of database
        database: 'contents'
    }
})


//A way to create server with express.js
const expressApp = express();

expressApp.use(bodyParser.json());
// Serve static files (e.g., HTML, CSS, JS) from a specific directory
expressApp.use(express.static(path.join(__dirname, 'public')));

// Handle root path request
expressApp.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



// API REQUESTS
//CREATION REQUESTS
expressApp.post('/api/create-section', (req, res) => {
    const { ms_name, ms_html_id, ms_img_url } = req.body;

    if(!ms_name.length || !ms_html_id.length || !ms_img_url.length){
        res.json('Не все поля заполнены. Не удалось добавить раздел.');
    } else {
        db("sections").insert({
            name: ms_name,
            html_id: ms_html_id,
            img_url: ms_img_url,
        })
            .returning(["name", "html_id", "img_url"])
            .then(data => {
                res.json()
            })
            .catch(err => {
                if(err.detail.includes('already exists')){
                    res.json('Record already exists');
                }
            })
    }
})

expressApp.post('/api/create-subsection', (req, res) => {
    const { sub_parent_name, sub_name, sub_html_id, sub_img_url } = req.body;

    if(!sub_parent_name.length || !sub_name.length || !sub_html_id.length || !sub_img_url.length){
        res.json('Не все поля заполнены. Не удалось добавить подраздел.');
    } else {
        db("subsections").insert({
            parent_section_name: sub_parent_name,
            subsection_name: sub_name,
            html_id: sub_html_id,
            img_url: sub_img_url,
        })
            .returning(["parent_section_name", "subsection_name", "html_id", "img_url"])
            .then(data => {
                res.json()
            })
            .catch(err => {
                if(err.detail.includes('already exists')){
                    res.json('Record already exists');
                }
            })
    }
})

expressApp.post('/api/create-content', (req, res) => {
    const { content_parent_name, content_type, content_param_1, content_param_2 } = req.body;

    if(!content_parent_name.length || !content_type.length || !content_param_1.length || !content_param_2.length){
        res.json('Не все поля заполнены. Не удалось добавить контент.');
    } else {
        db("content").insert({
            subsection_id: content_parent_name,
            content_type: content_type,
            param1: content_param_1,
            param2: content_param_2,
        })
            .returning(["subsection_id", "content_type", "param1", "param2"])
            .then(data => {
                res.json()
            })
            .catch(err => {
                console.error(err); // Log the error to the console
                res.json(err.detail);
            })
    }
})

//LOAD REQUESTS
expressApp.post('/api/load-sections', (req, res) => {
    const { id, ms_name, ms_html_id, ms_img_url, ms_date } = req.body;

    db.select('id', 'name', 'html_id', 'img_url', 'date_stamp')
        .from('sections')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No sections found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

expressApp.post('/api/load-subsections', (req, res) => {
    const { id, ss_parent_name, ss_name, ss_html_id, ss_img_url, ss_date } = req.body;

    db.select('id', 'parent_section_name','subsection_name', 'html_id', 'img_url', 'date_stamp')
        .from('subsections')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No subsections found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

expressApp.post('/api/load-content', (req, res) => {
    const { id, content_parent_name, content_type, content_param_1, content_param_2, content_date_stamp } = req.body;

    db.select("id","subsection_id", "content_type", "param1", "param2", "date_stamp")
        .from('content')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No content found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})

//REMOVE REQUESTS
expressApp.delete('/api/remove-section', (req, res) => {
    const { id } = req.body;

    db("sections")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed section with html id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing section: ${err.message}.`);
        });
});

expressApp.delete('/api/remove-subsection', (req, res) => {
    const { id } = req.body;

    db("subsections")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed subsection with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing section: ${err.message}.`);
        });
});

expressApp.delete('/api/remove-content', (req, res) => {
    const { id } = req.body;

    db("content")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed content with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing content: ${err.message}.`);
        });
});

//Listen

const port = 3000;
expressApp.listen(port, (req, res) => {
    console.log(`Listening on port: ${port} .....`)
})