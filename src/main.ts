import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { createGrpcServer } from './infrastructure/grpc/server/grpc.server'

async function bootstrap() {
	const logger = new Logger()

	const app = await NestFactory.create(AppModule)

	const config = app.get(ConfigService)

	createGrpcServer(app, config)

	await app.startAllMicroservices()
	await app.init()

	logger.log(`User service started`)
}

bootstrap()
