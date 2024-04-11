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
//region CREATION REQUESTS
expressApp.post('/api/create-section', (req, res) => {
    const { ms_name, ms_html_id, ms_img_url } = req.body;

    if (!ms_name || !ms_html_id || !ms_img_url) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }

    db("sections").insert({
        name: ms_name,
        html_id: ms_html_id,
        img_url: ms_img_url
    })
        .returning(["name", "html_id", "img_url"])
        .then(data => {
            if (data.length > 0) {
                res.json({ message: 'Section created successfully', data: data });
            } else {
                res.status(500).json({ error: 'Failed to create section' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create section' });
        });
})
expressApp.post('/api/create-subsection', (req, res) => {
    const { sub_parent_name, sub_name, sub_html_id, sub_img_url } = req.body;

    if (!sub_parent_name || !sub_name || !sub_html_id || !sub_img_url) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }

    db("subsections").insert({
        parent_section_name: sub_parent_name,
        subsection_name: sub_name,
        html_id: sub_html_id,
        img_url: sub_img_url
    })
        .returning(["parent_section_name", "subsection_name", "html_id", "img_url"])
        .then(data => {
            if (data.length > 0) {
                res.json({ message: 'Subsection created successfully', data: data });
            } else {
                res.status(500).json({ error: 'Failed to create subsection' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create section' });
        });
})
expressApp.post('/api/create-content', (req, res) => {
    const { content_parent_name, content_type, content_param_1, content_param_2 } = req.body;

    if(!content_parent_name || !content_type || !content_param_1 || !content_param_2) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }

    db("content").insert({
        subsection_id: content_parent_name,
        content_type: content_type,
        param1: content_param_1,
        param2: content_param_2
    })
        .returning(["subsection_id", "content_type", "param1", "param2"])
        .then(data => {
            if (data.length > 0) {
                res.json({ message: 'Content created successfully', data: data });
            } else {
                res.status(500).json({ error: 'Failed to create content' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create content' });
        });

})
expressApp.post('/api/create-service', (req, res) => {
    const { name, html_id, description, img_url } = req.body;

    if(!name || !html_id || !description || !img_url){
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    } else {
        db("services").insert({
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url,
        })
            .returning(["name", "html_id", "description", "img_url"])
            .then(data => {
                if (data.length > 0) {
                    res.json({ message: 'Service created successfully', data: data });
                } else {
                    res.status(500).json({ error: 'Failed to create service' });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Failed to create service' });
            });

    }
})
expressApp.post('/api/create-review', (req, res) => {
    const { parent_html_id, user_name, body, rating } = req.body;

    if(!parent_html_id || !user_name || !body || !rating){
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    } else {
        db("reviews").insert({
            parent_html_id: parent_html_id,
            user_name: user_name,
            body: body,
            rating: rating,
        })
            .returning(["parent_html_id", "user_name", "body", "rating"])
            .then(data => {
                res.json()
            })
            .catch(err => {
                console.error(err); // Log the error to the console
                res.json(err.detail);
            })
    }
})
expressApp.post('/api/create-course', (req, res) => {
    const { name, html_id, description, img_url, medical } = req.body;

    if(!name || !html_id || !description || !img_url || medical === undefined){
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    } else {
        db("courses").insert({
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url,
            medical: medical
        })
            .returning(["name", "html_id", "description", "img_url", "medical"])
            .then(data => {
                if (data.length > 0) {
                    res.json({ message: 'Course created successfully', data: data });
                } else {
                    res.status(500).json({ error: 'Failed to create course' });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Failed to create course' });
            });

    }
})
expressApp.post('/api/create-article', (req, res) => {
    const { title, body, author } = req.body;

    if(!title || !body || !author){
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    } else {
        db("articles").insert({
            title: title,
            body: body,
            author: author
        })
            .returning(["title", "body", "author"])
            .then(data => {
                if (data.length > 0) {
                    res.json({ message: 'Article created successfully', data: data });
                } else {
                    res.status(500).json({ error: 'Failed to create article' });
                }
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ error: 'Failed to create article' });
            });

    }
})
expressApp.post('/api/create-scomment', (req, res) => {
    const { content_id, user_id, body } = req.body;

    if(!content_id || !user_id || !body){
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    } else {
        db("students_comments").insert({
            content_id: content_id,
            user_id: user_id,
            body: body,
            likes: [],
            dislikes: []
        })
            .returning(["content_id", "user_id", "body", "likes", "dislikes"])
            .then(data => {
                res.json()
            })
            .catch(err => {
                console.error(err); // Log the error to the console
                res.json(err.detail);
            })
    }
})

//endregion

//region LOAD REQUESTS
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
expressApp.post('/api/load-services', (req, res) => {
    const { id, name, html_id, description, img_url, date_stamp } = req.body;

    db.select("id","name", "html_id", "description", "img_url", "date_stamp")
        .from('services')
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
expressApp.post('/api/load-reviews', (req, res) => {
    const { id, parent_html_id, user_name, body, rating, date_stamp, approved } = req.body;

    db.select("id","parent_html_id", "user_name", "body", "rating", "date_stamp", "approved")
        .from('reviews')
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
expressApp.post('/api/load-courses', (req, res) => {
    const { id, name, html_id, description, img_url, medical, date_stamp } = req.body;

    db.select("id","name", "html_id", "description", "img_url", "medical", "date_stamp")
        .from('courses')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No courses found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})
expressApp.post('/api/load-articles', (req, res) => {
    const { id, title, body, author, date_stamp } = req.body;

    db.select("id","title", "body", "author", "date_stamp")
        .from('articles')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json("");
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})
expressApp.post('/api/load-scomments', (req, res) => {
    const { id, date_stamp, content_id, user_id, body, likes, dislikes } = req.body;

    db.select("id","date_stamp", "content_id", "user_id", "body", "likes", "dislikes")
        .from("students_comments")
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No comments found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})
//endregion

//region REMOVE REQUESTS
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
expressApp.delete('/api/remove-service', (req, res) => {
    const { id } = req.body;

    db("services")
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
expressApp.delete('/api/remove-review', (req, res) => {
    const { id } = req.body;

    db('reviews')
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
expressApp.delete('/api/remove-course', (req, res) => {
    const { id } = req.body;

    db("courses")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed course with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing course: ${err.message}.`);
        });
});
expressApp.delete('/api/remove-article', (req, res) => {
    const { id } = req.body;

    db("articles")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed article with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing article: ${err.message}.`);
        });
});
expressApp.delete('/api/remove-scomment', (req, res) => {
    const { id } = req.body;

    db('students_comments')
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed comment with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing comment: ${err.message}.`);
        });
});
//endregion

//region Modification requests

expressApp.put('/api/update-review-approval', (req, res) => {
    const { id, approved } = req.body;

    if(!id || approved === undefined){
        return res.status(400).json({ error: 'Review ID and approval status are required.' });
    }

    db("reviews")
        .where({ id: id })
        .update({ approved: approved })
        .returning(["id", "approved"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: 'Review approval status updated successfully.' });
            } else {
                res.status(404).json({ error: 'Review not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to update review approval status.' });
        });
})

expressApp.put('/api/modify-section', (req, res) => {
    const { id, ms_name, ms_html_id, ms_img_url } = req.body;

    if(!id || !ms_name){
        return res.status(400).json({ error: 'Необходимо указать название раздела' });
    }

    if(!ms_img_url){
        return res.status(400).json({ error: 'Необходимо указать ссылку на изображение раздела' });
    }

    db("sections")
        .where({ id: id })
        .update({
            name: ms_name,
            html_id: ms_html_id,
            img_url: ms_img_url
        })
        .returning(["id", "name", "html_id", "img_url"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Раздел "${ms_name}" успешно отредактирован` });
            } else {
                res.status(404).json({ error: 'Раздел не найден' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить раздел' });
        });
})
expressApp.put('/api/modify-subsection', (req, res) => {
    const { id, parent_section_name, subsection_name, html_id, img_url } = req.body;

    if(!id){
        return res.status(400).json({ error: 'Не удалось найти подраздел' });
    }

    if(!parent_section_name){
        return res.status(400).json({ error: 'Укажите родительский раздел' });
    }

    if(!subsection_name){
        return res.status(400).json({ error: 'Укажите название подраздела' });
    }

    if(!html_id){
        return res.status(400).json({ error: 'Ошибка. Не удалось сгенерировать внутреннее название подраздела' });
    }

    if(!img_url){
        return res.status(400).json({ error: 'Укажите ссылку на изображение подраздела' });
    }

    db("subsections")
        .where({ id: id })
        .update({
            parent_section_name: parent_section_name,
            subsection_name: subsection_name,
            html_id: html_id,
            img_url: img_url
        })
        .returning(["id", "parent_section_name", "subsection_name", "html_id", "img_url"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Подраздел "${subsection_name}" успешно отредактирован` });
            } else {
                res.status(404).json({ error: 'Подраздел не найден' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить подраздел' });
        });
})
expressApp.put('/api/modify-content', (req, res) => {
    const { id, subsection_id, content_type, param1, param2 } = req.body;

    if(!id){
        return res.status(400).json({ error: 'Не удается определить ID контента' });
    }

    if(!subsection_id){
        return res.status(400).json({ error: 'Укажите, к какому подразделу относится контент' });
    }

    if(!content_type){
        return res.status(400).json({ error: 'Укажите тип контента' });
    }

    if(!param1){
        return res.status(400).json({ error: 'Укажите название/описание контента' });
    }

    if(!param2){
        switch (content_type) {
            case 'image':
                return res.status(400).json({ error: 'Укажите ссылку на изображение' });
            case 'video':
                return res.status(400).json({ error: 'Укажите ссылку на видео' });
            case 'pptx':
                return res.status(400).json({ error: 'Укажите код для вставки презентации' });
            case 'article':
                return res.status(400).json({ error: 'Укажите текст статьи' });
        }
    }

    db("content")
        .where({ id: id })
        .update({
            subsection_id: subsection_id,
            content_type: content_type,
            param1: param1,
            param2: param2
        })
        .returning(["id", "subsection_id", "content_type", "param1", "param2"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Контент типа "${content_type}" для подраздела "${subsection_id}" успешно отредактирован` });
            } else {
                res.status(404).json({ error: 'Контент не найден' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить контент' });
        });
})
expressApp.put('/api/modify-service', (req, res) => {
    const { id, name, html_id, description, img_url } = req.body;

    if(!id){
        return res.status(400).json({ error: 'Не удается определить ID услуги' });
    }

    if(!name){
        return res.status(400).json({ error: 'Укажите название услуги' });
    }

    if(!html_id){
        return res.status(400).json({ error: 'Не удалось сгенерировать внутреннее название услуги' });
    }

    if(!description){
        return res.status(400).json({ error: 'Укажите описание услуги' });
    }

    if(!img_url){
        return res.status(400).json({ error: 'Укажите ссылку на изображение услуги' });
    }

    db("services")
        .where({ id: id })
        .update({
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url
        })
        .returning(["id", "name", "html_id", "description", "img_url"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Услуга "${name}" успешно отредактирована` });
            } else {
                res.status(404).json({ error: 'Услуга не найдена' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить услугу' });
        });
})
expressApp.put('/api/modify-course', (req, res) => {
    const { id, name, html_id, description, img_url, medical } = req.body;

    if(!id){
        return res.status(400).json({ error: 'Не удается определить ID курса' });
    }

    if(!name){
        return res.status(400).json({ error: 'Укажите название курса' });
    }

    if(!html_id){
        return res.status(400).json({ error: 'Не удалось сгенерировать внутреннее название курса' });
    }

    if(!description){
        return res.status(400).json({ error: 'Укажите описание курса' });
    }

    if(!img_url){
        return res.status(400).json({ error: 'Укажите ссылку на изображение курса' });
    }

    if(medical === undefined){
        return res.status(400).json({ error: 'Не удалось определить принадлежность курса (для медиков или нет)' });
    }

    db("courses")
        .where({ id: id })
        .update({
            name: name,
            html_id: html_id,
            description: description,
            img_url: img_url,
            medical: medical
        })
        .returning(["id", "name", "html_id", "description", "img_url", "medical"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Курс "${name}" успешно отредактирован` });
            } else {
                res.status(404).json({ error: 'Курс не найден' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить курс' });
        });
})
expressApp.put('/api/modify-article', (req, res) => {
    const { id, title, body, author } = req.body;

    if(!id){
        return res.status(400).json({ error: 'Не удалось определить ID статьи' });
    }

    if(!title){
        return res.status(400).json({ error: 'Укажите название статьи' });
    }

    if(!body){
        return res.status(400).json({ error: 'Укажите текст статьи' });
    }

    if(!author){
        return res.status(400).json({ error: 'Укажите автора статьи' });
    }

    db("articles")
        .where({ id: id })
        .update({
            title: title,
            body: body,
            author: author
        })
        .returning(["id", "title", "body", "author"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: `Статья "${title}" успешно отредактирована` });
            } else {
                res.status(404).json({ error: 'Статья не найдена' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить статью' });
        });
})
expressApp.put('/api/modify-scomment', (req, res) => {
    const { id, likes, dislikes } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Не удалось определить ID комментария' });
    }

    db("students_comments")
        .where({ id: id })
        .select('likes', 'dislikes')
        .then(data => {
            let updatedLikes = data[0].likes || [];
            let updatedDislikes = data[0].dislikes || [];

            //If user likes
            if (likes) {
                //If user didn't like it before
                if (!updatedLikes.includes(parseInt(likes))) {
                    //Add user to liked
                    updatedLikes.push(parseInt(likes));
                } else {
                    //Remove user from liked
                    updatedLikes = updatedLikes.filter(item => item !== parseInt(likes));
                }
                //Also need to check, if user disliked before
                if(updatedDislikes.includes(parseInt(likes))){
                    //Remove user from disliked
                    updatedDislikes = updatedDislikes.filter(item => item !== parseInt(likes))
                }
            }
            //If user dislikes
            if (dislikes) {
                if (!updatedDislikes.includes(parseInt(dislikes))) {
                    updatedDislikes.push(parseInt(dislikes));
                } else {
                    updatedDislikes = updatedDislikes.filter(item => item !== parseInt(dislikes));
                }
                //Also need to check, if user liked before
                if(updatedLikes.includes(parseInt(dislikes))){
                    //Remove user from liked
                    updatedLikes = updatedLikes.filter(item => item !== parseInt(dislikes))
                }
            }

            return db("students_comments")
                .where({ id: id })
                .update({
                    likes: updatedLikes,
                    dislikes: updatedDislikes
                });
        })
        .then(() => {
            res.json({ message: 'Реакция обновлена' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Не удалось обновить реакцию на комментарий' });
        });
})
//endregion

//region Users
expressApp.post('/api/register-user', (req, res) => {
    const { email, username, hashed_password, first_name, last_name, admin } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }
    if (!username) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }
    if (!hashed_password) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }
    if (!first_name) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }
    if (!last_name) {
        return res.status(400).json({ error: 'Not all required fields are provided.' });
    }
    db("users").insert({
        email: email,
        username: username,
        hashed_password: hashed_password,
        first_name: first_name,
        last_name: last_name,
        admin: admin
    })
        .returning(["email", "username", "hashed_password", "first_name", "last_name", "admin"])
        .then(data => {
            if (data.length > 0) {
                res.json({ message: 'User registered successfully', data: data });
            } else {
                res.status(500).json({ error: 'Failed to register user' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create section' });
        });
})
expressApp.post('/api/load-users', (req, res) => {
    const { id, date_stamp, email, username, hashed_password, first_name, last_name, admin } = req.body;

    db.select('id', 'date_stamp', 'email', 'username', 'hashed_password', 'first_name', 'last_name', 'admin')
        .from('users')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.json('Error: No users found.');
            }
        })
        .catch(err => {
            res.status(500).json('Error: ' + err);
        });
})
expressApp.put('/api/update-user-password', (req, res) => {
    const { id, hashed_password } = req.body;

    if(!id || !hashed_password){
        return res.status(400).json({ error: 'Failed to update user password.' });
    }

    db("users")
        .where({ id: id })
        .update({ hashed_password: hashed_password })
        .returning(["id", "hashed_password"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: 'Password updated successfully.' });
            } else {
                res.status(404).json({ error: 'User not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: `Failed to update user's password.` });
        });
})
expressApp.put('/api/update-user-data', (req, res) => {
    const { id, email, first_name, last_name, username } = req.body;

    if(!id || !email || !first_name || !last_name || !username){
        return res.status(400).json({ error: 'Failed to update user data. Not all fields provided.' });
    }

    db("users")
        .where({ id: id })
        .update({
            email: email,
            first_name: first_name,
            last_name: last_name,
            username: username
        })
        .returning(["id", "email", "first_name", "last_name", "username"])
        .then(data => {
            if(data.length > 0){
                res.json({ message: 'User data updated successfully.' });
            } else {
                res.status(404).json({ error: 'User not found.' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: `Failed to update user's data.` });
        });
})
expressApp.delete('/api/remove-user', (req, res) => {
    const { id } = req.body;

    db("users")
        .where({
            id: id
        })
        .del()
        .then(() => {
            res.json(`Removed user with id: ${id}.`);
        })
        .catch(err => {
            res.json(`Error removing user: ${err.message}.`);
        });
});
//endregion

//Listen
const port = 3000;
expressApp.listen(port, (req, res) => {
    console.log(`Listening on port: ${port} .....`)
})