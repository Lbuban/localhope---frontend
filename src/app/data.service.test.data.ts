export let getRecordsResults =
[
  {
      "id": 3,
      "type": "volunteer",
      "needMet": false,
      "description": "We need to deliver them cribs.",
      "originalAmount": 6,
      "units": "units",
      "dateNeeded": "2017-10-24",
      "hasFollowers": false,
      "users": [
          {
              "id": 1,
              "username": "PeterTheGreat2",
              "password": "$2a$10$P/iW.kGnKF9NnCNRqGxD8ez6vek.CA6JsMJj24qtL1AI4rYBxExwW",
              "firstName": "Peter",
              "lastName": "Alson",
              "streetAddress": "1001 4th Ave",
              "city": "Seattle",
              "state": "WA",
              "zipCode": "98001",
              "phone": "(206) 333-4444",
              "email": "find.me@if.you.can",
              "isCharity": "Charity",
              "donationPreferences": "",
              "charityPreference": "",
              "followedCharities": "",
              "followers": "",
              "charityName": "Civic-1",
              "ein": "01-1234777",
              "charityUserRole": "Assistant",
              "charityType": "Human Rights",
              "resetNumber": null,
              "enabled": true,
              "accountNonExpired": true,
              "accountNonLocked": true,
              "credentialsNonExpired": true
          }
      ]
  },
  {
      "id": 6,
      "type": "money",
      "needMet": false,
      "description": "We need money for liquor.",
      "originalAmount": 600,
      "units": "dollars",
      "dateNeeded": "2017-10-24",
      "hasFollowers": true,
      "users": [
          {
              "id": 5,
              "username": "Mofo",
              "password": "$2a$10$FZko8tAGhY6Vn8m7RAPuQOQoWnb.1uKLMnxmU9pDrf9TgPYgvqpwO",
              "firstName": "Rachel",
              "lastName": "Fakey",
              "streetAddress": "6034 Palatine Ave N",
              "city": "Seattle",
              "state": "WA",
              "zipCode": "98103",
              "phone": "(206) 218-2753",
              "email": "rsoley92@gmail.com",
              "isCharity": "Charity",
              "donationPreferences": "",
              "charityPreference": "",
              "followedCharities": "",
              "followers": "",
              "charityName": "Fuck Swearington's School for Underpriviliged Girls",
              "ein": "01-1234144",
              "charityUserRole": "",
              "charityType": "",
              "resetNumber": null,
              "enabled": true,
              "accountNonExpired": true,
              "accountNonLocked": true,
              "credentialsNonExpired": true
          }
      ]
  }
];

export let getUserResult = 
[
    {
        "id": 4,
        "username": "ChildHaven",
        "password": "$2a$10$qe6DAdJde4gSozln3X8gTu6X6bEgDCrrJGtEQRH1lPk9D0CMYPO3W",
        "firstName": "Jimmy",
        "lastName": "John",
        "streetAddress": "316 Broadway",
        "city": "Seattle",
        "state": "WA",
        "zipCode": "98122",
        "phone": "786-898-8627",
        "email": "lyndsay.pollock@gmail.com",
        "isCharity": "Charity",
        "resetNumber": null,
        "charityName": "ChildHaven",
        "ein": "1232423443",
        "charityUserRole": "NA",
        "charityType": "NA",
        "followers": "",
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
    }
];

export let getRecords = 
[
    {
        "id": 4,
        "username": "ChildHaven",
        "password": "$2a$10$qe6DAdJde4gSozln3X8gTu6X6bEgDCrrJGtEQRH1lPk9D0CMYPO3W",
        "firstName": "Jimmy",
        "lastName": "John",
        "streetAddress": "316 Broadway",
        "city": "Seattle",
        "state": "WA",
        "zipCode": "98122",
        "phone": "786-898-8627",
        "email": "lyndsay.pollock@gmail.com",
        "isCharity": "Charity",
        "resetNumber": null,
        "charityName": "ChildHaven",
        "ein": "1232423443",
        "charityUserRole": "NA",
        "charityType": "NA",
        "followers": " jourdan Lyndsay",
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
    },
    {
        "id": 9,
        "username": "tbuban",
        "password": "$2a$10$fZexel1y/Awl81jKue8Qiul9INiwq7N2tNem8AzYyfdEi5EtdVPfS",
        "firstName": "Tim",
        "lastName": "Buban",
        "streetAddress": "3515 SW Webster St.",
        "city": "Seattle",
        "state": "WA",
        "zipCode": "98126",
        "phone": "206-790-7278",
        "email": "lyndsay.pollock@gmail.com",
        "isCharity": "User",
        "resetNumber": "53031",
        "charityPreference": "Education",
        "followedCharities": " 342343w423 01-0333288",
        "donationPreferences": null,
        "enabled": true,
        "accountNonExpired": true,
        "accountNonLocked": true,
        "credentialsNonExpired": true
    }
]

