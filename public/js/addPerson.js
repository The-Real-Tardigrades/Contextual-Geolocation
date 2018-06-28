$(document).ready(function() {
    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown( {
        hover: true
    });

 
    $(document).ready(function() {
      // Getting jQuery references to the post body, title, form, and author select
      var firstNameInput = $("#firstName");
      var lastNameInput = $("#lastName");
      var nicknameInput = $("#nickname");
      var roleInput = $("#role");
      var notesInput = $("#notes");
      var addPersonForm = $("#addPerson");
      var locationSelect = $("#location");
      // Adding an event listener for when the form is submitted
      $(addPersonForm).on("submit", handleFormSubmit);
      // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
      var url = window.location.search;
      var personId;
      var locationId;
      // Sets a flag for whether or not we're updating a post to be false initially
      var updating = false;
    
      // If we have this section in our url, we pull out the person id from the url
      // In '?person_id=1', personId is 1
      if (url.indexOf("?person_id=") !== -1) {
        personId = url.split("=")[1];
        getPostData(personId, "person");
      }
      // Otherwise if we have an location_id in our url, preset the location select box to be our Location
      else if (url.indexOf("?location_id=") !== -1) {
        authorId = url.split("=")[1];
      }
    
      // Getting the locations, and their people
      getLocations();
    
      // A function for handling what happens when the form to create a new person is submitted
      function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the person if we don't have atleast one entry for firstName, LastName, nickName or role
        if (firstNameInput.val().trim() || lastNameInput.val().trim() || nicknameInput.val().trim() || roleInput.val().trim()) {
          return;
        }
        // Constructing a newPerson object to hand to the database
        var newPerson = {
          firstName: firstNameInput
            .val()
            .trim(),
          lastName: lastNameInput
            .val()
            .trim(),
            nickname: nicknameInput
            .val()
            .trim(), 
            role: roleInput
            .val()
            .trim(),
            notes: notesInput
            .val()
            .trim(),     
          LocationId: locationSelect.val()
        };
    
        // If we're updating a person run updatePerson to update a person
        // Otherwise run submitPerson to create a whole new person
        if (updating) {
          newPerson.id = persontId;
          updatePerson(newPerson);
        }
        else {
          submitPerson(newPerson);
        }
      }
    
      // Submits a new person and brings user to myPersons page upon completion
      function submitPerson(person) {
        $.post("/api/myPeople", person, function() {
          window.location.href = "/myPeople";
        });
      }
    
      // Gets person data for the current person if we're editing, or if we're adding to a locatons's existing people
      function getPersonData(id, type) {
        var queryUrl;
        switch (type) {
        case "person":
          queryUrl = "/api/people/" + id;
          break;
        case "location":
          queryUrl = "/api/locations/" + id;
          break;
        default:
          return;
        }
        $.get(queryUrl, function(data) {
          if (data) {
            console.log(data.LocationId || data.id);
            // If this person exists, prefill our addPersonForm with its data
            firstNameInput.val(data.title);
            lastNameInput.val(data.title);
            nicknameInput.val(data.title);
            roleInput.val(data.title);
            notesInput.val(data.title);
            locationId = data.LocationId || data.id;
            // If we have a person with this id, set a flag for us to know to update the person
            // when we hit submit
            updating = true;
          }
        });
      }
    
      // A function to get Locations and then render our list of Locations
      function getLocations() {
        $.get("/api/locations", renderLocationList);
      }
      // Function to either render a list of locations, or if there are none, direct the user to the page
      // to create an location first
      function renderLocationsList(data) {
        if (!data.length) {
          window.location.href = "/locations";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
          rowsToAdd.push(createLocationRow(data[i]));
        }
        locationSelect.empty();
        console.log(rowsToAdd);
        console.log(locationSelect);
        locationSelect.append(rowsToAdd);
        locationSelect.val(locationId);
      }
    
      // Creates the author options in the dropdown
      function createLocationRow(location) {
        var listOption = $("<option>");
        listOption.attr("value", location.id);
        listOption.text(location.name);
        return listOption;
      }
    
      // Update a given location, bring user to the myLocations page when done
      function updateLocation(location) {
        $.ajax({
          method: "PUT",
          url: "/api/locations",
          data: location
        })
          .then(function() {
            window.location.href = "/myLocations";
          });
      }
    });
 
 
 
 
 
 
 
 
 
  });
