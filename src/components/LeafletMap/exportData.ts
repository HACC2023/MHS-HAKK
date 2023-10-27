const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function getDataFromPrisma() {
    const allData = await prisma.centers.findMany();

    const features = allData.map((entry) => {
        return {
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [
                    entry.Geocoding_Artifact_Address_Primary_X_Coordinate,
                    entry.Geocoding_Artifact_Address_Primary_Y_Coordinate,
                ],
            },
            properties: {
                // Add any additional properties
                name: entry.name,
            },
        };
    });

    const geojson = {
        type: "FeatureCollection",
        features: features,
    };

    return geojson;
}

async function main() {
    try {
        const data = await getDataFromPrisma();

        fs.writeFile('src/components/LeafletMap/geoJSON.json', JSON.stringify(data), (err) => {
            if (err) {
                console.error('Failed to write JSON file:', err);
                prisma.$disconnect();
                process.exit(1);
            }

            console.log('JSON file created successfully');
            prisma.$disconnect();
            process.exit(0);
        });
    } catch (error) {
        console.error('Failed to fetch data from Prisma:', error);
        prisma.$disconnect();
        process.exit(1);
    }
}

main();
