const { BASE_URL } = require("../config/env.config");
const URLS = {
  Login: `${BASE_URL}/auth/login`,
  Dashboard: `${BASE_URL}/dashboard/index`,
  Admin: {
    userManagement: {
      viewSystemUsers: `${BASE_URL}/admin/viewSystemUsers`,
      addUser: `${BASE_URL}/admin/saveSystemUser`,
    },
    job:{
        viewJobTitleList:`${BASE_URL}/admin/viewJobTitleList`,
        viewPayGrades:`${BASE_URL}/admin/viewPayGrades`,
        employmentStatus:`${BASE_URL}/admin/employmentStatus`,
        jobCategory:`${BASE_URL}/admin/jobCategory`,
        workShift:`${BASE_URL}/admin/workShift`,
    },
    organization:{
        viewOrganizationGeneralInformation:`${BASE_URL}/admin/viewOrganizationGeneralInformation`,
        viewLocations:`${BASE_URL}/admin/viewLocations`,
        viewCompanyStructure:`${BASE_URL}/admin/viewCompanyStructure`,
    }
  },
  Pim: `${BASE_URL}/pim`,
  Leave: `${BASE_URL}/leave`,
  Time: `${BASE_URL}/time`,
  Recruitment: `${BASE_URL}/recruitment`,
  MyAccount: `${BASE_URL}/pim/viewPersonalDetails`,
  Performance: `${BASE_URL}/performance`,
  Directory: `${BASE_URL}/directory/viewDirectory`,
  Claim: `${BASE_URL}/claim`,
  Claim: `${BASE_URL}/claim`,
  Buzz: `${BASE_URL}/buzz/viewBuzz`,
};
module.exports = { URLS };
