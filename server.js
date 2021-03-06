const express = require('express');
const cors = require('cors');
const server = express();
const port = 5000;
const bodyParser = require('body-parser');

const actions = require('./data/helpers/actionModel.js');
const projects = require('./data/helpers/projectModel.js');

server.use(express.json());
server.use(cors({}));
server.use(bodyParser.json());

const sendUserError = (status, message, res) => {
    res.status(status).json({ errorMessage: message });
}

// ========== Actions Endpoints ============ //

server.get('/api/actions', (req, res) => {
    actions
        .get()
        .then(actions => {
            res.json(actions);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .get(id)
        .then(action => {
            if(action === null) {
                return sendUserError(404, `The action with the ID ${id} does not exist.`, res);
                
            }
            res.json(action);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.post('/api/actions/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    if(!project_id || !description) {
        return sendUserError(400, `Action must have a project ID and a description`, res);
        
    }
    actions
        .insert({ project_id, description, notes, completed })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    actions
        .remove(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The action with id ${id} does not exist`, res);
            }
            res.json({ success: 'Action was removed.'});
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const { description, notes, completed } = req.body;
    actions
        .update(id, {description, notes, completed })
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The action with id ${id} does not exist`, res);
            }
            actions.get(id)
                .then(action => {
                    res.json(action);
                })
                .catch(error => {
                    sendUserError(500, `There was an error processing your request`, res);
                });
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});




// ========== Projects Endpoints =========== //

server.get('/api/projects', (req, res) => {
    projects
        .get()
        .then(projects => {
            res.json(projects);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
        });
});

server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .get(id)
        .then(project => {
            if(project === null) {
                return sendUserError(404, `The project with the ID ${id} does not exist.`, res);
                
            }
            res.json(project);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    projects
        .getProjectActions(id)
        .then(project => {
            if(project === null) {
                return sendUserError(404, `The project with the ID ${id} does not exist.`, res);
                
            }
            res.json(project);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.post('/api/projects/', (req, res) => {
    const { name, description, completed } = req.body;
    if(!name || !description) {
        return sendUserError(400, `Project must have a project ID and a description`, res);
        
    }
    projects
        .insert({ name, description, completed })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    projects
        .remove(id)
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The project with id ${id} does not exist`, res);
            }
            res.json({ success: 'Project was removed.'});
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});

server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    projects
        .update(id, { name, description, completed })
        .then(response => {
            if(response === 0) {
                return sendUserError(404, `The project with id ${id} does not exist`, res);
            }
            projects.get(id)
                .then(project => {
                    res.json(project);
                })
                .catch(error => {
                    sendUserError(500, `There was an error processing your request`, res);
                });
        })
        .catch(error => {
            return sendUserError(500, `There was an error processing your request`, res);
            
        });
});



server.listen(port, () => console.log(`Server is listening on port ${port}`));