import amqplib from "amqplib";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

dotenv.config();

async function sendMessage() {
  const queue = "tarefas";
  const message = "Mensagem " + randomUUID();

  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL || "");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Mensagem enviada: ${message}`);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Erro ao enviar mensagem:", error);
  }
}

sendMessage();
