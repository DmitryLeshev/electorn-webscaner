export async function message(res: Response) {
  let packet;
  try {
    packet = await res.json();
  } catch {
    throw "[MESSAGE] res.json ERROR";
  }
  // if (packet.data) console.log("[message data]", packet.data);
  // if (packet.callType) console.log("[message callType]", packet.callType);
  // if (packet.msg) console.log("[message msg]", packet.msg);
  // if (packet.error) console.log("[message error]", packet.error);
  // if (!packet.status) console.log("[message status]", packet.status);
  return packet;
}
