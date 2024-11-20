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
    // Step 5: Navigate to Marketplace Management
    MarketplaceManagementPage.navigateToMarketplaceManagement();
    cy.fixture('courseDetails.json').then((expectedDetails) => {
      MarketplaceManagementPage.validateCourseWhenAddingPrice(expectedDetails.courseTitle);
        });
    cy.fixture('coursePriceDetails.json').then((priceDetails) => {
        MarketplaceManagementPage.addPriceToCourse(priceDetails);
      });


    

  });
});