export let registerNewUser = 
[
    {
    // {"isCharity": "User",
    // "username": "User1", 
    // "password": "password", 
    // "firstName": "User", 
    // "lastName": "One",…}
        "charityPreference": "",
        "city": "Seattle",
        "donationPreferences":  "",
        "email": "michael.johnstone@libertymutual.com",
        "firstName":    "User2",
        "isCharity":    "User",
        "lastName": "Two",
        "password": "password",
        "phone": "222-333-1111",
        "state": "WA",
        "streetAddress": "123 Maple Lane",
        "username": "User2",
        "zipCode": "98101"
    }
]
// This is the response from a registration:
// [{"id":5,"type":"Time","needMet":false,"description":"Volunteers needed to tutor youth in reading","originalAmount":2,"units":"hours","dateNeeded":"2017-10-27","hasFollowers":false,"users":[{"id":4,"username":"ChildHaven","password":"$2a$10$qe6DAdJde4gSozln3X8gTu6X6bEgDCrrJGtEQRH1lPk9D0CMYPO3W","firstName":"Jimmy","lastName":"John","streetAddress":"316 Broadway","city":"Seattle","state":"WA","zipCode":"98122","phone":"786-898-8627","email":"lyndsay.pollock@gmail.com","isCharity":"Charity","resetNumber":null,"charityName":"ChildHaven","ein":"1232423443","charityUserRole":"NA","charityType":"NA","followers":" jourdan Lyndsay ActuallyJasmine","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]},{"id":24,"type":"Items","needMet":false,"description":"jugs of bourbon","originalAmount":1,"units":"jugs","dateNeeded":"2017-10-25","hasFollowers":false,"users":[{"id":4,"username":"ChildHaven","password":"$2a$10$qe6DAdJde4gSozln3X8gTu6X6bEgDCrrJGtEQRH1lPk9D0CMYPO3W","firstName":"Jimmy","lastName":"John","streetAddress":"316 Broadway","city":"Seattle","state":"WA","zipCode":"98122","phone":"786-898-8627","email":"lyndsay.pollock@gmail.com","isCharity":"Charity","resetNumber":null,"charityName":"ChildHaven","ein":"1232423443","charityUserRole":"NA","charityType":"NA","followers":" jourdan Lyndsay ActuallyJasmine","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]},{"id":22,"type":"Time","needMet":false,"description":"serving food at local soup kitchen","originalAmount":17,"units":"hours","dateNeeded":"2017-10-27","hasFollowers":true,"users":[{"id":6,"username":"BGClub","password":"$2a$10$FYY80WVOJmtq7T8f/EVDD.NmkTiWhlW4zXG3LzG.N/3KqvROFW1qW","firstName":"Lisa","lastName":"Smith","streetAddress":"201 19th Ave.","city":"Seattle","state":"WA","zipCode":"98122","phone":"123-355-7869","email":"lyndsay.pollock@gmail.com","isCharity":"Charity","resetNumber":null,"charityName":"Boys & Girls Club of America","ein":"342343w423","charityUserRole":"NA","charityType":"NA","followers":" jourdan tbuban ActuallyJasmine ","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]},{"id":7,"type":"Money","needMet":false,"description":"Bus pass","originalAmount":47,"units":"sddasda","dateNeeded":"2017-10-27","hasFollowers":false,"users":[{"id":6,"username":"BGClub","password":"$2a$10$FYY80WVOJmtq7T8f/EVDD.NmkTiWhlW4zXG3LzG.N/3KqvROFW1qW","firstName":"Lisa","lastName":"Smith","streetAddress":"201 19th Ave.","city":"Seattle","state":"WA","zipCode":"98122","phone":"123-355-7869","email":"lyndsay.pollock@gmail.com","isCharity":"Charity","resetNumber":null,"charityName":"Boys & Girls Club of America","ein":"342343w423","charityUserRole":"NA","charityType":"NA","followers":" jourdan tbuban ActuallyJasmine ","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]},{"id":31,"type":"Time","needMet":false,"description":"Math tutoring","originalAmount":3,"units":"hours","dateNeeded":"2017-10-31","hasFollowers":false,"users":[{"id":28,"username":"Friends","password":"$2a$10$sabY0BeoiK8oYzR02s7cf.RL0YXs/dL9RtS.5FTPVVO7tXeF58HBO","firstName":"Michael","lastName":"Jackson","streetAddress":"13116 NE 132nd Street","city":"Kirkland","state":"WA","zipCode":"98034","phone":"2067907278","email":"lyndsay.pollock@gmail.com","isCharity":"Charity","resetNumber":null,"charityName":"Friends of Youth","ein":"1231332432","charityUserRole":"NA","charityType":"NA","followers":" Lyndsay","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]},{"id":32,"type":"Items","needMet":false,"description":"Winter coats are needed for foster children","originalAmount":16,"units":"winter coats","dateNeeded":"2017-10-31","hasFollowers":true,"users":[{"id":1,"username":"fredhutch","password":"$2a$10$aKB92ii5MkcQOeJn.dFHFeNRhW1SRYcZ9mKU8Hek4TLIBkGEQzKmG","firstName":"John","lastName":"Smith","streetAddress":"1100 Fairview Ave. N","city":"Seattle","state":"WA","zipCode":"98109","phone":"206-272-0136","email":"jourdsh@gmail.com","isCharity":"Charity","resetNumber":"59862","charityName":"Fred Hutch Innovator Network","ein":"01-0333288","charityUserRole":"NA","charityType":"NA","followers":" tbuban","enabled":true,"accountNonExpired":true,"accountNonLocked":true,"credentialsNonExpired":true}]}