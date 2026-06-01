const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { paymentMethodId, amount } = JSON.parse(event.body);

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true,
      description: 'Don pour AED Congo',
      // Ensure we handle SCA (Strong Customer Authentication)
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Stripe Error:', error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};
