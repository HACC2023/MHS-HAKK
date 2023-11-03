const { PrismaClient } = require('@prisma/client');
const fs = require('fs/promises');

const prisma = new PrismaClient();

async function getDataFromPrisma() {
    const allData = await prisma.centers.findMany();

    const features = allData.map((entry: {
        Geocoding_Artifact_Address_Primary_X_Coordinate: number;
        Geocoding_Artifact_Address_Primary_Y_Coordinate: number;
        Health_Center_Name: string;
        Health_Center_Organization_Street_Address: string;
    }) => {
        return {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    entry.Geocoding_Artifact_Address_Primary_X_Coordinate,
                    entry.Geocoding_Artifact_Address_Primary_Y_Coordinate,
                ],
            },
            properties: {
                // Add any additional properties
                name: entry.Health_Center_Name,
                address: entry.Health_Center_Organization_Street_Address,
            },
        };
    });

    const geojson = {
        type: 'FeatureCollection',
        features: features,
    };

    return geojson;
}

async function main() {
    try {
        const data = await getDataFromPrisma();

        await fs.writeFile('src/components/LeafletMap/geoJSON.json', JSON.stringify(data));

        console.log('JSON file created successfully');
        prisma.$disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Failed to fetch data from Prisma:', error);
        prisma.$disconnect();
        process.exit(1);
    }
}

main();