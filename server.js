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



server.listen(port, () => console.log(`Server is listening on port ${port}`));