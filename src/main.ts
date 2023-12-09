import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ConfigService } from "@nestjs/config";
import { EnvironmentVariables } from "./common/environment/env.type";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle("Test API").setDescription("Test API that shows how to login withoutDB :)").setVersion("0.01").addTag("auth").build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const configService = app.get(ConfigService);
  const port = configService.get<EnvironmentVariables["PORT"]>("PORT");
  await app.listen(port);
}
bootstrap();
