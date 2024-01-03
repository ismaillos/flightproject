$(document).ready(function () {
  // Calling loadPassengers function
  loadPassengers();

  $("#addPassenger").click(function (e) {
    e.preventDefault();
    const passengerId = $(this).data("id");

    const passengerData = {
      name: $("#name").val(),
      email: $("#email").val(),
      prenom: $("#prenom").val(),
      adresse: $("#adresse").val(),
      date_naissance: $(".date_naissanceP").val(),
    };

    if (passengerId) {
      updatePassenger(passengerData, passengerId);
    } else {
      createPassenger(passengerData);
    }
  });

  // create passenger
  function createPassenger(data) {
    $.ajax({
      url: "http://localhost:5000/passenger/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Clearing input fields after a successful POST request
        $("#name, #email, #prenom, #adresse, .date_naissanceP").val("");
        loadPassengers();
      },
    });
  }

  // update flight
  function updatePassenger(data, id) {
    $.ajax({
      url: `http://localhost:5000/passenger/${id}`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // hide cancel button
        $("#editCancelPassenger").hide();

        // remove data-id from submit button
        $("#addPassenger").removeAttr("data-id");

        // Clearing input fields after a successful POST request
        $("#name, #email, #prenom, #adresse, .date_naissanceP").val("");
        loadPassengers();
      },
    });
  }

  // Function to load passenger
  function loadPassengers() {
    $.ajax({
      url: "http://localhost:5000/passenger/",
      method: "GET",
      success: function (passengers) {
        $("#passengersList").empty();
        passengers.forEach(function (passenger) {
          $("#passengersList").append(
            $("<li></li>").html(
              `<div class="flight-details">Name: ${passenger.name}, Email: ${
                passenger.email
              }, Date_naissance: ${new Date(
                passenger.date_naissance
              ).toLocaleDateString()}, Address: ${passenger.adresse}</div>` +
                `<button class="editPassenger btn" data-id="${passenger._id}">Edit</button>` +
                `<button class="removePassenger btn" data-id="${passenger._id}">Remove</button>`
            )
          );
        });
      },
    });
  }

  // Edit button click event
  $(document).on("click", ".editPassenger", function (e) {
    e.preventDefault();
    const passengerId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/passenger/${passengerId}`,
      method: "GET",
      success: function (passenger) {
        // show cancel button
        $("#editCancelPassenger").show();

        // add data id in submit button
        $("#addPassenger").attr("data-id", passenger._id);

        // Fill the form inputs with the data from the flight object

        $("#name").val(passenger.name);
        $("#email").val(passenger.email);
        $("#prenom").val(passenger.prenom);
        $("#adresse").val(passenger.adresse);
        $(".date_naissanceP").val(
          new Date(passenger.date_naissance).toLocaleDateString()
        );
      },
    });
  });

  // Remove button click event
  $(document).on("click", ".removePassenger", function (e) {
    e.preventDefault();
    const passengerId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/passenger/${passengerId}`,
      method: "DELETE",
      success: function () {
        // Refresh the flights list
        loadPassengers();
      },
    });
  });

  // cancel button click event
  $(document).on("click", "#editCancelPassenger", function (e) {
    e.preventDefault();

    // hide cancel button
    $(this).hide();

    // remove data-id from submit button
    $("#addPassenger").removeAttr("data-id");

    // Clearing input fields after a successful POST request
    $("#name, #email, #prenom, #adresse, .date_naissanceP").val("");
  });
});
