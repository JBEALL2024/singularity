const Pi = window.Pi;
Pi.init({ version: "2.0", 
         sandbox: true 
        });

function onIncompletePaymentFound(payment) {
  console.log("Incomplete payment found:", payment);
}

Pi.authenticate(['payments', 'username'], onIncompletePaymentFound)
  .then(function (auth) {
    alert("Hello " + auth.user.username + "!");
  })
  .catch(function (error) {
    console.error("Authentication failed:", error);
  });

