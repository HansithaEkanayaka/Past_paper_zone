async function configureRiscStream() {
  const response = await fetch('https://risc.googleapis.com/v1beta/stream:update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN', // මෙතනට ඔයාගේ OIDC/Auth Token එක දාන්න
    },
    body: JSON.stringify({
      delivery: {
        delivery_method: 'https://schemas.openid.net/secevent/risc/delivery-method/push',
        url: 'https://pastpaperzone.lk/risc', // මෙතනට ඔයාගේ Receiver Endpoint URL එක දාන්න (උදා: Cloudflare Worker URL එක හෝ API route එක)
      },
      events_requested: [
        'https://schemas.openid.net/secevent/risc/event-type/account-disabled',
        'https://schemas.openid.net/secevent/risc/event-type/account-enabled',
        // අවශ්‍ය වෙනත් events මෙතනට එකතු කරන්න පුළුවන්
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Failed to configure RISC stream:', errorData);
    throw new Error('Failed to configure RISC stream');
  }

  const data = await response.json();
  console.log('RISC stream configured successfully:', data);
  return data;
}