import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
import { generateZodClientFromOpenAPI } from 'openapi-zod-client';

dotenv.config();

const swaggerUrl = process.env.EXPO_PUBLIC_SWAGGER_URL;
const outputPath = 'lib/api/openapi/index.ts';

async function generateApi() {
    try {
        if (!swaggerUrl) {
            console.error('EXPO_PUBLIC_SWAGGER_URL is not defined');
            process.exit(1);
        }

        console.log(`Fetching OpenAPI spec from: ${swaggerUrl}`);

        const response = await fetch(swaggerUrl);

        if (!response.ok) {
            throw new Error(
                `Failed to fetch OpenAPI spec: ${response.status} ${response.statusText}`,
            );
        }

        const openApiDoc = await response.json();

        const outputDir = path.dirname(outputPath);

        fs.mkdirSync(outputDir, {
            recursive: true,
        });

        console.log('Generating Zod client...');
        console.log(`Output: ${outputPath}`);

        await generateZodClientFromOpenAPI({
            openApiDoc,
            distPath: outputPath,
            options: {
                withAlias: true,
            },
        });

        console.log('Zod client generated successfully.');
    } catch (error) {
        console.error('Failed to generate Zod client.');

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error(error);
        }

        process.exit(1);
    }
}

generateApi();