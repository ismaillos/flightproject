$(document).ready(function () {
  // Calling loadFlights function
  loadFlights();

  $("#addFlight").click(function (e) {
    e.preventDefault();
    const flightId = $(this).data("id");

    const flightData = {
      depart: $(".departinput").val(),
      arrival: $(".arrival").val(),
      gare: $("#w3_country1").val(),
      ville_depart: $("#ville_depart").val(),
      ville_destination: $("#ville_destination").val(),
      duree: $("#duree").val(),
      type: $("#type").val(),
    };

    if (flightId) {
      updateFlight(flightData, flightId);
    } else {
      createFlight(flightData);
    }
  });

  // create flight
  function createFlight(data) {
    $.ajax({
      url: "http://localhost:5000/flights/",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // Clearing input fields after a successful POST request
        $(
          ".departinput, .arrival, #w3_country1, #ville_depart, #ville_destination, #duree, #type"
        ).val("");
        loadFlights();
      },
    });
  }

  // update flight
  function updateFlight(data, id) {
    $.ajax({
      url: `http://localhost:5000/flights/${id}`,
      method: "PATCH",
      contentType: "application/json",
      data: JSON.stringify(data),
      success: function (response) {
        // hide cancel button
        $("#editCancel").hide();

        // remove data-id from submit button
        $("#addFlight").removeAttr("data-id");

        // Clearing input fields after a successful POST request
        $(
          ".departinput, .arrival, #w3_country1, #ville_depart, #ville_destination, #duree, #type"
        ).val("");
        loadFlights();
      },
    });
  }

  // Function to load flights
  function loadFlights() {
    $.ajax({
      url: "http://localhost:5000/flights/",
      method: "GET",
      success: function (flights) {
        $("#flightsList").empty();
        flights.forEach(function (flight) {
          $("#flightsList").append(
            $("<li></li>").html(
              `<div class="flight-details">${flight.ville_depart} - From ${
                flight.ville_destination
              } to ${new Date(flight.arrival).toLocaleDateString()} Airoport: ${
                flight.gare
              }</div>` +
                `<button class="edit btn" data-id="${flight._id}">Edit</button>` +
                `<button class="remove btn" data-id="${flight._id}">Remove</button>`
            )
          );
        });
      },
    });
  }

  // Edit button click event
  $(document).on("click", ".edit", function (e) {
    e.preventDefault();
    const flightId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/flights/${flightId}`,
      method: "GET",
      success: function (flight) {
        // show cancel button
        $("#editCancel").show();

        // add data id in submit button
        $("#addFlight").attr("data-id", flight._id);

        // Fill the form inputs with the data from the flight object
        $(".departinput").val(new Date(flight.depart).toLocaleDateString());
        $(".arrival").val(new Date(flight.arrival).toLocaleDateString());
        $("#w3_country1").val(flight.gare);
        $("#ville_depart").val(flight.ville_depart);
        $("#ville_destination").val(flight.ville_destination);
        $("#duree").val(flight.duree);
        $("#type").val(flight.type);
      },
    });
  });

  // Remove button click event
  $(document).on("click", ".remove", function (e) {
    e.preventDefault();
    const flightId = $(this).data("id");

    $.ajax({
      url: `http://localhost:5000/flights/${flightId}`,
      method: "DELETE",
      success: function () {
        // Refresh the flights list
        loadFlights();
      },
    });
  });

  // cancel button click event
  $(document).on("click", "#editCancel", function (e) {
    e.preventDefault();

    // hide cancel button
    $(this).hide();

    // remove data-id from submit button
    $("#addFlight").removeAttr("data-id");

    // Clearing input fields after a successful POST request
    $(
      ".departinput, .arrival, #w3_country1, #ville_depart, #ville_destination, #duree, #type"
    ).val("");
  });
});
