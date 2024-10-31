import amqplib from "amqplib";
import dotenv from "dotenv";

dotenv.config();

async function receiveMessage() {
  const queue = "tarefas";

  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URL || "");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });
    console.log("Aguardando mensagens...");

    channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`Mensagem recebida: ${msg.content.toString()}`);
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Erro ao receber mensagem:", error);
  }
}

receiveMessage();
