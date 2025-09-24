const fs = require('fs');
const { stringify } = require('querystring');
const Stripe = require('stripe');
const STRIPE_TEST_SECRET_KEY = 'sk_test_51MEuPXA69JWLHl3Jxw3gKWTtXJCOkzmvjDs5oJ45DZEHFzo5HLz5JfWkNvzU03eCyo0ojkiW2ot6WXA8udWEkh0300nAnoJmcj'
const stripe = Stripe(STRIPE_TEST_SECRET_KEY);

const handler = async (country) => {

  try{
    let finalCustomers = []

    /* add code below this line */
    //add some costumers first
    const costumers = [
    {email: 'john.doe@testmail.com', country: 'US'
    },
    {email: 'pedro.emanuel@testmail.com',
     country: 'PT'
    },
    {email: 'rita.javier@testmail.com',
      country: 'ES'
    },
    {email: 'george.best@testmail.com',
     country: 'US'
    },
    {email: 'fernando.pessoa@testmail.com',
     country: 'PT'
    },
    {email: 'segio.ramos@testmail.com', //This user is to test if the country filter is working
      country: 'ZL'
    }
    ];
    // filter the customers by country
const filtercount = costumers.filter ( cf => cf.country === country );
    // for each customer create a Stripe customer  // transform customers to save into Stripe
for (const custcycle of filtercount) {  //start of cycle
  const strpcustomer = await stripe.customers.create({ //call create API
  email: custcycle.email,
  metadata: { country: custcycle.country } //since it country is not a valid parameter, metadata is used for custom info on object
  });

// push into finalCustomers the stripe customers with email, country and id as properties.
  finalCustomers.push ({
    email: custcycle.email,
    customerId: strpcustomer.id, //id is generated automatically
    country: custcycle.country
  });
}


    // write finalCustomers array into final-customers.json using fs
    fs.writeFileSync('final-customers.json', JSON,stringify(finalCustomers) + '\n');
 /*   finalCustomers.forEach(custcycle => {fs.writeFileSync(
      'final-customers.json',
      JSON.stringify(custcycle) + '\n' */
    /* 
      finalCustomers array should look like:
      finalCustomers = [{
          email: test@test.com
          customerId: 1d833d-12390sa-9asd0a2-asdas,
          country: 'ES'
        },
        {
          email: test@test.com
          customerId: 1d833d-12390sa-9asd0a2-asdas,
          country: 'ES'
        }
      }] 
    */

    /* add code above this line */

    console.log(finalCustomers)

}catch(e){
  throw e
}
 
} ;
