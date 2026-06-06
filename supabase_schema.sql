-- SQL DDL Script for Supabase SQL Editor
-- This script creates the tables based on the required schema.

-- Enable pgcrypto extension for gen_random_uuid() if not enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Drop tables if they exist to start clean (optional, be careful in production!)
-- DROP TABLE IF EXISTS "FarmerPartnership" CASCADE;
-- DROP TABLE IF EXISTS "StorageInfo" CASCADE;
-- DROP TABLE IF EXISTS "ComparisonItem" CASCADE;
-- DROP TABLE IF EXISTS "UsageApplication" CASCADE;
-- DROP TABLE IF EXISTS "SustainabilityMetric" CASCADE;
-- DROP TABLE IF EXISTS "BatchInfo" CASCADE;
-- DROP TABLE IF EXISTS "TechnicalSpec" CASCADE;
-- DROP TABLE IF EXISTS "ProductSpec" CASCADE;
-- DROP TABLE IF EXISTS "Product" CASCADE;

-- 1. Table Product
CREATE TABLE "Product" (
  id VARCHAR PRIMARY KEY,
  slug VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  price NUMERIC NOT NULL,
  "originalPrice" NUMERIC,
  description TEXT NOT NULL,
  "longDescription" TEXT,
  image VARCHAR NOT NULL,
  gallery VARCHAR[] DEFAULT '{}',
  badge VARCHAR,
  "badgeColor" VARCHAR,
  stock INTEGER DEFAULT 0,
  rating DOUBLE PRECISION DEFAULT 0.0,
  "reviewCount" INTEGER DEFAULT 0,
  highlights VARCHAR[] DEFAULT '{}'
);

-- 2. Table ProductSpec (Many-to-One)
CREATE TABLE "ProductSpec" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL
);

-- 3. Table TechnicalSpec (Many-to-One)
CREATE TABLE "TechnicalSpec" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL
);

-- 4. Table BatchInfo (One-to-One)
CREATE TABLE "BatchInfo" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  "batchNumber" VARCHAR NOT NULL,
  "processingDate" VARCHAR NOT NULL,
  "sourceLocation" VARCHAR NOT NULL,
  certifications VARCHAR[] DEFAULT '{}'
);

-- 5. Table SustainabilityMetric (Many-to-One)
CREATE TABLE "SustainabilityMetric" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  label VARCHAR NOT NULL,
  value VARCHAR NOT NULL,
  icon VARCHAR NOT NULL
);

-- 6. Table UsageApplication (Many-to-One)
CREATE TABLE "UsageApplication" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  icon VARCHAR NOT NULL,
  description TEXT
);

-- 7. Table ComparisonItem (Many-to-One)
CREATE TABLE "ComparisonItem" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  metric VARCHAR NOT NULL,
  "cocopeatPlus" VARCHAR NOT NULL,
  "regularSoil" VARCHAR NOT NULL,
  "peatMoss" VARCHAR NOT NULL,
  "importedCocopeat" VARCHAR NOT NULL
);

-- 8. Table StorageInfo (One-to-One)
CREATE TABLE "StorageInfo" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  instructions VARCHAR[] DEFAULT '{}',
  "shelfLife" VARCHAR NOT NULL,
  "rehydrationTime" VARCHAR NOT NULL,
  "waterRatio" VARCHAR NOT NULL
);

-- 9. Table FarmerPartnership (One-to-One)
CREATE TABLE "FarmerPartnership" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "productId" VARCHAR UNIQUE NOT NULL REFERENCES "Product"(id) ON DELETE CASCADE,
  "farmerCount" INTEGER NOT NULL,
  region VARCHAR NOT NULL,
  description TEXT NOT NULL
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS "idx_product_slug" ON "Product"(slug);
CREATE INDEX IF NOT EXISTS "idx_product_spec_product_id" ON "ProductSpec"("productId");
CREATE INDEX IF NOT EXISTS "idx_technical_spec_product_id" ON "TechnicalSpec"("productId");
CREATE INDEX IF NOT EXISTS "idx_sustainability_metric_product_id" ON "SustainabilityMetric"("productId");
CREATE INDEX IF NOT EXISTS "idx_usage_application_product_id" ON "UsageApplication"("productId");
CREATE INDEX IF NOT EXISTS "idx_comparison_item_product_id" ON "ComparisonItem"("productId");
