-- Create the admin_auth table for storing the admin password hash.
-- The CHECK constraint ensures only one admin row can ever exist.
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor → New Query)

CREATE TABLE IF NOT EXISTS admin_auth (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow the service role to bypass it
ALTER TABLE admin_auth ENABLE ROW LEVEL SECURITY;

-- No public access policies — only the backend (service role) can read/write
-- This ensures the anon key used by the frontend cannot touch this table
