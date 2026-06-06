import { prisma } from '../src/lib/prisma';
import { products } from '../src/data/products';

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean existing data to avoid duplicates/foreign key issues
  // Order of deletion matters to avoid foreign key constraint errors
  await prisma.productSpec.deleteMany();
  await prisma.technicalSpec.deleteMany();
  await prisma.batchInfo.deleteMany();
  await prisma.sustainabilityMetric.deleteMany();
  await prisma.usageApplication.deleteMany();
  await prisma.comparisonItem.deleteMany();
  await prisma.storageInfo.deleteMany();
  await prisma.farmerPartnership.deleteMany();
  await prisma.product.deleteMany();

  console.log('🧹 Cleaned existing database records.');

  for (const product of products) {
    console.log(`📦 Seeding product: ${product.name} (${product.id})`);

    // Create the product
    await prisma.product.create({
      data: {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        description: product.description,
        longDescription: product.longDescription,
        image: product.image,
        gallery: product.gallery || [],
        badge: product.badge,
        badgeColor: product.badgeColor,
        stock: product.stock,
        rating: product.rating,
        reviewCount: product.reviewCount,
        highlights: product.highlights || [],
        
        // Relations
        specs: {
          create: product.specs?.map(spec => ({
            label: spec.label,
            value: spec.value,
          })) || [],
        },
        technicalSpecs: {
          create: product.technicalSpecs?.map(spec => ({
            label: spec.label,
            value: spec.value,
          })) || [],
        },
        batchInfo: product.batchInfo ? {
          create: {
            batchNumber: product.batchInfo.batchNumber,
            processingDate: product.batchInfo.processingDate,
            sourceLocation: product.batchInfo.sourceLocation,
            certifications: product.batchInfo.certifications || [],
          }
        } : undefined,
        sustainability: {
          create: product.sustainability?.map(item => ({
            label: item.label,
            value: item.value,
            icon: item.icon,
          })) || [],
        },
        applications: {
          create: product.applications?.map(app => ({
            name: app.name,
            icon: app.icon,
            description: app.description,
          })) || [],
        },
        comparison: {
          create: product.comparison?.map(item => ({
            metric: item.metric,
            cocopeatPlus: item.cocopeatPlus,
            regularSoil: item.regularSoil,
            peatMoss: item.peatMoss,
            importedCocopeat: item.importedCocopeat,
          })) || [],
        },
        storage: product.storage ? {
          create: {
            instructions: product.storage.instructions || [],
            shelfLife: product.storage.shelfLife,
            rehydrationTime: product.storage.rehydrationTime,
            waterRatio: product.storage.waterRatio,
          }
        } : undefined,
        farmerPartnership: product.farmerPartnership ? {
          create: {
            farmerCount: product.farmerPartnership.farmerCount,
            region: product.farmerPartnership.region,
            description: product.farmerPartnership.description,
          }
        } : undefined,
      },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
