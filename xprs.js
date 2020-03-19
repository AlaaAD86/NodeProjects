const Joi = require ('joi');
const express = require('express');
const app = express();

app.use(express.json()); // adding a middleware

const courses = [
    {id: 1, name: 'html'},
    {id: 2, name: 'css'},
    {id: 3, name: 'javascript'}
];

// USING POSTMAN EXTENSION IN CHROME TO TEST RESULTS OF C R U D


app.get('/', (req, res)=> {
    res.send('Hello World!');
});


app.get('/api/courses', (req, res)=> {
    res.send(courses);
});

app.post('/api/courses', (req, res) => {
    // const schema = {
    //     name: Joi.string().min(2).required
    // };
    // const result = Joi.validate(req.body, schema);
    
    // if (result.error){
    //     //400 Bad request
    //     res.status(400).send(result.error);
    //     return;
    // }


    // we don not nedd what was written befor anymore
    // we replace it with the validateCourse() function=======
   
    const { error } = validateCourse(req.body); // { error } = result.error
    //400 Bad request
    if (error) return res.status(400).send(error);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});




app.put('/api/courses/:id', (req, res) => {
    //look up the course
    // return 404 if not exist

    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The id was not found');


    //vvalidate
    //if invalid , return 400 = bad request
   
    // const result = validateCourse(req.body); // to make cleaner = obj destructuring
    const { error } = validateCourse(req.body); // { error } = result.error
    //400 Bad request
    if (error) return res.status(400).send(error);

    // update course
    course.name = req.body.name;

    // return the updated course
    res.send(course);
});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(2).required()
    };
    return Joi.validate(course, schema);
}

// app.get('/api/courses/:id', (req, res)=> {
//     res.send(req.params.id); // http://localhost:3000/api/courses/1
// });

// app.get('/api/courses/:year/:month', (req, res)=> {
//     res.send(req.params); // http://localhost:3000/api/courses/2020/2 
// });


// app.get('/api/courses/:year/:month', (req, res)=> {
//     res.send(req.query); // http://localhost:3000/api/courses/2025/2?sortBy=name
// });

app.delete('/api/courses/:id', (req, res) => {
    // look for the course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The id was not found');

    // delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // return the same course
    res.send(course);
});

app.get('/api/courses/:id', (req, res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The id was not found');
    res.send(course);
});


const port = process.env.PORT || 3000; // to set dynamic port

app.listen(port, ()=> console.log(`listening on ${port}`));

// to change server port from 3000 to another port
// in the terminal we can use : export PORT=5000 or any other arbitrary number