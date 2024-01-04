import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';


import connectDB from './config/connection';

dotenv.config()
const PORT = process.env.PORT || 3000