import express from 'express';
import {userRouter} from '../../../../modules/users/infra/http/routes';
import {memberRouter, commentRouter} from '../../../../modules/forum/infra/http/routes';
import {postRouter} from '../../../../modules/forum/infra/http/routes/post';
import { tagsRouter } from '../../../../modules/forum/infra/http/routes/tags';
import swaggerJson = require('swagger-jsdoc');
import swaggerUi = require('swagger-ui-express');
import {readFileSync} from "fs";

//Read from the json file
const swaggerOptions = JSON.parse(readFileSync('./swagger_config.json', 'utf-8'));

//Adds the file sources to be searched
const swaggerOptionsFinal: swaggerJson.Options = {
    definition: swaggerOptions,
    apis: [
        './src/**/**.ts',
        './src/modules/users/infra/http/routes/index.ts',
        './src/modules/forum/infra/http/routes/index.ts',
    ]
}

const v1Router = express.Router();

v1Router.get('/', (req, res) => {
    return res.json({message: 'Yo! we\'re up'});
});

const swaggerSpecs = swaggerJson(swaggerOptionsFinal);

v1Router.use('/users', userRouter);
v1Router.use('/members', memberRouter);
v1Router.use('/posts', postRouter);
v1Router.use('/comments', commentRouter);
v1Router.use('/tags', tagsRouter)
v1Router.use('/swagger-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

export {v1Router};