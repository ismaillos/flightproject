$(document).ready(function () {
  // Calling loadReservations function
  loadReservations();

  $("#addReservation").click(function (e) {
    e.preventDefault();
    const reservationId = $(this).data("id");

    const reservationData = {
      price: $("#price").val(),
      passengerId: $("#passengerSelect").val(),
      flightId: $("#flightSelect").val(),
      date: $(".reservationDate").val(),
      setNumber: $("#seatNumber").val(),
      siege: $("#siege").val(),
    };

    if (reservationId) {
      updateReservation(reservationData, reservationId);
    } else {
      createReservation(reservationData);
    }
  });

  // create flight
  function createReservation(data) {
    $.ajax({
      url: "http://localhost:5000/reservations/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Clearing input fields after a successful POST request
        $(
          "#price, #passengerSelect, #flightSelect, .reservationDate, #seatNumber, #siege"
        ).val("");
        loadReservations();
      },
    });
  }

  // update flight
  function updateReservation(data, id) {
    $.ajax({
      url: `http://localhost:5000/reservations/${id}`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // hide cancel button
        $("#editCancelReservation").hide();

        // remove data-id from submit button
        $("#addReservation").removeAttr("data-id");

        // Clearing input fields after a successful POST request
        $(
          "#price, #passengerSelect, #flightSelect, .reservationDate, #seatNumber, #siege"
        ).val("");
        loadReservations();
      },
    });
  }

  // Function to load flights
  function loadReservations() {
    $.ajax({
      url: "http://localhost:5000/reservations/",
      method: "GET",
      success: function (reservations) {
        $("#reservationsList").empty();
        reservations.forEach(function (reservation) {
          $("#reservationsList").append(
            $("<li></li>").html(
              `<div class="flight-details">Passenger: ${
                reservation?.passengerId?.name
              }, Flight: From ${reservation?.flightId?.ville_destination} to ${
                reservation?.flightId?.ville_destination
              } date: ${new Date(
                reservation.date
              ).toLocaleDateString()}</div>` +
                `<button class="editReservation btn" data-id="${reservation._id}">Edit</button>` +
                `<button class="removeReservation btn" data-id="${reservation._id}">Remove</button>`
            )
          );
        });
      },
    });
  }

  // Edit button click event
  $(document).on("click", ".editReservation", function (e) {
    e.preventDefault();
    const reservationId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/reservations/${reservationId}`,
      method: "GET",
      success: function (resarvation) {
        // show cancel button
        $("#editCancelReservation").show();

        // add data id in submit button
        $("#addReservation").attr("data-id", resarvation._id);

        // Fill the form inputs with the data from the reservation object
        $("#price").val(resarvation?.price);
        $("#passengerSelect").val(resarvation?.passengerId);
        $("#flightSelect").val(resarvation?.flightId);
        $(".reservationDate").val(
          new Date(resarvation?.date).toLocaleDateString()
        );
        $("#seatNumber").val(resarvation?.setNumber);
        $("#siege").val(resarvation?.siege);
      },
    });
  });

  // Remove button click event
  $(document).on("click", ".removeReservation", function (e) {
    e.preventDefault();
    const reservationId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/reservations/${reservationId}`,
      method: "DELETE",
      success: function () {
        // Refresh the reservation list
        loadReservations();
      },
    });
  });

  // cancel button click event
  $(document).on("click", "#editCancelReservation", function (e) {
    e.preventDefault();

    // hide cancel button
    $(this).hide();

    // remove data-id from submit button
    $("#addReservation").removeAttr("data-id");

    // Clearing input fields after a successful POST request
    $(
      "#price, #passengerSelect, #flightSelect, .reservationDate, #seatNumber, #siege"
    ).val("");
  });

  // get all passengers
  function getPassengers(callback) {
    $.ajax({
      url: "http://localhost:5000/passenger",
      method: "GET",
      success: function (passengers) {
        callback(passengers);
      },
      error: function (error) {
        console.error("Error fetching passengers:", error);
      },
    });
  }

  // Function to populate select options
  function populatePassengerSelect(passengers) {
    var selectElement = $("#passengerSelect");

    // Clear existing options
    selectElement.empty();

    // Add a default option (optional)
    selectElement.append($("<option>").text("Select a passenger").val(""));

    // Add options based on retrieved passengers
    passengers.forEach(function (passenger) {
      selectElement.append(
        $("<option>").text(passenger.name).val(passenger._id)
      );
      // Adjust 'name' and '_id' based on your actual data structure
    });
  }

  // Fetch passengers and populate select options on page load
  getPassengers(populatePassengerSelect);

  // get all flights
  function getFlights(callback) {
    $.ajax({
      url: "http://localhost:5000/flights",
      method: "GET",
      success: function (flights) {
        callback(flights);
      },
      error: function (error) {
        console.error("Error fetching flights:", error);
      },
    });
  }

  // Function to populate select options
  function populateFlightSelect(flights) {
    var selectElement = $("#flightSelect");

    // Clear existing options
    selectElement.empty();

    // Add a default option (optional)
    selectElement.append($("<option>").text("Select a flight").val(""));

    // Add options based on retrieved passengers
    flights.forEach(function (fligth) {
      selectElement.append(
        $("<option>")
          .text(`${fligth.ville_depart} from ${fligth.ville_destination}`)
          .val(fligth._id)
      );
      // Adjust 'name' and '_id' based on your actual data structure
    });
  }

  // Fetch passengers and populate select options on page load
  getFlights(populateFlightSelect);
});
