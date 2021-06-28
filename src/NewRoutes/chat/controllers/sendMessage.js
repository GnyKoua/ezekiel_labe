import db from "../../../models";

export default async ({
  bodymen: {
    body
  }
}, res, next) => {
  try {
    const ChatMessage = db.chatmessage;

    const message = await ChatMessage.create({
      numeroCommande: body.numeroCommande,
      message: body.message,
      sender_id: body.sender_id,
      livreur_id: body.livreur_id,
      user_id: body.user_id,
      createdAt: new Date()
    });

    return res.json({
      success: true,
      message: `Demande créée`,
      objectMessage: message
    });

  } catch (err) {
    return next(err)
  }
}
