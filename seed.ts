import mongoose from 'mongoose';
import { connectDB } from './src/config/DBconnect';
import { Roles } from './src/enums/roles.enum';
import Resource from './src/schemas/resource.schema';
import Admin from './src/schemas/admin.schema';
import User from './src/schemas/user.schema';

const resources = [
  {
    rId: 'rId1',
    name: 'Laptop',
    isAvailable: true,
  },
  {
    rId: 'rId2',
    name: 'Projector',
    isAvailable: true,
  },
  {
    rId: 'rId3',
    name: 'Whiteboard',
    isAvailable: true,
  },
];

const admin = {
  nic: '123456789V',
  role: Roles.ADMIN,
  username: 'admin',
  name: 'John',
  password: 'test123',
  aId: 'aId1',
};

connectDB();

// Function to drop the 'test' collection
async function dropTestCollection() {
  try {
    // Wait for the database connection to open
    await new Promise((resolve) => mongoose.connection.once('open', resolve));

    // Drop the 'test' collection
    await mongoose.connection.db.dropDatabase();
    console.log('Test collection dropped successfully.');
  } catch (error) {
    console.error('Error dropping test collection:', error);
    throw error; // Throw error to indicate failure
  }
}

// Function to seed the database
async function seedDatabase() {
  try {
    // Insert seed data
    await Resource.insertMany(resources);
    await User.create(admin);
    await Admin.create(admin);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error; // Throw error to indicate failure
  }
}

// Reset and seed the database
async function resetAndSeedDatabase() {
  try {
    await dropTestCollection(); // Drop the 'test' collection
    await seedDatabase(); // Seed the database
  } catch (error) {
    console.error('Error resetting and seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
}

// Reset and seed the database
resetAndSeedDatabase();
