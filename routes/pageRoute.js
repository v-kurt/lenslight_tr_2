import express from 'express';
import * as pageController from '../controllers/pageController.js'

const router = express.Router();

router.route('/').get(pageController.getIndexPage);
router.route('/about').get(pageController.getAboutPage);
router.route('/contact').get(pageController.getContactPage);
router.route('/services').get(pageController.getServicesPage);
router.route('/gallery').get(pageController.getGalleryPage);
router.route('/projects').get(pageController.getProjectsPage);
router.route('/blog').get(pageController.getBlogPage);





export default router;

