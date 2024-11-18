/// <reference types="cypress" />
import CourseManagementPage from '../pages/courseManagementPage';
import CreateCoursePage from '../pages/createCoursePage';
import ModulePage from '../pages/modulePage';
import MarketplaceManagementPage from '../pages/marketplaceManagementPage';
import { faker } from '@faker-js/faker';
import 'cypress-file-upload';


const courseCover: string = 'course_cover.jpg';
const courseLogo: string = 'logo_course.jpg';
const moduleThumbnail: string = 'logo_course.jpg';
const courseDescription: string = faker.lorem.paragraphs(3);
const moduleTitle: string = faker.lorem.words(3);
const moduleDescription: string = faker.lorem.paragraph();
const courseTitle: string = 'Automation ' + faker.company.catchPhrase();

describe('Successfully create course', () => {
  before(() => {
    cy.login('qa-three@lerero.net', '123456A'); // Custom command for login
  });

  it('Create Course with valid details.', () => {
    // Step 1: Navigate to Course Management
    CourseManagementPage.navigateToCourseManagement();
    CourseManagementPage.clickCreateCourse();

    // Step 2: Create a Course
    CreateCoursePage.createCourse(courseCover, courseLogo, courseTitle, courseDescription);
    
    //Assert the creation of new course
    CreateCoursePage.validatePreviewOfCourse(courseTitle, courseDescription);
    CourseManagementPage.navigateToCourseManagement();
    CreateCoursePage.validateAdditionOfCourse(courseTitle);

    // Step 3: Add a Learning Journey Module
    ModulePage.addLearningJourneyModule(moduleTitle, moduleDescription, moduleThumbnail);

    // Step 4: Activate the Course
    CreateCoursePage.activateCourse();

    // Verify activation
    cy.getElement('button-activate').should('not.exist');

    // Verify added module
    cy.getElement('label-moduleTitle').each(($el, index) => {
      const expectedTexts = [moduleTitle];
      cy.wrap($el).should('have.text', expectedTexts[index]);
    });

    // Step : Navigate to Marketplace Management
    MarketplaceManagementPage.navigateToMarketplaceManagement();
    cy.fixture('courseDetails.json').then((expectedDetails) => {
      MarketplaceManagementPage.validateAdditionOfCourse(expectedDetails.courseTitle);
      MarketplaceManagementPage.validateDetailsOfAddedCourse(expectedDetails);
    });

  });
});
