export function configureFakeBackend() {
    let users = [
      {
        "id":1,
        "username":"admin@admin.com",
        "firstname":"Admin",
        "middlename":null,
        "lastname":null,
        "email":"admin@admin.com",
        "password":"admin",
        "phone":"9816311185",
        "roles":"Administrator",
        "gender":null,
        "dob":null,
        "street":null,
        "city":null,
        "state":null,
        "country":null,
        "zip":null,
        "geo_location":"",
        "can_read_reports":1,
        "created_at":null,
        "updated_at":null,
        "status":1
      },
      {
        "id":2,
        "username":"user@user.com",
        "firstname":"User",
        "middlename":null,
        "lastname":null,
        "email":"user@user.com",
        "password":"user",
        "phone":"9816311185",
        "roles":"Doctor",
        "gender":null,
        "dob":null,
        "street":null,
        "city":null,
        "state":null,
        "country":null,
        "zip":null,
        "geo_location":"",
        "can_read_reports":1,
        "created_at":null,
        "updated_at":null,
        "status":1
      }
    ];
    let items = getItems(1, 41);
    let roles = getRoles(1, 11);
    let travelers = getTravelers(1, 41);
    let labs = getLabs(1, 41);
    let organizationTypes = getOrganizationTypes(1, 41);
    let countries = getCountries(1, 41);
    let testTypes = getTestTypes(1, 41);
    let patients = getPatients(1, 41);
    let labPricing = getLabPricing(1,10);
    let recordCountPerPage = 10;
  
    function getDataByEntity(entity) {
      if (entity === "get-countries") return countries;
      if (entity === "users") return items;
      if (entity === "roles") return roles;
      if (entity === "labs") return labs;
      if (entity === "organization-types") return organizationTypes;
      if (entity === "travelers") return travelers;
      if (entity === "test-types") return testTypes;
      if (entity === "patients") return patients;
      if (entity === "lab-pricing") return labPricing;
    }
  
    function getUrlEntity(url) {
      var reUrlPath = /(?:\w+:)?\/\/[^/]+([^?#]+)/;
      var path = url.match(reUrlPath).pop();
      var pathArray = path.split("/");
      return pathArray;
    }
  
    function getItems(pageNo, count) {
      let tempItems = [{
        "id":1,
        "username":"admin@admin.com",
        "firstname":"Admin",
        "middlename":null,
        "lastname":null,
        "email":"admin@admin.com",
        "password":"admin",
        "phone":"9816311185",
        "roles":"Administrator",
        "gender":null,
        "dob":null,
        "street":null,
        "city":null,
        "state":null,
        "country":null,
        "zip":null,
        "geo_location":"",
        "can_read_reports":1,
        "created_at":null,
        "updated_at":null,
        "status":1
      },
      {
        "id":2,
        "username":"user@user.com",
        "firstname":"User",
        "middlename":null,
        "lastname":null,
        "email":"user@gmail.com",
        "password":"user",
        "phone":"9816311185",
        "roles":"Administrator",
        "gender":null,
        "dob":null,
        "street":null,
        "city":null,
        "state":null,
        "country":null,
        "zip":null,
        "geo_location":"",
        "can_read_reports":1,
        "created_at":null,
        "updated_at":null,
        "status":1
      }];

      for (let i = 3; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          "id": no,
          "username":"admin"+no+"@admin.com",
          "firstname":"Admin"+no,
          "middlename":null,
          "lastname":null,
          "email":"admin"+no+"@admin.com",
          "password":"admin"+no,
          "phone":"9816311185"+no,
          "roles":"Administrator",
          "gender":null,
          "dob":null,
          "street":null,
          "city":null,
          "state":null,
          "country":null,
          "zip":null,
          "geo_location":"",
          "can_read_reports":1,
          "created_at":null,
          "updated_at":null,
          "status":1
        });
      }
      return tempItems;
    }
  
    function getCountries(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          name: "Country " + no,
          iso_code_alpha2: "iso_code2_"+no,
          iso_code_alpha3: "iso_code3_"+no,
          status: no
        });
      }
      return tempItems;
    }
  
    function getTestTypes(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          cost: "10",
          estimated_seconds: "30",
          fi_model: "Model FI"+no,
          fi_test_name: "RTPCR FI"+no,
          fi_test_type: "Test type FI"+no,
          loinc: "IONC"+no,
          name: "RTPCR-2"+no,
          price: "100",
          status: true,
          test_procedure: "Pro"+no,
          test_procedure_snomed: "Pro sno"+no,
          test_type: "Test type"+no,
          testing_platform: "Test platform"+no,
          status: i % 2 === 0 ? 1 : 0
        });
      }
      return tempItems;
    }
  
  
    function getPatients(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          city: "Kennesaw",
          confirmation_code: "ctest_00000001",
          country: "82",
          county: null,
          created_at: "2022-02-09 03:58:08",
          dob: "2007-01-03",
          email: "ankit+12@rb.com",
          ethnicity: "Non-Hispanic",
          firstname: "Ankit",
          gender: "Male",
          have_any_symptom: 1,
          have_breath_shortness: 1,
          have_cough: 1,
          have_decreased_taste: 0,
          have_fever: 1,
          have_muscle_pain: 0,
          have_sore_throat: 0,
          have_vaccinated: 1,
          id: no,
          identifier: "CH01332311221",
          identifier_country: "1",
          identifier_doc: "\\public\\uploads\\patients\\62033bd0a6766_untitled.png",
          identifier_state: null,
          identifier_type: "Driver License",
          initial: null,
          lab_assigned: "Cisco Diagnostics - Florida",
          lastname: "Test2",
          middlename: "M",
          phone: "01231231231",
          pregnent: null,
          progress_status: 1,
          race: "Black",
          scheduled_date: "2022-02-11",
          scheduled_time: "09:00 AM",
          state: "Georgia",
          status: 1,
          street: "3213 Campus Loop Road, Kennesaw, GA, USA",
          test_type: 1,
          transaction_id: "test_000000001",
          updated_at: "2022-02-09 03:58:08",
          zip: "30144"
        });
      }
      return tempItems;
    }
  
  
    function getLabs(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          type: Math.round(Math.random() * getOrganizationTypes(1,10).length),
          name: "Lab " + no,
          email: "lab"+no+"@mail.com",
          concerned_person_name: "Person name "+no,
          phone: "000000000"+no,
          licence_number: "LIC-"+no,
          logo: "",
          price_per_test: no*10,
          tests_available: "1,2",
          test_codes: "1,2",
          date_incorporated: "2019-10-"+((no < 10) ? "0"+no : no),
          payment_days: "20",
          payment_mode: "1,2",
          has_tax: 1,
          has_compliance: 0,
          location_code: "",
          street: "",
          city: "",
          state: "",
          county: "",
          country: "",
          zip: "1234"+no,
          geo_location: "",
          status: i % 2 === 0 ? 1 : 0
        });
      }
      return tempItems;
    }
  
  
    function getLabPricing(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          lab_id: no,
          price: 10 * no,
          test_type: no,
          test_codes: "Code 00"+no,
          status: i % 2 === 0 ? 1 : 0
        });
      }
      return tempItems;
    }
  
    function getOrganizations(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          type: Math.round(Math.random() * getOrganizationTypes(1,10).length),
          name: "Company " + no,
          email: "company"+no+"@mail.com",
          address: "Company Address "+no,
          phone: "000000000"+no,
          primary_contact: "111111111"+no,
          billing_contact: "222222222"+no,
          account_manager: "Manager "+no,
          membership_number: "MEMBERSHIPNO"+no,
          onboarding_date: "2019-10-"+((no < 10) ? "0"+no : no),
          countries: ['US'],
          membership_start_date: "2019-10-"+((no < 10) ? "0"+no : no),
          membership_end_date: "2019-10-"+((no < 10) ? "0"+no : no),
          status: i % 2 === 0 ? "active" : "inactive"
        });
      }
      return tempItems;
    }
  
    function getRoles(pageNo, count) {
      let tempItems = [
        {
          id: 1,
          name: 'Administrator',
          status: true
        },
        {
          id: 2,
          name: 'Travel Manager',
          status: false
        },
        {
          id: 3,
          name: 'Division Manager',
          status: false
        },
        {
          id: 4,
          name: 'CSR',
          status: true
        },
        {
          id: 5,
          name: 'Manager',
          status: true
        },
        {
          id: 6,
          name: 'Traveler',
          status: true
        }
      ];
      return tempItems;
    }
  
    function getOrganizationTypes(pageNo, count) {
      let tempItems = [
        {
          id: 1,
          name: 'B2B',
          status: false
        },
        {
          id: 2,
          name: 'Reseller',
          status: true
        },
        {
          id: 3,
          name: 'Hybrid',
          status: true
        }
      ];
      return tempItems;
    }
  
    function getTravelers(pageNo, count) {
      let tempItems = [];
      for (let i = 1; i <= count; i++) {
        let no = (pageNo - 1) * count + i;
        tempItems.push({
          id: no,
          first: "Traveler" + no,
          last: "last" + no,
          email: "email1@yahoo.com" + no,
          phone: "phone" + no,
          location: "location" + no,
          status: i % 2 === 0 ? "active" : "inactive"
        });
      }
      return tempItems;
    }
  
    function getItemsByPage(pageNo, count, entity) {
      let data = getDataByEntity(entity);
      return data.slice((pageNo - 1) * count, pageNo * count);
    }
  
    window.fetch = function(url, opts) {
      return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
          let pathArray = getUrlEntity(url);
          let entity = "";
          if (pathArray.length >= 2) {
            entity = pathArray[2];
          }
          
          if(url.endsWith("/forgot-password")){
            let responseJson = {
                status: true,
                message: 'Email sent successfully.'
              };
            resolve(responseJson);
            return;
          }
  
          if(url.endsWith("/reset-password")){
            let responseJson = {
                success: true,
                message: 'Password updated successfully. You can login with your newly set password!',
                status: 200
              };
            resolve(responseJson);
            return;
          }

          if (entity === "users" || entity === "get-countries" || entity === "roles" || entity === "labs" || entity === "patients" || entity === "test-types" || entity === "lab-pricing") {
            if (url.indexOf("/" + entity + "/") !== -1 && opts.method === "GET") {
              let parts = url.split("/" + entity + "/");
              var data = getDataByEntity(entity);
              data = data[parts[1]];
              resolve({ status: true, data: data });
              return;
            } else if (url.indexOf("/" + entity) !== -1 && opts.method === "GET") {
              let request = {};
              try {
                request = JSON.parse(opts.body);
              } catch (e) {}
              let page =
                request && request.pagination && request.pagination.page
                  ? request.pagination.page
                  : 1;
  
              let pageSize =
                request && request.pagination && request.pagination.pageSize
                  ? request.pagination.pageSize
                  : recordCountPerPage;
  
              let data = getItemsByPage(page, pageSize, entity);
              console.log("fake response:", data)
              resolve({
                data: data,
                pagination: {
                  totalRecords: getDataByEntity(entity).length,
                  currentPage: page,
                  pageSize: pageSize
                }
              });
              //resolve(data);
              return;
            }
            if (url.indexOf("/" + entity) !== -1 && opts.method === "POST") {
              let item = JSON.parse(opts.body);
              item.id = getDataByEntity(entity).length + 1;
              getDataByEntity(entity).push(item);
              // items.push[opts.body];
              resolve([item]);
              return;
            }
            if (url.indexOf("/" + entity) !== -1 && opts.method === "PUT") {
              let tempItem = JSON.parse(opts.body);
  
              if (tempItem.id && tempItem.id > 0) {
                getDataByEntity(entity)[tempItem.id - 1] = tempItem;
              } else {
                tempItem.id = getDataByEntity(entity).length + 1;
                getDataByEntity(entity).push(tempItem);
              }
              resolve([JSON.parse(opts.body)]);
              return;
            }
            if (url.indexOf("/" + entity + "/") && opts.method === "DELETE") {
  
              let parts = url.split("/" + entity + "/");
                getDataByEntity(entity).splice(parts[0] - 1, 1);
  
              resolve(parts[0]);
              return;
            }
            // authenticate
  
            // get users
            if (url.endsWith("/users") && opts.method === "GET") {
              // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
              if (
                opts.headers &&
                opts.headers.Authorization === "Bearer fake-jwt-token"
              ) {
                resolve({
                  ok: true,
                  text: () => Promise.resolve(JSON.stringify(users))
                });
              } else {
                // return 401 not authorised if token is null or invalid
                reject("Unauthorised");
              }
  
              return;
            }
          }
          if (url.endsWith("/login")) {
            // get parameters from post request
            let params = JSON.parse(opts.body);
  
            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
              return (
                user.email === params.email &&
                user.password === params.password
              );
            });
  
            if (filteredUsers.length) {
              // if login details are valid return user details and fake jwt token
              let user = filteredUsers[0];
              user.redirect = "/"+user.username;
              let responseJson = {
                "status":true,
                "data":{
                  "token":{
                    "token":"fake-jwt-token",
                    "token_type":"bearer",
                    "expires_in":3600
                  },
                  "user": user
                }
              };
              resolve(responseJson);
            } else {
              // else return error
              reject("Username or password is incorrect");
            }
  
            return;
          }
          if (url.endsWith("/validateToken")) {
            // get parameters from post request
            let params = JSON.parse(opts.body);
  
            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
              return user.lastName === params.token;
            });
  
            if (filteredUsers.length) {
              // if login details are valid return user details and fake jwt token
              let user = filteredUsers[0];
              let responseJson = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.lastName,
                token: user.lastName,
                result: true,
                redirect: "/" + user.username + "/"
              };
              resolve(responseJson);
            } else {
              // else return error
              reject("Username or password is incorrect");
            }
  
            return;
          }
          resolve();
          // pass through any requests not handled above
          //if(opts.method == "GET" || opts.method == "HEAD") delete opts.body
          //realFetch(url, opts).then(response => resolve(response));
        }, 500);
      });
    };
  }
  