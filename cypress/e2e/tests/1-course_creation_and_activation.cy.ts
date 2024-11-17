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
const courseTitle: string = 'Automation ' + faker.company.catchPhrase();
const courseDescription: string = faker.lorem.paragraphs(3);
const moduleTitle: string = faker.lorem.words(3);
const moduleDescription: string = faker.lorem.paragraph();

describe('Successfully create course', () => {
  before(() => {
    cy.login('qa-three@lerero.net', '123456A'); // Custom command for login
  });

  it('Create Course with valid details.', () => {
    // Step 1: Navigate to Course Management
    CourseManagementPage.navigateToCourseManagement();
    CourseManagementPage.clickCreateCourse();

    // Step 2: Create a Course
    CreateCoursePage.uploadCoverImage(courseCover);
    CreateCoursePage.uploadLogoImage(courseLogo);
    CreateCoursePage.enterCourseDetails(courseTitle, courseDescription);
    CreateCoursePage.saveAndProceed();
    CourseManagementPage.navigateToCourseManagement();
    CreateCoursePage.validateAdditionOfCourse(courseTitle);


    // Step 3: Add a Learning Journey Module
    ModulePage.addLearningJourneyModule(moduleTitle, moduleDescription, moduleThumbnail);

    // Step 4: Activate the Course
    cy.get('[data-testid="button-activate"]').click();
    cy.get('[data-testid="messaget-activation_confirmation"]').should('contain', 'Are you sure want to activate this course?');
    cy.get('[data-testid="button-yes"]').click();
    cy.get('[data-testid="message-successful"]').should('contain', 'Activate course was successful.');
    cy.get('[data-testid="button-okay"]').click();

    // Verify activation
    cy.get('[data-testid="button-activate"]').should('not.exist');

    // Step 5: Verify added module
    cy.get('[data-testid="label-moduleTitle"]').each(($el, index) => {
      const expectedTexts = [moduleTitle];
      cy.wrap($el).should('have.text', expectedTexts[index]);
    });

    // Step 6: Navigate to Marketplace Management
    MarketplaceManagementPage.navigateToMarketplaceManagement();
  });
});
