import BookingModel from "../models/booking.model";
import BusModel from "../models/bus.model";
import TicketModel from "../models/ticket.model";
import TripModel from "../models/trip.model";
import UserModel from "../models/user.model";

const mongoose = require("mongoose");
const { Types } = require("mongoose");
const { connectToDatabase } = require("./path-to-your-mongoose-connection");

const customObjectId: any = (hexValue: string) => {
  return new Types.ObjectId(hexValue);
};

async function addFakeData() {
  try {
    // Connect to the database
    await connectToDatabase();

    // Generate fake users
    const fakeUsers = [
      {
        _id: customObjectId("5f83588c8b56fc001c86e8e0"),
        fullName: "John Doe",
        phone: "1234567890",
        email: "john@example.com",
        profilePic: "john.jpg",
        password: "password123",
        isPhoneNumberVerified: true,
        isEmailVerified: true,
        role: "USER",
        Bookings: [],
        Tickets: [],
      },
      // Add more fake user objects here
    ];

    // Insert fake users into the User collection
    const insertedUsers = await UserModel.insertMany(fakeUsers);

    // Generate fake buses
    const fakeBuses = [
      {
        _id: customObjectId("5f83588c8b56fc001c86e8e1"),
        vehicleNumber: "ABC123",
        model: "Bus Model",
        yearOfMake: 2022,
        colour: "Red",
        numberOfSeats: "30",
        status: "ACTIVE",
        insurance: "Insurance Company",
        roadWorthy: "Road Worthy Company",
      },
      // Add more fake bus objects here
    ];

    // Insert fake buses into the Bus collection
    const insertedBuses = await BusModel.insertMany(fakeBuses);

    // Generate fake trips
    const fakeTrips = [
      {
        _id: customObjectId("5f83588c8b56fc001c86e8e2"),
        date: new Date(),
        origin: "City A",
        destination: "City B",
        numberOfBusAssigned: "1",
        departureTime: "09:00 AM",
        arrivalTime: "01:00 PM",
        tripStatus: "ACTIVE",
        tripType: "One-way",
      },
      // Add more fake trip objects here
    ];

    // Insert fake trips into the Trip collection
    const insertedTrips = await TripModel.insertMany(fakeTrips);

    // Generate fake bookings
    const fakeBookings = [
      {
        _id: customObjectId("5f83588c8b56fc001c86e8e3"),
        Bus: insertedBuses[0]._id,
        Trip: insertedTrips[0]._id,
        numOfSeats: 2,
      },
      // Add more fake booking objects here
    ];

    // Insert fake bookings into the Booking collection
    const insertedBookings = await BookingModel.insertMany(fakeBookings);

    // Generate fake tickets
    const fakeTickets = [
      {
        _id: customObjectId("5f83588c8b56fc001c86e8e4"),
        Booking: insertedBookings[0]._id,
        QRCode: "ABCD1234",
      },
      // Add more fake ticket objects here
    ];

    // Insert fake tickets into the Ticket collection
    const insertedTickets = await TicketModel.insertMany(fakeTickets);

    // Update user's Bookings array with the booking's ObjectId
    const bookingIds = insertedBookings.map((booking) => booking._id);
    insertedUsers[0].Bookings.push(...bookingIds);
    await insertedUsers[0].save();

    // Update user's Tickets array with the ticket's ObjectId
    const ticketIds = insertedTickets.map((ticket) => ticket._id);
    insertedUsers[0].Tickets.push(...ticketIds);
    await insertedUsers[0].save();

    console.log("Fake data added to the database.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Disconnect from the database when done
    mongoose.connection.close();
  }
}

// Call the function to add fake data
addFakeData();