// ///////////////////////////////////////////////////////////////////////////////////
// Above is what is needed for the dropdown menu in the navbar and the associate location
// ///////////////////////////////////////////////////////////////////////////////////
// Below is for the the drop down for associating location this is the raw from the author example
// /////////////////////////////////////////////////////////////////////////////////////

// $(document).ready(function() {
//     // Getting jQuery references to the post body, title, form, and author select
//     var bodyInput = $("#body");
//     var titleInput = $("#title");
//     var cmsForm = $("#cms");
//     var authorSelect = $("#author");
//     // Adding an event listener for when the form is submitted
//     $(cmsForm).on("submit", handleFormSubmit);
//     // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
//     var url = window.location.search;
//     var postId;
//     var authorId;
//     // Sets a flag for whether or not we're updating a post to be false initially
//     var updating = false;
  
//     // If we have this section in our url, we pull out the post id from the url
//     // In '?post_id=1', postId is 1
//     if (url.indexOf("?post_id=") !== -1) {
//       postId = url.split("=")[1];
//       getPostData(postId, "post");
//     }
//     // Otherwise if we have an author_id in our url, preset the author select box to be our Author
//     else if (url.indexOf("?author_id=") !== -1) {
//       authorId = url.split("=")[1];
//     }
  
//     // Getting the authors, and their posts
//     getAuthors();
  
//     // A function for handling what happens when the form to create a new post is submitted
//     function handleFormSubmit(event) {
//       event.preventDefault();
//       // Wont submit the post if we are missing a body, title, or author
//       if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
//         return;
//       }
//       // Constructing a newPost object to hand to the database
//       var newPost = {
//         title: titleInput
//           .val()
//           .trim(),
//         body: bodyInput
//           .val()
//           .trim(),
//         AuthorId: authorSelect.val()
//       };
  
//       // If we're updating a post run updatePost to update a post
//       // Otherwise run submitPost to create a whole new post
//       if (updating) {
//         newPost.id = postId;
//         updatePost(newPost);
//       }
//       else {
//         submitPost(newPost);
//       }
//     }
  
//     // Submits a new post and brings user to blog page upon completion
//     function submitPost(post) {
//       $.post("/api/posts", post, function() {
//         window.location.href = "/blog";
//       });
//     }
  
//     // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
//     function getPostData(id, type) {
//       var queryUrl;
//       switch (type) {
//       case "post":
//         queryUrl = "/api/posts/" + id;
//         break;
//       case "author":
//         queryUrl = "/api/authors/" + id;
//         break;
//       default:
//         return;
//       }
//       $.get(queryUrl, function(data) {
//         if (data) {
//           console.log(data.AuthorId || data.id);
//           // If this post exists, prefill our cms forms with its data
//           titleInput.val(data.title);
//           bodyInput.val(data.body);
//           authorId = data.AuthorId || data.id;
//           // If we have a post with this id, set a flag for us to know to update the post
//           // when we hit submit
//           updating = true;
//         }
//       });
//     }
  
//     // A function to get Authors and then render our list of Authors
//     function getAuthors() {
//       $.get("/api/authors", renderAuthorList);
//     }
//     // Function to either render a list of authors, or if there are none, direct the user to the page
//     // to create an author first
//     function renderAuthorList(data) {
//       if (!data.length) {
//         window.location.href = "/authors";
//       }
//       $(".hidden").removeClass("hidden");
//       var rowsToAdd = [];
//       for (var i = 0; i < data.length; i++) {
//         rowsToAdd.push(createAuthorRow(data[i]));
//       }
//       authorSelect.empty();
//       console.log(rowsToAdd);
//       console.log(authorSelect);
//       authorSelect.append(rowsToAdd);
//       authorSelect.val(authorId);
//     }
  
//     // Creates the author options in the dropdown
//     function createAuthorRow(author) {
//       var listOption = $("<option>");
//       listOption.attr("value", author.id);
//       listOption.text(author.name);
//       return listOption;
//     }
  
//     // Update a given post, bring user to the blog page when done
//     function updatePost(post) {
//       $.ajax({
//         method: "PUT",
//         url: "/api/posts",
//         data: post
//       })
//         .then(function() {
//           window.location.href = "/blog";
//         });
//     }
//   });


//   /////////////////////////////////////////////////////////////////////////////////////////////////////////
//   below is the mapped version for our add person page
//   ///////////////////////////////////////////////////////////////////////////////////////////////////////////
  
