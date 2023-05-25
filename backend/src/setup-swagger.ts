import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export function setupSwagger(app: INestApplication): void {
    const documentBuilder = new DocumentBuilder()
        .setTitle('Talent Point')
        .setDescription(`Talent point rest api`)
        .addBearerAuth();

    if (process.env.API_VERSION) {
        documentBuilder.setVersion(process.env.API_VERSION);
    }

    const document = SwaggerModule.createDocument(app, documentBuilder.build());
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });

    console.info(`Documentation: http://localhost:${process.env.PORT}/api`);
}
