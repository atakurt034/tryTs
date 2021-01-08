import {RequestHandler} from 'express'
import asyncHandler from 'express-async-handler'

import Project from '../models/projects'

export const listProjects: RequestHandler = asyncHandler(async(req, res, next)=> {
    const projects = await Project.find({})
    if (projects) {
        res.json(projects)
    } else {
        res.status(404)
        throw new Error('Projects not found')
    }
})
