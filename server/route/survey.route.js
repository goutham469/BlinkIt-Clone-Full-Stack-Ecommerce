import { Router } from 'express'
import auth from '../middleware/auth.js'
import { addSurveyQuestion, getAllFormSurveys, getAllProductMetrics, getFormDetails, submitSurveyAnswer, surveyRouterEntry, updateProductViewMetric } from '../controllers/survey.controller.js'


const surveyRouter = Router()

surveyRouter.get("/",surveyRouterEntry)
surveyRouter.get('/all-form-surveys',getAllFormSurveys)
surveyRouter.get('/all-product-view-metrics',getAllProductMetrics)
surveyRouter.post('/update-product-metrics',updateProductViewMetric)

surveyRouter.post('/add-survey-question' , addSurveyQuestion)
surveyRouter.post('/get-form-details' , getFormDetails)
surveyRouter.post('/submit-survey-answer' , submitSurveyAnswer)


export default surveyRouter