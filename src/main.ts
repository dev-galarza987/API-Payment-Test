import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PREFIX_API = process.env.APP_PREFIX || 'api';
  const VERSION_API = process.env.API_VERSION || 'v1';
  app.enableCors();
  app.setGlobalPrefix(PREFIX_API + '/' + VERSION_API);
  const PORT = process.env.PORT || 3000;
  app.use(morgan('dev'));
  await app.listen(PORT, () => {
    console.log(
      `Server listening on http://${process.env.APP_HOST}:${PORT}/${PREFIX_API}/${VERSION_API}`,
    );
  });
}
void bootstrap();
