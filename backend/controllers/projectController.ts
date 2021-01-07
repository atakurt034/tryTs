import {RequestHandler} from 'express'

import projects from '../data/projects'

export const listProjects: RequestHandler = (req, res, next)=> {
    res.json(projects)
}
